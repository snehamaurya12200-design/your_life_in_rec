import React, { useState } from 'react';
import { X, Sparkles, Check } from 'lucide-react';
import { Receipt, CategoryType, EmotionType, CATEGORY_INFO, EMOTION_INFO } from '../types';
import { soundEffects } from '../utils/audio';

interface AddReceiptModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddReceipt: (receipt: Receipt) => void;
  activeChapterId: string;
}

export const AddReceiptModal: React.FC<AddReceiptModalProps> = ({
  isOpen,
  onClose,
  onAddReceipt,
  activeChapterId
}) => {
  if (!isOpen) return null;

  const [presetKey, setPresetKey] = useState<string>('custom');
  const [merchant, setMerchant] = useState('');
  const [subtitle, setSubtitle] = useState('');
  const [category, setCategory] = useState<CategoryType>('sustenance');
  const [emotion, setEmotion] = useState<EmotionType>('solitary');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [time, setTime] = useState('02:15 AM');
  const [total, setTotal] = useState('18.50');
  const [itemName, setItemName] = useState('Black Coffee & Buttered Biscuit');
  const [city, setCity] = useState('Brooklyn, NY');
  const [memoryNote, setMemoryNote] = useState('');
  const [tags, setTags] = useState('Midnight, Solitude, Rain');

  const presets = [
    {
      id: 'diner',
      label: '🌙 2 AM Diner Run',
      merchant: 'MIDNIGHT CORNER DINER',
      subtitle: 'Counter Booth #2',
      category: 'midnight' as CategoryType,
      emotion: 'vulnerable' as EmotionType,
      total: '21.50',
      time: '02:30 AM',
      itemName: 'Pancakes, Scrambled Eggs & Endless Drip Coffee',
      city: 'Brooklyn, NY',
      memoryNote: 'Could not sleep. Stared at the salt shaker while the radiator hissed.',
      tags: 'Midnight, Diner, Insomnia'
    },
    {
      id: 'bookstore',
      label: '📚 Used Book Find',
      merchant: 'SECOND LOOK BOOKSHOP',
      subtitle: 'Vintage Paperbacks Section',
      category: 'culture' as CategoryType,
      emotion: 'searching' as EmotionType,
      total: '16.00',
      time: '04:15 PM',
      itemName: 'Vintage Paperback & Postcard',
      city: 'Portland, OR',
      memoryNote: 'Found an underlined copy of Joan Didion with a dried four-leaf clover pressed on page 88.',
      tags: 'Books, Paperbacks, Sanctuary'
    },
    {
      id: 'transit',
      label: '🚂 Train Ticket',
      merchant: 'REGIONAL RAIL PASSAGE',
      subtitle: 'Platform 3 • Window Seat',
      category: 'transit' as CategoryType,
      emotion: 'escapist' as EmotionType,
      total: '38.00',
      time: '07:45 AM',
      itemName: 'One-Way Coastline Ticket',
      city: 'Pacific Northwest',
      memoryNote: 'Leaving without telling anyone where I was going until the train crossed the county line.',
      tags: 'Transit, Train, Escape'
    },
    {
      id: 'flowers',
      label: '💐 Spontaneous Flowers',
      merchant: 'PETAL & VINE BOTANICAL',
      subtitle: 'Wrapped in Brown Kraft Paper',
      category: 'rituals' as CategoryType,
      emotion: 'tender' as EmotionType,
      total: '24.00',
      time: '01:20 PM',
      itemName: 'Fresh Eucalyptus & Wild Ranunculus',
      city: 'Downtown Market',
      memoryNote: 'Bought them simply because the sun had finally come out after eight straight days of gray fog.',
      tags: 'Flowers, Sun, Joy'
    }
  ];

  const applyPreset = (p: typeof presets[0]) => {
    setPresetKey(p.id);
    setMerchant(p.merchant);
    setSubtitle(p.subtitle);
    setCategory(p.category);
    setEmotion(p.emotion);
    setTotal(p.total);
    setTime(p.time);
    setItemName(p.itemName);
    setCity(p.city);
    setMemoryNote(p.memoryNote);
    setTags(p.tags);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!merchant.trim()) return;

    soundEffects.playReceiptTick();

    const newReceipt: Receipt = {
      id: `rc-${Date.now().toString().slice(-6)}`,
      merchant: merchant.trim().toUpperCase(),
      subtitle: subtitle.trim() || undefined,
      category,
      date,
      time,
      hour24: parseInt(time.split(':')[0], 10) || 12,
      total: parseFloat(total) || 12.00,
      items: [
        {
          id: `item-${Date.now()}`,
          name: itemName.trim() || 'Item Details',
          quantity: 1,
          price: parseFloat(total) || 12.00
        }
      ],
      paymentMethod: 'Contactless Card •••• 5591',
      location: {
        city: city.trim() || 'Uncharted Place',
      },
      emotion,
      memoryNote: memoryNote.trim() || 'A quiet moment recorded in the archive ledger.',
      tags: tags.split(',').map(t => t.trim()).filter(Boolean),
      connectedReceiptIds: [],
      chapterId: activeChapterId
    };

    onAddReceipt(newReceipt);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/60 backdrop-blur-xs overflow-y-auto">
      <div className="fixed inset-0" onClick={onClose} />

      <div className="relative w-full max-w-xl my-auto z-10 bg-[#fcfbf7] rounded-lg shadow-2xl border border-[#d6ccb8] p-5 sm:p-7 text-[#2a241b]">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-[#e8dfcf] pb-4 mb-4">
          <div>
            <span className="text-[10px] uppercase font-mono tracking-widest text-[#8a7a66]">
              • ARCHIVE ENTRY •
            </span>
            <h2 className="text-lg sm:text-xl font-display font-bold text-[#1f1a14]">
              Log a Digital Life Receipt
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded text-[#7d6e5a] hover:text-black hover:bg-[#eee5d4] transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Quick presets picker */}
        <div className="mb-4">
          <label className="block text-[11px] font-mono text-[#6c5d49] uppercase tracking-wider mb-2">
            Choose a Moment Archetype:
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {presets.map((p) => (
              <button
                key={p.id}
                type="button"
                onClick={() => applyPreset(p)}
                className={`px-2.5 py-1.5 text-xs rounded-md border text-left cursor-pointer transition-all ${
                  presetKey === p.id 
                    ? 'bg-[#3b3126] text-[#f7f2e6] border-[#221c16] font-medium shadow-xs' 
                    : 'bg-[#f4eee1] text-[#473c2f] border-[#ded3be] hover:bg-[#ede5d4]'
                }`}
              >
                {p.label}
              </button>
            ))}
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-3.5 text-xs">
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block font-medium text-[#4b4033] mb-1">Merchant / Institution</label>
              <input
                type="text"
                value={merchant}
                onChange={(e) => setMerchant(e.target.value)}
                placeholder="e.g. MOONLIGHT BAKERY"
                required
                className="w-full px-3 py-2 bg-white border border-[#d6ccba] rounded-md focus:ring-1 focus:ring-[#8c7453] focus:outline-hidden font-mono text-xs"
              />
            </div>
            <div>
              <label className="block font-medium text-[#4b4033] mb-1">Subtitle / Context</label>
              <input
                type="text"
                value={subtitle}
                onChange={(e) => setSubtitle(e.target.value)}
                placeholder="e.g. Counter Order #14"
                className="w-full px-3 py-2 bg-white border border-[#d6ccba] rounded-md focus:ring-1 focus:ring-[#8c7453] focus:outline-hidden text-xs"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div>
              <label className="block font-medium text-[#4b4033] mb-1">Category</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as CategoryType)}
                className="w-full px-2.5 py-2 bg-white border border-[#d6ccba] rounded-md focus:ring-1 focus:ring-[#8c7453] focus:outline-hidden text-xs"
              >
                {Object.entries(CATEGORY_INFO).map(([k, v]) => (
                  <option key={k} value={k}>{v.label}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block font-medium text-[#4b4033] mb-1">Emotion</label>
              <select
                value={emotion}
                onChange={(e) => setEmotion(e.target.value as EmotionType)}
                className="w-full px-2.5 py-2 bg-white border border-[#d6ccba] rounded-md focus:ring-1 focus:ring-[#8c7453] focus:outline-hidden text-xs"
              >
                {Object.entries(EMOTION_INFO).map(([k, v]) => (
                  <option key={k} value={k}>{v.label}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block font-medium text-[#4b4033] mb-1">Total ($)</label>
              <input
                type="number"
                step="0.01"
                value={total}
                onChange={(e) => setTotal(e.target.value)}
                required
                className="w-full px-3 py-2 bg-white border border-[#d6ccba] rounded-md focus:ring-1 focus:ring-[#8c7453] focus:outline-hidden font-mono text-xs"
              />
            </div>

            <div>
              <label className="block font-medium text-[#4b4033] mb-1">Time</label>
              <input
                type="text"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                placeholder="02:15 AM"
                className="w-full px-3 py-2 bg-white border border-[#d6ccba] rounded-md focus:ring-1 focus:ring-[#8c7453] focus:outline-hidden font-mono text-xs"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block font-medium text-[#4b4033] mb-1">Items / Description</label>
              <input
                type="text"
                value={itemName}
                onChange={(e) => setItemName(e.target.value)}
                placeholder="What was bought?"
                className="w-full px-3 py-2 bg-white border border-[#d6ccba] rounded-md focus:ring-1 focus:ring-[#8c7453] focus:outline-hidden text-xs"
              />
            </div>
            <div>
              <label className="block font-medium text-[#4b4033] mb-1">Location (City, Neighborhood)</label>
              <input
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                placeholder="e.g. Seattle, WA"
                className="w-full px-3 py-2 bg-white border border-[#d6ccba] rounded-md focus:ring-1 focus:ring-[#8c7453] focus:outline-hidden text-xs"
              />
            </div>
          </div>

          <div>
            <label className="block font-medium text-[#4b4033] mb-1">
              Handwritten Memory Note (The Human Reality Behind the Transaction)
            </label>
            <textarea
              value={memoryNote}
              onChange={(e) => setMemoryNote(e.target.value)}
              placeholder="What was happening in your life when this receipt was issued?"
              rows={2}
              className="w-full px-3 py-2 bg-white border border-[#d6ccba] rounded-md focus:ring-1 focus:ring-[#8c7453] focus:outline-hidden font-serif italic text-xs text-[#3d2713]"
            />
          </div>

          <div>
            <label className="block font-medium text-[#4b4033] mb-1">Tags (comma-separated)</label>
            <input
              type="text"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              placeholder="Midnight, Rain, Coffee"
              className="w-full px-3 py-2 bg-white border border-[#d6ccba] rounded-md focus:ring-1 focus:ring-[#8c7453] focus:outline-hidden text-xs font-mono"
            />
          </div>

          <div className="pt-3 border-t border-[#e8dfcf] flex items-center justify-end space-x-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs text-[#6e5e49] hover:bg-[#eee5d3] rounded-md transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="inline-flex items-center space-x-1.5 px-5 py-2 text-xs font-semibold text-[#f8f5ee] bg-[#2f271f] hover:bg-black rounded-md shadow-sm transition-transform active:scale-95 cursor-pointer"
            >
              <Check className="w-4 h-4 text-[#dfcfaf]" />
              <span>Affix to Living Book</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
