import React from 'react';
import { X, Printer, Download, Sparkles, ScrollText } from 'lucide-react';
import { Persona, Receipt } from '../types';
import { soundEffects } from '../utils/audio';

interface ThermalScrollModalProps {
  isOpen: boolean;
  onClose: () => void;
  receipts: Receipt[];
  persona: Persona;
}

export const ThermalScrollModal: React.FC<ThermalScrollModalProps> = ({
  isOpen,
  onClose,
  receipts,
  persona
}) => {
  if (!isOpen) return null;

  const totalSpent = receipts.reduce((acc, r) => acc + r.total, 0);

  const handlePrint = () => {
    soundEffects.playReceiptTick();
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/70 backdrop-blur-xs overflow-y-auto">
      <div className="fixed inset-0" onClick={onClose} />

      <div className="relative w-full max-w-md my-auto z-10 max-h-[90vh] flex flex-col">
        
        {/* Floating Top Controls */}
        <div className="flex items-center justify-between bg-[#26201a] text-[#f4efe4] p-3 rounded-t-lg border-b border-[#473b2f]">
          <div className="flex items-center space-x-2 text-xs font-mono">
            <ScrollText className="w-4 h-4 text-[#dfcfae]" />
            <span className="font-bold uppercase tracking-wider">Continuous Receipt Tape</span>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={handlePrint}
              className="px-2.5 py-1 text-xs rounded bg-[#3b3228] hover:bg-[#524434] text-[#f7f3ea] flex items-center space-x-1 cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print</span>
            </button>
            <button
              onClick={onClose}
              className="p-1 rounded text-[#a69682] hover:text-white cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Scrollable Thermal Paper Tape */}
        <div className="bg-[#fffefb] text-[#1a1714] p-6 overflow-y-auto font-mono text-xs rounded-b-lg shadow-2xl border-x border-[#ded5c2] divide-y divide-dashed divide-[#d4c8b6] space-y-6">
          
          {/* Tape Header */}
          <div className="text-center pt-2 pb-4 space-y-1">
            <div className="text-[10px] tracking-widest text-[#7a6b57] uppercase">
              • OFFICIAL MEMORY REGISTER •
            </div>
            <div className="text-sm font-bold uppercase tracking-wider">
              {persona.name.toUpperCase()}
            </div>
            <div className="text-[10px] text-[#695a48] italic font-serif">
              “Your Life, In Receipts” — Comprehensive Roll
            </div>
            <div className="text-[10px] text-[#806f5b]">
              PERIOD: {persona.period} • {receipts.length} SLIPS
            </div>
          </div>

          {/* Sequential Receipts on Roll */}
          {receipts.map((r, idx) => (
            <div key={r.id} className="pt-4 space-y-2">
              <div className="flex justify-between items-baseline font-bold text-xs text-[#1c1813]">
                <span className="uppercase">{idx + 1}. {r.merchant}</span>
                <span>${r.total.toFixed(2)}</span>
              </div>

              <div className="text-[10px] text-[#73634e] flex justify-between">
                <span>{r.date} {r.time}</span>
                <span>{r.location.city}</span>
              </div>

              {/* Items */}
              <div className="text-[11px] text-[#3d3326] space-y-0.5 pl-2 border-l border-[#e0d6c4]">
                {r.items.map((it) => (
                  <div key={it.id} className="flex justify-between">
                    <span>{it.quantity > 1 ? `${it.quantity}x ` : ''}{it.name}</span>
                    <span>${(it.price * it.quantity).toFixed(2)}</span>
                  </div>
                ))}
              </div>

              {/* Handwritten Note on receipt tape */}
              <div className="text-[11px] font-serif italic text-[#633a10] bg-[#fefce8] p-1.5 rounded-xs border border-[#ecdba1]">
                “{r.memoryNote}”
              </div>
            </div>
          ))}

          {/* Tape Summary & Total Life Burn */}
          <div className="pt-6 text-center space-y-2">
            <div className="flex justify-between font-bold text-sm text-[#14100b] border-t-2 border-[#1c1813] pt-3">
              <span>GRAND TOTAL ACCUMULATED</span>
              <span>${totalSpent.toFixed(2)}</span>
            </div>

            <div className="text-[10px] text-[#786957]">
              ALL MEMORIES DIGITALLY SIGNED & ARCHIVED
            </div>

            {/* Continuous Barcode at End of Roll */}
            <div className="py-3">
              <div className="flex items-center justify-center space-x-[2px] h-8 overflow-hidden opacity-90">
                {[3, 1, 2, 4, 1, 3, 2, 1, 4, 2, 1, 3, 1, 2, 4, 1, 3, 2, 1, 2, 3, 4, 1, 2, 1, 3].map((w, i) => (
                  <span key={i} className="bg-[#1f1912] inline-block h-full" style={{ width: `${w}px` }} />
                ))}
              </div>
              <div className="text-[8px] tracking-widest text-[#82715d] mt-1">
                * END OF ROLL • LIVING BOOK ARCHIVE *
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
