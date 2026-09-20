import React, { useState, useMemo } from 'react';
import { 
  Search, 
  Filter, 
  Grid, 
  List, 
  Clock, 
  Moon, 
  PlusCircle, 
  ArrowUpDown, 
  Tag, 
  Calendar,
  Sparkles,
  DollarSign
} from 'lucide-react';
import { Receipt, CategoryType, EmotionType, CATEGORY_INFO, EMOTION_INFO } from '../types';
import { soundEffects } from '../utils/audio';

interface RawDataViewProps {
  receipts: Receipt[];
  onSelectReceipt: (r: Receipt) => void;
  onOpenAddModal: () => void;
}

export const RawDataView: React.FC<RawDataViewProps> = ({
  receipts,
  onSelectReceipt,
  onOpenAddModal,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedEmotion, setSelectedEmotion] = useState<string>('all');
  const [timeFilter, setTimeFilter] = useState<'all' | 'midnight' | 'morning' | 'afternoon' | 'evening'>('all');
  const [sortBy, setSortBy] = useState<'date-desc' | 'date-asc' | 'price-desc' | 'price-asc'>('date-desc');
  const [viewMode, setViewMode] = useState<'thermal-grid' | 'ledger-table'>('thermal-grid');

  // Filtered & Sorted Receipts
  const filteredReceipts = useMemo(() => {
    return receipts.filter((r) => {
      // Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesMerchant = r.merchant.toLowerCase().includes(q);
        const matchesItems = r.items.some(i => i.name.toLowerCase().includes(q));
        const matchesNote = r.memoryNote.toLowerCase().includes(q);
        const matchesLocation = r.location.city.toLowerCase().includes(q) || (r.location.neighborhood?.toLowerCase().includes(q) ?? false);
        const matchesTag = r.tags.some(t => t.toLowerCase().includes(q));
        if (!matchesMerchant && !matchesItems && !matchesNote && !matchesLocation && !matchesTag) {
          return false;
        }
      }

      // Category
      if (selectedCategory !== 'all' && r.category !== selectedCategory) {
        return false;
      }

      // Emotion
      if (selectedEmotion !== 'all' && r.emotion !== selectedEmotion) {
        return false;
      }

      // Time filter
      if (timeFilter === 'midnight') {
        // Between 12 AM (0) and 5 AM (5)
        if (!(r.hour24 >= 0 && r.hour24 <= 5)) return false;
      } else if (timeFilter === 'morning') {
        if (!(r.hour24 >= 6 && r.hour24 <= 11)) return false;
      } else if (timeFilter === 'afternoon') {
        if (!(r.hour24 >= 12 && r.hour24 <= 17)) return false;
      } else if (timeFilter === 'evening') {
        if (!(r.hour24 >= 18 && r.hour24 <= 23)) return false;
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'date-desc') return new Date(b.date).getTime() - new Date(a.date).getTime();
      if (sortBy === 'date-asc') return new Date(a.date).getTime() - new Date(b.date).getTime();
      if (sortBy === 'price-desc') return b.total - a.total;
      if (sortBy === 'price-asc') return a.total - b.total;
      return 0;
    });
  }, [receipts, searchQuery, selectedCategory, selectedEmotion, timeFilter, sortBy]);

  // Overall Stats
  const totalAmount = filteredReceipts.reduce((acc, r) => acc + r.total, 0);
  const midnightCount = filteredReceipts.filter(r => r.hour24 >= 0 && r.hour24 <= 5).length;
  const avgTicket = filteredReceipts.length ? (totalAmount / filteredReceipts.length) : 0;

  return (
    <div className="py-6 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-6">
      
      {/* Title & Introduction */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#e5ded0] pb-5">
        <div>
          <div className="flex items-center space-x-2 text-xs font-mono uppercase tracking-wider text-[#85745e]">
            <span>PHASE 01: RAW DATA</span>
            <span>•</span>
            <span>THE SHOEBOX ARCHIVE</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-display font-bold text-[#241e17] mt-1">
            The Digital Ledger & Thermal Archive
          </h1>
          <p className="text-xs sm:text-sm font-serif italic text-[#695a47] max-w-2xl mt-1">
            Every transaction is an objective artifact of a subjective life. Unfiltered, chronological, and accompanied by the marginal notes scrawled in their wake.
          </p>
        </div>

        <button
          onClick={() => {
            soundEffects.playReceiptTick();
            onOpenAddModal();
          }}
          className="inline-flex items-center space-x-2 px-4 py-2.5 rounded-md bg-[#2b241c] hover:bg-black text-[#f8f5ee] text-xs font-medium shadow-xs self-start md:self-auto cursor-pointer transition-transform active:scale-95"
        >
          <PlusCircle className="w-4 h-4 text-[#dfcfae]" />
          <span>Add / Scan New Receipt</span>
        </button>
      </div>

      {/* Shoebox Statistics Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
        <div className="bg-[#f7f3ea] p-3.5 rounded-lg border border-[#e0d6c3] shadow-2xs">
          <span className="text-[10px] font-mono uppercase text-[#7a6b57]">Total Receipts</span>
          <div className="text-xl font-bold font-display text-[#1f1912] mt-0.5">
            {filteredReceipts.length}
          </div>
          <span className="text-[10px] text-[#8c7a65] font-serif">Recorded transactions</span>
        </div>

        <div className="bg-[#f7f3ea] p-3.5 rounded-lg border border-[#e0d6c3] shadow-2xs">
          <span className="text-[10px] font-mono uppercase text-[#7a6b57]">Accumulated Value</span>
          <div className="text-xl font-bold font-mono text-[#1f1912] mt-0.5">
            ${totalAmount.toFixed(2)}
          </div>
          <span className="text-[10px] text-[#8c7a65] font-serif">Average ticket ${avgTicket.toFixed(2)}</span>
        </div>

        <div className="bg-[#f7f3ea] p-3.5 rounded-lg border border-[#e0d6c3] shadow-2xs">
          <span className="text-[10px] font-mono uppercase text-[#7a6b57]">Midnight Transactions</span>
          <div className="text-xl font-bold font-mono text-[#7c2d12] mt-0.5 flex items-center">
            <Moon className="w-4 h-4 mr-1 text-[#b45309]" />
            {midnightCount}
          </div>
          <span className="text-[10px] text-[#8c7a65] font-serif">Between 12 AM & 5 AM</span>
        </div>

        <div className="bg-[#f7f3ea] p-3.5 rounded-lg border border-[#e0d6c3] shadow-2xs">
          <span className="text-[10px] font-mono uppercase text-[#7a6b57]">Emotional Depth</span>
          <div className="text-xl font-bold font-display text-[#15803d] mt-0.5">
            100%
          </div>
          <span className="text-[10px] text-[#8c7a65] font-serif">Annotated with memory notes</span>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="bg-[#f8f5ee] p-4 rounded-lg border border-[#ded5c2] space-y-3">
        <div className="flex flex-col md:flex-row gap-3">
          
          {/* Search Input */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-[#8a7b67] absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search merchants, items, marginalia notes, cities, or tags..."
              className="w-full pl-9 pr-4 py-2 text-xs bg-white border border-[#d6ccba] rounded-md focus:outline-hidden focus:ring-1 focus:ring-[#80694a]"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-[#8c7d6b] hover:text-black cursor-pointer"
              >
                Clear
              </button>
            )}
          </div>

          {/* View Mode Toggle */}
          <div className="flex items-center space-x-1 border border-[#d6ccba] rounded-md p-0.5 bg-white self-start md:self-auto">
            <button
              onClick={() => {
                soundEffects.playReceiptTick();
                setViewMode('thermal-grid');
              }}
              className={`p-1.5 rounded text-xs flex items-center space-x-1 transition-colors cursor-pointer ${
                viewMode === 'thermal-grid' ? 'bg-[#352c23] text-[#f7f2e6]' : 'text-[#635341] hover:bg-[#ede5d5]'
              }`}
              title="Thermal Paper Cards"
            >
              <Grid className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Thermal Slips</span>
            </button>
            <button
              onClick={() => {
                soundEffects.playReceiptTick();
                setViewMode('ledger-table');
              }}
              className={`p-1.5 rounded text-xs flex items-center space-x-1 transition-colors cursor-pointer ${
                viewMode === 'ledger-table' ? 'bg-[#352c23] text-[#f7f2e6]' : 'text-[#635341] hover:bg-[#ede5d5]'
              }`}
              title="Ledger Table"
            >
              <List className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Ledger Table</span>
            </button>
          </div>
        </div>

        {/* Secondary Filter Badges */}
        <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-[#eae1cf] text-xs">
          
          {/* Time Filter Badges */}
          <div className="flex items-center space-x-1 mr-2">
            <span className="text-[10px] font-mono uppercase text-[#7a6b57]">Time:</span>
            {[
              { id: 'all', label: 'All Hours' },
              { id: 'midnight', label: '🌙 Midnight (12-5am)' },
              { id: 'morning', label: '☕ Morning' },
              { id: 'afternoon', label: '☀️ Afternoon' },
              { id: 'evening', label: '🍷 Evening' },
            ].map(t => (
              <button
                key={t.id}
                onClick={() => {
                  soundEffects.playReceiptTick();
                  setTimeFilter(t.id as typeof timeFilter);
                }}
                className={`px-2 py-0.5 rounded text-[11px] transition-all cursor-pointer ${
                  timeFilter === t.id
                    ? 'bg-[#403529] text-[#f8f5ed] font-medium'
                    : 'bg-[#ede6d8] text-[#5e4f3e] hover:bg-[#e2d8c5]'
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>

          {/* Sort Selector */}
          <div className="flex items-center space-x-1 ml-auto">
            <ArrowUpDown className="w-3 h-3 text-[#877864]" />
            <span className="text-[10px] font-mono uppercase text-[#7a6b57]">Sort:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
              className="bg-white border border-[#d6ccba] rounded px-2 py-1 text-xs text-[#3a3024] focus:outline-hidden"
            >
              <option value="date-desc">Newest Date</option>
              <option value="date-asc">Oldest Date</option>
              <option value="price-desc">Highest Amount ($)</option>
              <option value="price-asc">Lowest Amount ($)</option>
            </select>
          </div>
        </div>

        {/* Category & Emotion Filter Chips */}
        <div className="flex flex-wrap gap-1.5 pt-1">
          <button
            onClick={() => setSelectedCategory('all')}
            className={`px-2 py-0.5 rounded-full text-[10px] font-mono transition-colors cursor-pointer ${
              selectedCategory === 'all'
                ? 'bg-[#29221a] text-[#fbf8f0]'
                : 'bg-[#e8dfcf] text-[#5e4e3c] hover:bg-[#dcd1be]'
            }`}
          >
            All Categories
          </button>
          {Object.entries(CATEGORY_INFO).map(([k, v]) => (
            <button
              key={k}
              onClick={() => {
                soundEffects.playReceiptTick();
                setSelectedCategory(selectedCategory === k ? 'all' : k);
              }}
              className={`px-2 py-0.5 rounded-full text-[10px] font-mono transition-all cursor-pointer ${
                selectedCategory === k
                  ? 'ring-2 ring-[#856b46] font-bold shadow-xs'
                  : 'opacity-80 hover:opacity-100'
              }`}
              style={{ backgroundColor: v.bg, color: v.color }}
            >
              {v.label}
            </button>
          ))}
        </div>
      </div>

      {/* Main Content Area */}
      {filteredReceipts.length === 0 ? (
        <div className="bg-[#f9f7f2] border border-dashed border-[#d8cdbc] rounded-lg p-12 text-center">
          <p className="text-sm font-serif italic text-[#70604c]">
            No receipt artifacts found matching these criteria.
          </p>
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedCategory('all');
              setSelectedEmotion('all');
              setTimeFilter('all');
            }}
            className="mt-3 text-xs text-[#92400e] font-sans underline cursor-pointer"
          >
            Reset all filters
          </button>
        </div>
      ) : viewMode === 'thermal-grid' ? (
        /* THERMAL PAPER GRID VIEW */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredReceipts.map((r, idx) => {
            const cat = CATEGORY_INFO[r.category] || CATEGORY_INFO.sustenance;
            const emo = EMOTION_INFO[r.emotion] || EMOTION_INFO.mundane;
            return (
              <div
                key={r.id}
                onClick={() => {
                  soundEffects.playReceiptTick();
                  onSelectReceipt(r);
                }}
                className="group relative bg-[#fffefb] p-4 rounded-xs border-x border-[#e8dfcf] shadow-sm hover:shadow-xl transition-all duration-200 cursor-pointer flex flex-col justify-between hover:-translate-y-1 select-none"
                style={{ transform: `rotate(${(idx % 5 - 2) * 0.4}deg)` }}
              >
                {/* Jagged tear top effect */}
                <div className="absolute top-0 left-0 right-0 h-1.5 bg-[radial-gradient(ellipse_at_top,transparent_60%,#fffefb_61%)] bg-[length:10px_6px]" />

                <div>
                  {/* Top Bar: Category Pill & Emotion Dot */}
                  <div className="flex items-center justify-between text-[10px] pb-2 mb-2 border-b border-dashed border-[#ded5c4]">
                    <span
                      className="px-1.5 py-0.5 rounded font-sans font-medium uppercase text-[9px]"
                      style={{ backgroundColor: cat.bg, color: cat.color }}
                    >
                      {cat.label}
                    </span>
                    <span className="flex items-center space-x-1 text-[#786a58] font-sans">
                      <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: emo.dotColor }} />
                      <span className="capitalize">{emo.label}</span>
                    </span>
                  </div>

                  {/* Merchant & Timestamp */}
                  <div className="text-center my-2">
                    <h3 className="font-mono font-bold text-sm tracking-wider uppercase text-[#1c1813] group-hover:text-[#a16207] transition-colors">
                      {r.merchant}
                    </h3>
                    <div className="text-[10px] text-[#7d6f5c] font-mono mt-0.5 flex items-center justify-center space-x-1.5">
                      <span>{r.date}</span>
                      <span>•</span>
                      <span className="flex items-center">
                        <Clock className="w-2.5 h-2.5 mr-0.5" />
                        {r.time}
                      </span>
                    </div>
                  </div>

                  {/* Items list preview */}
                  <div className="py-2 border-t border-b border-dashed border-[#e3d8c6] space-y-1 font-mono text-[11px] text-[#332b21]">
                    {r.items.map((it) => (
                      <div key={it.id} className="flex justify-between">
                        <span className="truncate pr-2">
                          {it.quantity > 1 ? `${it.quantity}x ` : ''}{it.name}
                        </span>
                        <span className="font-semibold whitespace-nowrap">
                          ${(it.price * it.quantity).toFixed(2)}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Total */}
                  <div className="flex justify-between items-center py-2 font-mono">
                    <span className="text-[10px] text-[#6b5a45] uppercase">Total Slip</span>
                    <span className="text-sm font-bold text-[#14100b]">${r.total.toFixed(2)}</span>
                  </div>

                  {/* Handwritten Memory Note */}
                  <div className="my-2 bg-[#fefce8] p-2.5 rounded-xs border border-[#ebdb9b] shadow-2xs font-serif italic text-xs text-[#523311] leading-relaxed">
                    “{r.memoryNote}”
                  </div>
                </div>

                {/* Simulated Barcode at bottom of slip */}
                <div className="mt-3 pt-2 border-t border-dashed border-[#e6dcce] text-center">
                  <div className="flex items-center justify-center space-x-[1.5px] h-6 overflow-hidden opacity-80">
                    {[2, 1, 3, 1, 2, 4, 1, 2, 1, 3, 2, 1, 3, 2, 4, 1, 2, 3, 1, 2, 3, 1].map((w, i) => (
                      <span key={i} className="bg-[#2c241b] inline-block h-full" style={{ width: `${w}px` }} />
                    ))}
                  </div>
                  <div className="text-[8px] font-mono text-[#8f7e68] tracking-widest mt-1">
                    * {r.id.toUpperCase()} *
                  </div>
                </div>

                {/* Jagged tear bottom effect */}
                <div className="absolute bottom-0 left-0 right-0 h-1.5 bg-[radial-gradient(ellipse_at_bottom,transparent_60%,#fffefb_61%)] bg-[length:10px_6px]" />
              </div>
            );
          })}
        </div>
      ) : (
        /* ARCHIVAL LEDGER TABLE VIEW */
        <div className="bg-[#fffefc] rounded-lg border border-[#ded5c2] overflow-hidden shadow-xs">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs font-mono">
              <thead className="bg-[#f5eee2] text-[#695946] border-b border-[#ded5c2] uppercase text-[10px] tracking-wider">
                <tr>
                  <th className="py-3 px-4">Date & Time</th>
                  <th className="py-3 px-4">Merchant</th>
                  <th className="py-3 px-4">Category</th>
                  <th className="py-3 px-4">Emotion</th>
                  <th className="py-3 px-4">Life Memory Note</th>
                  <th className="py-3 px-4 text-right">Amount</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#ece2d2] text-[#2b251d]">
                {filteredReceipts.map((r) => {
                  const cat = CATEGORY_INFO[r.category] || CATEGORY_INFO.sustenance;
                  const emo = EMOTION_INFO[r.emotion] || EMOTION_INFO.mundane;
                  return (
                    <tr
                      key={r.id}
                      onClick={() => {
                        soundEffects.playReceiptTick();
                        onSelectReceipt(r);
                      }}
                      className="hover:bg-[#f8f3ea] transition-colors cursor-pointer"
                    >
                      <td className="py-3 px-4 whitespace-nowrap text-[#6e5f4d]">
                        <div>{r.date}</div>
                        <div className="text-[10px] text-[#8f7d67]">{r.time}</div>
                      </td>
                      <td className="py-3 px-4 font-bold text-[#1a1713]">
                        <div>{r.merchant}</div>
                        <div className="text-[10px] font-normal text-[#806f59]">
                          {r.location.neighborhood ? `${r.location.neighborhood}, ${r.location.city}` : r.location.city}
                        </div>
                      </td>
                      <td className="py-3 px-4 whitespace-nowrap">
                        <span
                          className="px-2 py-0.5 rounded text-[10px] font-sans font-medium uppercase"
                          style={{ backgroundColor: cat.bg, color: cat.color }}
                        >
                          {cat.label}
                        </span>
                      </td>
                      <td className="py-3 px-4 whitespace-nowrap">
                        <span className="flex items-center space-x-1 text-[11px] font-sans capitalize">
                          <span className="w-2 h-2 rounded-full" style={{ backgroundColor: emo.dotColor }} />
                          <span>{emo.label}</span>
                        </span>
                      </td>
                      <td className="py-3 px-4 max-w-xs truncate font-serif italic text-xs text-[#523e2b]">
                        “{r.memoryNote}”
                      </td>
                      <td className="py-3 px-4 text-right font-bold text-sm text-[#191510] whitespace-nowrap">
                        ${r.total.toFixed(2)}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};
