import React, { useState } from 'react';
import { 
  GitCommit, 
  ArrowRight, 
  Sparkles, 
  Clock, 
  MapPin, 
  ExternalLink,
  Share2,
  Compass,
  CheckCircle2
} from 'lucide-react';
import { Receipt, CATEGORY_INFO, EMOTION_INFO } from '../types';
import { soundEffects } from '../utils/audio';

interface ConnectionsViewProps {
  receipts: Receipt[];
  onSelectReceipt: (r: Receipt) => void;
}

interface NarrativeThread {
  id: string;
  title: string;
  subtitle: string;
  theme: string;
  receiptIds: string[];
  summary: string;
}

export const ConnectionsView: React.FC<ConnectionsViewProps> = ({
  receipts,
  onSelectReceipt,
}) => {
  const threads: NarrativeThread[] = [
    {
      id: 'thread-rupture',
      title: 'The Great Departure & Lisbon Pivot',
      subtitle: 'From cardboard moving boxes to an Atlantic morning',
      theme: 'Rupture → Flight → Arrival',
      receiptIds: ['rc-201', 'rc-202', 'rc-204', 'rc-205'],
      summary: 'A direct chain of causality spanning 22 days: packing tape from a Greenpoint hardware store leads to a panic-bought 3 AM airline ticket, resulting in warm pastries in Belém and Fernando Pessoa’s poetry.'
    },
    {
      id: 'thread-midnight',
      title: 'The Studio Exhaustion Cycle',
      subtitle: 'When fatigue turns into physical breakdown and renewed struggle',
      theme: 'Insomnia → Surcharge → Fever → New Tools',
      receiptIds: ['rc-101', 'rc-102', 'rc-103', 'rc-104'],
      summary: 'A closed loop of adrenaline: late diner coffee leads to a surge-priced cab across the bridge, culminating in fever medicine from a 24-hour pharmacy, followed immediately by fresh drafting vellum.'
    },
    {
      id: 'thread-healing',
      title: 'The Architecture of Slow Rebuilding',
      subtitle: 'From a thrifted desk lamp to signing a workshop lease',
      theme: 'Domesticity → Sustenance → Roots → Studio',
      receiptIds: ['rc-301', 'rc-302', 'rc-304', 'rc-401', 'rc-404'],
      summary: 'Healing charted through objects: buying a re-wired 1960s brass lamp restores evening warmth, leading to baking bread, potting plants, opening an independent studio, and planting perennial seeds.'
    },
    {
      id: 'thread-ghosts',
      title: 'Severing the Invisible Tether',
      subtitle: 'From post-breakup inertia to total administrative clarity',
      theme: 'Dormancy → Renewal → Cancellation',
      receiptIds: ['rc-106', 'rc-403'],
      summary: 'The eleven-month journey from silently paying for an ex’s Spotify family tier to sitting down on a bright Tuesday morning and purging all phantom digital obligations.'
    }
  ];

  const [selectedThreadId, setSelectedThreadId] = useState<string>(threads[0].id);
  const activeThread = threads.find(t => t.id === selectedThreadId) || threads[0];

  // Resolve thread receipts in order
  const threadReceipts = activeThread.receiptIds
    .map(id => receipts.find(r => r.id === id))
    .filter((r): r is Receipt => Boolean(r));

  return (
    <div className="py-6 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-6">
      
      {/* Header */}
      <div className="border-b border-[#e5ded0] pb-5">
        <div className="flex items-center space-x-2 text-xs font-mono uppercase tracking-wider text-[#85745e]">
          <span>PHASE 03: CONNECTIONS</span>
          <span>•</span>
          <span>THE RELATIONAL CONSTELLATION</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-display font-bold text-[#241e17] mt-1">
          Invisible Threads: Life’s Causal Chains
        </h1>
        <p className="text-xs sm:text-sm font-serif italic text-[#695a47] max-w-2xl mt-1">
          No receipt is an island. A $42 box cutter is intimately tied to a $489 plane ticket; a $38 brass desk lamp is the catalyst for a $650 studio lease. Follow the threads.
        </p>
      </div>

      {/* Thread Selector Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {threads.map((thread) => {
          const isSelected = thread.id === selectedThreadId;
          return (
            <button
              key={thread.id}
              onClick={() => {
                soundEffects.playPageFlip();
                setSelectedThreadId(thread.id);
              }}
              className={`p-4 rounded-lg text-left transition-all cursor-pointer border ${
                isSelected
                  ? 'bg-[#2d251d] text-[#f7f2e7] border-[#18130e] shadow-md -translate-y-0.5'
                  : 'bg-[#f8f4ec] text-[#423628] border-[#ded5c2] hover:bg-[#ede5d5]'
              }`}
            >
              <div className="flex items-center justify-between text-[10px] font-mono uppercase tracking-wider mb-2">
                <span className={isSelected ? 'text-[#dfcfae]' : 'text-[#877762]'}>
                  {thread.theme}
                </span>
                <span className={`px-1.5 py-0.5 rounded text-[9px] ${isSelected ? 'bg-[#40352a]' : 'bg-[#e7decb]'}`}>
                  {thread.receiptIds.length} Nodes
                </span>
              </div>
              <h3 className="font-display font-bold text-sm leading-snug">
                {thread.title}
              </h3>
              <p className={`text-xs font-serif italic mt-1 ${isSelected ? 'text-[#c7baa6]' : 'text-[#70604d]'}`}>
                {thread.subtitle}
              </p>
            </button>
          );
        })}
      </div>

      {/* Active Thread Narrative Banner */}
      <div className="bg-[#fcfbf7] p-5 sm:p-6 rounded-xl border border-[#ded5c2] shadow-xs">
        <div className="flex items-center space-x-2 text-xs font-mono text-[#8a7251] uppercase tracking-wider mb-1">
          <Share2 className="w-4 h-4 text-[#a16207]" />
          <span>Active Narrative Thread</span>
        </div>
        <h2 className="text-xl sm:text-2xl font-display font-bold text-[#241e17]">
          {activeThread.title}
        </h2>
        <p className="font-serif italic text-xs sm:text-sm text-[#574735] mt-2 max-w-3xl leading-relaxed">
          {activeThread.summary}
        </p>

        {/* Visual Causal Timeline Flow */}
        <div className="mt-8 relative">
          
          {/* Connecting dashed line behind items */}
          <div className="hidden lg:block absolute top-1/2 left-8 right-8 -translate-y-1/2 h-0.5 border-t-2 border-dashed border-[#b8a994] z-0" />

          {/* Sequential Chain of Receipts */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 relative z-10">
            {threadReceipts.map((r, idx) => {
              const cat = CATEGORY_INFO[r.category] || CATEGORY_INFO.sustenance;
              const emo = EMOTION_INFO[r.emotion] || EMOTION_INFO.mundane;
              return (
                <div key={r.id} className="flex flex-col">
                  {/* Step Sequence Badge */}
                  <div className="flex items-center space-x-2 mb-2">
                    <span className="w-6 h-6 rounded-full bg-[#2b241c] text-[#fbf7ee] font-mono text-xs font-bold flex items-center justify-center shadow-xs">
                      {idx + 1}
                    </span>
                    <span className="text-[10px] font-mono uppercase text-[#7a6b57]">
                      Station {idx + 1} of {threadReceipts.length}
                    </span>
                    {idx < threadReceipts.length - 1 && (
                      <ArrowRight className="w-3.5 h-3.5 text-[#a89984] lg:hidden ml-auto" />
                    )}
                  </div>

                  {/* Receipt Station Card */}
                  <div
                    onClick={() => {
                      soundEffects.playReceiptTick();
                      onSelectReceipt(r);
                    }}
                    className="bg-[#fffefb] p-4 rounded-lg border border-[#ded5c2] shadow-xs hover:shadow-md transition-all cursor-pointer flex-1 flex flex-col justify-between group hover:-translate-y-1"
                  >
                    <div>
                      {/* Category & Date */}
                      <div className="flex items-center justify-between text-[10px] border-b border-dashed border-[#e3d7c5] pb-2 mb-2 font-mono">
                        <span
                          className="px-1.5 py-0.5 rounded font-sans uppercase font-medium text-[9px]"
                          style={{ backgroundColor: cat.bg, color: cat.color }}
                        >
                          {cat.label}
                        </span>
                        <span className="text-[#7d6e5c]">{r.date}</span>
                      </div>

                      <h4 className="font-mono font-bold text-xs uppercase text-[#1a1713] group-hover:text-[#92400e] transition-colors">
                        {r.merchant}
                      </h4>
                      <div className="text-[10px] text-[#736351] font-sans">
                        {r.location.city} • {r.time}
                      </div>

                      <div className="my-2 text-xs font-mono font-bold text-[#1a1713]">
                        ${r.total.toFixed(2)}
                      </div>

                      {/* Handwritten Sticky Note Excerpt */}
                      <div className="bg-[#fefce8] p-2 rounded text-[11px] font-serif italic text-[#4a2e0e] border border-[#ebd999] leading-snug">
                        “{r.memoryNote}”
                      </div>
                    </div>

                    <div className="mt-3 pt-2 border-t border-[#f0e7d8] flex items-center justify-between text-[10px] font-mono text-[#8a7965]">
                      <span className="capitalize">{r.emotion}</span>
                      <span className="text-[#a16207] font-semibold flex items-center">
                        Inspect slip <ExternalLink className="w-2.5 h-2.5 ml-1" />
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Relational Philosophy Marginalia */}
      <div className="bg-[#f5eee2] p-4 sm:p-5 rounded-lg border border-[#ddd3c0] text-xs font-serif italic text-[#635340] leading-relaxed text-center">
        “We imagine our lives are guided by five-year plans. In truth, our trajectories hinge on small receipts: a pair of packing shears, a train car tea, or seeds dropped into wet earth.”
      </div>
    </div>
  );
};
