import React, { useState } from 'react';
import { 
  Moon, 
  Clock, 
  MapPin, 
  Ghost, 
  Heart, 
  Compass, 
  Sparkles, 
  Coffee, 
  ArrowRight,
  ShieldAlert,
  Flame
} from 'lucide-react';
import { Receipt, CATEGORY_INFO, EMOTION_INFO, EmotionType } from '../types';
import { soundEffects } from '../utils/audio';

interface InsightsViewProps {
  receipts: Receipt[];
  onSelectReceipt: (r: Receipt) => void;
}

export const InsightsView: React.FC<InsightsViewProps> = ({
  receipts,
  onSelectReceipt,
}) => {
  const [activeTab, setActiveTab] = useState<'2am' | 'emotions' | 'ghost' | 'geography'>('2am');

  // Compute 2:00 AM index
  const midnightReceipts = receipts.filter(r => r.hour24 >= 0 && r.hour24 <= 5);
  const midnightTotal = midnightReceipts.reduce((acc, r) => acc + r.total, 0);
  const totalSpend = receipts.reduce((acc, r) => acc + r.total, 0);
  const midnightPct = totalSpend > 0 ? (midnightTotal / totalSpend) * 100 : 0;

  // Emotional breakdown
  const emotionGroups: Record<EmotionType, { total: number; count: number; receipts: Receipt[] }> = {
    vulnerable: { total: 0, count: 0, receipts: [] },
    celebratory: { total: 0, count: 0, receipts: [] },
    solitary: { total: 0, count: 0, receipts: [] },
    searching: { total: 0, count: 0, receipts: [] },
    mundane: { total: 0, count: 0, receipts: [] },
    escapist: { total: 0, count: 0, receipts: [] },
    tender: { total: 0, count: 0, receipts: [] },
  };

  receipts.forEach(r => {
    if (emotionGroups[r.emotion]) {
      emotionGroups[r.emotion].total += r.total;
      emotionGroups[r.emotion].count += 1;
      emotionGroups[r.emotion].receipts.push(r);
    }
  });

  // Hours histogram (0 to 23)
  const hourlyCounts = Array(24).fill(0);
  receipts.forEach(r => {
    hourlyCounts[r.hour24] = (hourlyCounts[r.hour24] || 0) + 1;
  });
  const maxHourly = Math.max(...hourlyCounts, 1);

  // Subscriptions
  const subscriptionReceipts = receipts.filter(r => r.category === 'subscriptions');

  // Geography locations
  const cities: Record<string, { count: number; total: number; sampleReceipt: Receipt }> = {};
  receipts.forEach(r => {
    const key = r.location.city;
    if (!cities[key]) {
      cities[key] = { count: 0, total: 0, sampleReceipt: r };
    }
    cities[key].count += 1;
    cities[key].total += r.total;
  });

  return (
    <div className="py-6 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-6">
      
      {/* Title & Archival Introduction */}
      <div className="border-b border-[#e5ded0] pb-5">
        <div className="flex items-center space-x-2 text-xs font-mono uppercase tracking-wider text-[#85745e]">
          <span>PHASE 02: INSIGHTS & MARGINALIA</span>
          <span>•</span>
          <span>THE EMOTIONAL BALANCE SHEET</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-display font-bold text-[#241e17] mt-1">
          Patterns in the Digital Sediment
        </h1>
        <p className="text-xs sm:text-sm font-serif italic text-[#695a47] max-w-2xl mt-1">
          Money is an emotional medium. When we examine transactions not for tax compliance, but for human vulnerability, an honest psychological portrait begins to form.
        </p>
      </div>

      {/* Navigation tabs for insight lenses */}
      <div className="flex flex-wrap gap-2 border-b border-[#e2d8c7] pb-3">
        {[
          { id: '2am', label: '🌙 The 2:00 AM Index', desc: 'Nocturnal vulnerability' },
          { id: 'emotions', label: '⚖️ Emotional Balance Sheet', desc: 'Spend by human state' },
          { id: 'ghost', label: '👻 Ghost Subscriptions', desc: 'Unchecked recurrent memory' },
          { id: 'geography', label: '📍 Geography of Belonging', desc: 'Footsteps and migrations' },
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => {
              soundEffects.playChime();
              setActiveTab(tab.id as typeof activeTab);
            }}
            className={`px-3.5 py-2 rounded-md text-xs font-sans transition-all cursor-pointer ${
              activeTab === tab.id
                ? 'bg-[#2b241c] text-[#f7f2e6] font-semibold shadow-xs'
                : 'bg-[#f4efe4] text-[#5e4e3d] hover:bg-[#eae2d3]'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* VIEW 1: THE 2:00 AM INDEX */}
      {activeTab === '2am' && (
        <div className="space-y-6">
          
          {/* Hero insight callout */}
          <div className="bg-[#1c1917] text-[#f5f1e8] p-6 sm:p-8 rounded-xl shadow-xl border border-[#3c342b]">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
              <div className="space-y-2 max-w-2xl">
                <div className="flex items-center space-x-2 text-xs font-mono uppercase text-[#eab308]">
                  <Moon className="w-4 h-4" />
                  <span>The Nocturnal Ratio</span>
                </div>
                <h2 className="text-xl sm:text-2xl font-display font-bold text-[#faf7f2]">
                  {midnightPct.toFixed(1)}% of total life spend occurred between midnight and 5:00 AM
                </h2>
                <p className="text-xs sm:text-sm font-serif italic text-[#c9bea9] leading-relaxed">
                  “When sleep will not come, the wallet opens. The receipts between 12:00 AM and 5:00 AM tell the story of panic deadlines, feverish emergencies, and the sudden, solitary courage to book a one-way plane ticket out of a suffocating life.”
                </p>
              </div>

              <div className="bg-[#2c241c] p-4 rounded-lg border border-[#4d3f32] text-center min-w-[200px]">
                <div className="text-[10px] font-mono uppercase text-[#9e8f7a]">Nocturnal Capital</div>
                <div className="text-2xl font-bold font-mono text-[#fde047] my-1">
                  ${midnightTotal.toFixed(2)}
                </div>
                <div className="text-[11px] text-[#beb19c] font-sans">
                  Across {midnightReceipts.length} witching-hour transactions
                </div>
              </div>
            </div>

            {/* 24-Hour Circadian Rhythm Bar Chart */}
            <div className="mt-8 pt-6 border-t border-[#3d3328]">
              <div className="flex items-center justify-between text-xs font-mono text-[#998b77] mb-3">
                <span className="flex items-center">
                  <Clock className="w-3.5 h-3.5 mr-1" />
                  Circadian Distribution (Hour 00:00 to 23:00)
                </span>
                <span className="text-[#eab308] text-[11px]">Yellow columns indicate 12 AM - 5 AM</span>
              </div>

              <div className="grid grid-cols-24 gap-1 items-end h-28 pt-2">
                {hourlyCounts.map((count, hr) => {
                  const isMidnight = hr >= 0 && hr <= 5;
                  const heightPct = (count / maxHourly) * 100;
                  return (
                    <div key={hr} className="flex flex-col items-center h-full justify-end group relative">
                      {/* Tooltip */}
                      <div className="absolute -top-7 hidden group-hover:flex px-1.5 py-0.5 rounded bg-black text-[9px] font-mono text-white whitespace-nowrap z-20">
                        {hr.toString().padStart(2, '0')}:00 • {count} rec
                      </div>
                      <div
                        className={`w-full rounded-t-xs transition-all duration-300 ${
                          isMidnight 
                            ? 'bg-[#eab308] group-hover:bg-[#facc15]' 
                            : 'bg-[#57493a] group-hover:bg-[#806c57]'
                        }`}
                        style={{ height: `${Math.max(8, heightPct)}%` }}
                      />
                      <span className="text-[8px] font-mono text-[#8a7a67] mt-1">
                        {hr % 4 === 0 ? hr : ''}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Individual Midnight Receipts Inspection */}
          <div>
            <h3 className="text-sm font-mono uppercase tracking-wider font-bold text-[#3a3024] mb-3 flex items-center">
              <Flame className="w-4 h-4 mr-1.5 text-[#b45309]" />
              Artifacts of the Insomnia Shift
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {midnightReceipts.map((r) => (
                <div
                  key={r.id}
                  onClick={() => {
                    soundEffects.playReceiptTick();
                    onSelectReceipt(r);
                  }}
                  className="bg-[#fffefb] p-4 rounded-lg border border-[#ded5c2] shadow-xs hover:shadow-md cursor-pointer transition-all hover:-translate-y-0.5"
                >
                  <div className="flex items-center justify-between text-xs font-mono mb-2">
                    <span className="font-bold text-[#b45309] flex items-center">
                      <Moon className="w-3 h-3 mr-1" />
                      {r.time}
                    </span>
                    <span className="font-bold text-[#1a1713]">${r.total.toFixed(2)}</span>
                  </div>

                  <div className="font-mono text-xs font-bold uppercase text-[#241e17]">
                    {r.merchant}
                  </div>
                  <div className="text-[10px] text-[#7a6b58] font-sans mt-0.5">
                    {r.date} • {r.location.city}
                  </div>

                  <div className="my-2.5 bg-[#fefce8] p-2 rounded text-xs font-serif italic text-[#4a2e0e] border border-[#e8d89e]">
                    “{r.memoryNote}”
                  </div>

                  <div className="text-[10px] text-[#8c7a65] flex items-center justify-between font-sans">
                    <span className="capitalize">{r.emotion} state</span>
                    <span className="text-[#a16207] font-semibold">Inspect slip →</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* VIEW 2: EMOTIONAL BALANCE SHEET */}
      {activeTab === 'emotions' && (
        <div className="space-y-6">
          <div className="bg-[#fcfbf7] p-5 sm:p-7 rounded-xl border border-[#ded5c2] shadow-xs">
            <h2 className="text-lg sm:text-xl font-display font-bold text-[#241e17] mb-1">
              The Emotional Distribution of Capital
            </h2>
            <p className="text-xs font-serif italic text-[#6e5d4a] mb-6">
              When we classify expenses by psychological state rather than accounting categories, we see the true currents of human expenditure.
            </p>

            <div className="space-y-4">
              {Object.entries(emotionGroups).map(([emotionKey, data]) => {
                const emoInfo = EMOTION_INFO[emotionKey];
                const pct = totalSpend > 0 ? (data.total / totalSpend) * 100 : 0;
                return (
                  <div key={emotionKey} className="bg-[#f7f2e7] p-4 rounded-lg border border-[#e0d6c3]">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-2">
                      <div className="flex items-center space-x-2">
                        <span className="w-3 h-3 rounded-full" style={{ backgroundColor: emoInfo.dotColor }} />
                        <span className="font-sans font-bold text-xs capitalize text-[#221b14]">
                          {emoInfo.label}
                        </span>
                        <span className="text-[11px] font-serif italic text-[#70604c] hidden md:inline">
                          — {emoInfo.tone}
                        </span>
                      </div>
                      <div className="text-right text-xs font-mono">
                        <span className="font-bold text-[#1a1713]">${data.total.toFixed(2)}</span>
                        <span className="text-[#786955] ml-2 font-normal">
                          ({pct.toFixed(1)}% • {data.count} receipts)
                        </span>
                      </div>
                    </div>

                    {/* Progress Bar */}
                    <div className="w-full h-2.5 bg-[#e3d7c4] rounded-full overflow-hidden mb-2">
                      <div
                        className="h-full rounded-full transition-all duration-500"
                        style={{
                          width: `${Math.max(2, pct)}%`,
                          backgroundColor: emoInfo.dotColor
                        }}
                      />
                    </div>

                    {/* Evocative samples in this emotional state */}
                    <div className="flex flex-wrap gap-2 text-[10px] font-mono text-[#574836] mt-1">
                      {data.receipts.slice(0, 3).map((r) => (
                        <button
                          key={r.id}
                          onClick={() => {
                            soundEffects.playReceiptTick();
                            onSelectReceipt(r);
                          }}
                          className="px-2 py-0.5 rounded bg-white hover:bg-[#fff9eb] border border-[#d6ccb8] cursor-pointer transition-colors"
                        >
                          {r.merchant} (${r.total.toFixed(0)})
                        </button>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* VIEW 3: GHOST SUBSCRIPTIONS */}
      {activeTab === 'ghost' && (
        <div className="space-y-6">
          <div className="bg-[#fbf9f4] p-5 sm:p-7 rounded-xl border border-[#ded5c2]">
            <div className="flex items-center space-x-2 text-xs font-mono text-[#786754] uppercase tracking-wider mb-2">
              <Ghost className="w-4 h-4 text-[#63513d]" />
              <span>Ghost Ledgers & Phantom Deductions</span>
            </div>
            <h2 className="text-lg sm:text-xl font-display font-bold text-[#241e17]">
              The Subscriptions That Outlived Their Purpose
            </h2>
            <p className="text-xs sm:text-sm font-serif italic text-[#6e5d4a] max-w-2xl mt-1 mb-6">
              A subscription is a promise of ongoing utility that often morphs into a tax on forgetting. Some are financial memorials; others are simply forgotten background noise.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {subscriptionReceipts.map((sub) => (
                <div 
                  key={sub.id} 
                  className="bg-[#fffefb] p-5 rounded-lg border border-[#ded5c2] shadow-xs relative"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <span className="text-[10px] font-mono uppercase bg-[#eee5d5] px-2 py-0.5 rounded text-[#594b39]">
                        Recurring Deduction
                      </span>
                      <h3 className="font-mono font-bold text-sm uppercase text-[#1a1713] mt-2">
                        {sub.merchant}
                      </h3>
                      <div className="text-xs text-[#70604d] font-sans">{sub.subtitle}</div>
                    </div>
                    <span className="text-base font-bold font-mono text-[#1a1713]">
                      ${sub.total.toFixed(2)}/mo
                    </span>
                  </div>

                  <div className="my-3 bg-[#fefce8] p-3 rounded text-xs font-serif italic text-[#4a2e0e] border border-[#e8d89e]">
                    “{sub.memoryNote}”
                  </div>

                  <div className="text-[11px] text-[#806f5b] font-mono pt-2 border-t border-dashed border-[#e6dccb] flex items-center justify-between">
                    <span>Payment: {sub.paymentMethod}</span>
                    <button
                      onClick={() => onSelectReceipt(sub)}
                      className="text-[#92400e] hover:underline cursor-pointer font-sans text-xs"
                    >
                      Audit Slip →
                    </button>
                  </div>
                </div>
              ))}

              {/* Ghost cancellation insight */}
              <div className="bg-[#f4eee2] p-5 rounded-lg border border-[#cfc2ad] flex flex-col justify-between">
                <div>
                  <div className="flex items-center space-x-1.5 text-xs font-mono font-bold text-[#15803d] uppercase mb-1">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Resolution: The Great Cleanse</span>
                  </div>
                  <h4 className="text-sm font-bold text-[#221b14]">
                    The Reclaimed Margin
                  </h4>
                  <p className="text-xs font-serif italic text-[#5e4e3b] mt-2 leading-relaxed">
                    When the seven dormant subscriptions were finally canceled on April 2024, it was not merely $54.98 saved each month. It was the formal closing of accounts with versions of oneself that no longer existed.
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-[#dfd2be] text-xs font-mono font-semibold text-[#3b3124]">
                  Annual Freedom Value: $659.76 / year
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* VIEW 4: GEOGRAPHY OF BELONGING */}
      {activeTab === 'geography' && (
        <div className="space-y-6">
          <div className="bg-[#fcfbf7] p-5 sm:p-7 rounded-xl border border-[#ded5c2]">
            <h2 className="text-lg sm:text-xl font-display font-bold text-[#241e17] mb-1">
              The Geography of Footsteps
            </h2>
            <p className="text-xs font-serif italic text-[#6e5d4a] mb-6">
              A bank statement is also a passport. Every merchant code anchors a physical coordinate where someone stood, exchanged paper or plastic, and took another step forward.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {Object.entries(cities).map(([cityKey, cityData]) => (
                <div
                  key={cityKey}
                  onClick={() => {
                    soundEffects.playReceiptTick();
                    onSelectReceipt(cityData.sampleReceipt);
                  }}
                  className="bg-[#fffefb] p-4 rounded-lg border border-[#ded5c2] shadow-xs hover:shadow-md cursor-pointer transition-all hover:-translate-y-0.5"
                >
                  <div className="flex items-center space-x-2 text-[#92400e] mb-2">
                    <MapPin className="w-4 h-4" />
                    <span className="font-display font-bold text-sm text-[#1f1912]">{cityKey}</span>
                  </div>

                  <div className="flex justify-between text-xs font-mono text-[#6e5e4c] border-b border-[#eee5d5] pb-2 mb-2">
                    <span>{cityData.count} Recorded Slips</span>
                    <span className="font-bold text-[#1c1813]">${cityData.total.toFixed(2)}</span>
                  </div>

                  <div className="text-xs font-serif italic text-[#4a3a28] line-clamp-2">
                    Sample: “{cityData.sampleReceipt.memoryNote}”
                  </div>

                  <div className="mt-3 text-[10px] font-mono text-[#8a7a67] flex items-center justify-between">
                    <span>{cityData.sampleReceipt.merchant}</span>
                    <span className="text-[#a16207] font-semibold">Inspect location →</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
