import React, { useState } from 'react';
import { X, Printer, MapPin, Clock, Tag, ExternalLink, Edit3, Check, HeartHandshake } from 'lucide-react';
import { Receipt, CATEGORY_INFO, EMOTION_INFO } from '../types';
import { soundEffects } from '../utils/audio';

interface ReceiptModalProps {
  receipt: Receipt | null;
  allReceipts: Receipt[];
  onClose: () => void;
  onSelectReceipt: (r: Receipt) => void;
  onUpdateMemoryNote: (id: string, newNote: string) => void;
}

export const ReceiptModal: React.FC<ReceiptModalProps> = ({
  receipt,
  allReceipts,
  onClose,
  onSelectReceipt,
  onUpdateMemoryNote
}) => {
  if (!receipt) return null;

  const [isEditingNote, setIsEditingNote] = useState(false);
  const [noteText, setNoteText] = useState(receipt.memoryNote);

  const cat = CATEGORY_INFO[receipt.category] || CATEGORY_INFO.sustenance;
  const emo = EMOTION_INFO[receipt.emotion] || EMOTION_INFO.mundane;

  // Find connected receipts
  const connectedReceipts = allReceipts.filter(r => receipt.connectedReceiptIds?.includes(r.id));

  const handleSaveNote = () => {
    onUpdateMemoryNote(receipt.id, noteText);
    setIsEditingNote(false);
  };

  const handlePrint = () => {
    soundEffects.playReceiptTick();
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/60 backdrop-blur-xs overflow-y-auto">
      {/* Backdrop click to close */}
      <div className="fixed inset-0" onClick={onClose} />

      {/* Main Container */}
      <div className="relative w-full max-w-xl my-auto z-10">
        
        {/* Close Button Floating */}
        <button
          onClick={onClose}
          className="absolute -top-3 -right-3 z-20 w-8 h-8 rounded-full bg-[#2a241c] text-[#f4efe4] hover:bg-black flex items-center justify-center shadow-lg border border-[#6b5c4b] cursor-pointer transition-transform hover:scale-110"
          aria-label="Close"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Physical Thermal Paper Artifact */}
        <div className="relative bg-[#fffefb] text-[#1c1917] p-6 sm:p-8 rounded-sm shadow-2xl border-x border-[#e8e2d5] font-mono text-xs select-text">
          
          {/* Jagged paper top */}
          <div className="absolute top-0 left-0 right-0 h-2 bg-[radial-gradient(ellipse_at_top,transparent_60%,#fffefb_61%)] bg-[length:12px_8px]" />

          {/* Top Actions: Print & Category Pill */}
          <div className="flex items-center justify-between border-b border-dashed border-[#d1c7b7] pb-3 mb-4">
            <div className="flex items-center space-x-2">
              <span 
                className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-sans font-medium tracking-wide uppercase"
                style={{ backgroundColor: cat.bg, color: cat.color }}
              >
                {cat.label}
              </span>
              <span className="flex items-center space-x-1 text-[10px] text-[#786b59]">
                <span className="w-2 h-2 rounded-full inline-block" style={{ backgroundColor: emo.dotColor }} />
                <span className="font-sans capitalize">{emo.label}</span>
              </span>
            </div>

            <button
              onClick={handlePrint}
              className="flex items-center space-x-1 text-[11px] text-[#695c4b] hover:text-[#1c1917] transition-colors cursor-pointer"
              title="Print Thermal Copy"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print</span>
            </button>
          </div>

          {/* Merchant Header */}
          <div className="text-center mb-6">
            <div className="text-[10px] tracking-widest text-[#887865] uppercase mb-0.5">
              • DIGITAL MEMORY ARCHIVE •
            </div>
            <h2 className="text-lg sm:text-xl font-bold uppercase tracking-wider text-[#1a1714]">
              {receipt.merchant}
            </h2>
            {receipt.subtitle && (
              <p className="text-[11px] text-[#635544] mt-0.5">{receipt.subtitle}</p>
            )}
            <div className="flex items-center justify-center space-x-3 text-[10px] text-[#7d6f5c] mt-2">
              <span className="flex items-center">
                <MapPin className="w-3 h-3 mr-0.5" />
                {receipt.location.neighborhood ? `${receipt.location.neighborhood}, ${receipt.location.city}` : receipt.location.city}
              </span>
              <span>•</span>
              <span className="flex items-center">
                <Clock className="w-3 h-3 mr-0.5" />
                {receipt.date} {receipt.time}
              </span>
            </div>
          </div>

          {/* Itemized Table */}
          <div className="border-t border-b border-dashed border-[#b8ab96] py-3 my-4">
            <div className="flex justify-between text-[10px] uppercase font-bold text-[#8c7b66] mb-2 tracking-wider">
              <span>Item Description</span>
              <span className="text-right">Price</span>
            </div>

            <div className="space-y-2">
              {receipt.items.map((item) => (
                <div key={item.id} className="flex justify-between items-baseline text-xs text-[#2b251d]">
                  <div className="pr-4">
                    <span>{item.quantity > 1 ? `${item.quantity}x ` : ''}</span>
                    <span>{item.name}</span>
                  </div>
                  <span className="font-semibold whitespace-nowrap">
                    ${(item.price * item.quantity).toFixed(2)}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Subtotal, Tax, Total */}
          <div className="space-y-1 text-right mb-5 text-[11px] text-[#524536]">
            <div className="flex justify-between">
              <span>SUBTOTAL</span>
              <span>${(receipt.total * 0.92).toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>SALES TAX & SURCHARGE</span>
              <span>${(receipt.total * 0.08).toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-base font-bold text-[#14120f] border-t border-[#d8cdbd] pt-2 mt-2">
              <span>TOTAL</span>
              <span className="text-lg font-mono font-black">${receipt.total.toFixed(2)}</span>
            </div>
          </div>

          {/* Payment & Transaction metadata */}
          <div className="border-t border-dashed border-[#d8cdbd] pt-3 text-[10px] text-[#70614f] space-y-0.5 mb-5">
            <div className="flex justify-between">
              <span>PAYMENT METHOD</span>
              <span className="font-bold text-[#3d3326]">{receipt.paymentMethod}</span>
            </div>
            <div className="flex justify-between">
              <span>AUTH CODE</span>
              <span>OK-904812</span>
            </div>
            <div className="flex justify-between">
              <span>TRANS ID</span>
              <span>{receipt.id.toUpperCase()}</span>
            </div>
          </div>

          {/* Simulated Authentic Barcode */}
          <div className="my-5 text-center">
            <div className="inline-block py-1 px-3 bg-white border border-[#eae2d4]">
              {/* CSS simulated barcode lines */}
              <div className="flex items-center justify-center space-x-[2px] h-10 overflow-hidden">
                {[3, 1, 2, 4, 1, 2, 1, 3, 2, 1, 4, 1, 3, 2, 1, 2, 4, 1, 2, 3, 1, 3, 2, 4, 1, 2, 1, 3, 2, 4].map((w, idx) => (
                  <span 
                    key={idx} 
                    className="bg-[#2a241b] inline-block h-full" 
                    style={{ width: `${w}px` }} 
                  />
                ))}
              </div>
              <div className="text-[9px] tracking-widest text-[#736450] mt-1">
                * {receipt.id.replace('-', '')}849102 *
              </div>
            </div>
          </div>

          {/* Handwritten Sticky Note / Memory Marginalia */}
          <div className="relative mt-6 bg-[#fefce8] p-4 rounded-sm border border-[#e5d89d] shadow-sm transform -rotate-1">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] uppercase font-sans font-bold tracking-wider text-[#854d0e] flex items-center">
                <Edit3 className="w-3 h-3 mr-1" />
                Handwritten Note in Margin
              </span>
              {!isEditingNote ? (
                <button
                  onClick={() => setIsEditingNote(true)}
                  className="text-[10px] text-[#92400e] hover:underline cursor-pointer font-sans"
                >
                  Edit Note
                </button>
              ) : (
                <button
                  onClick={handleSaveNote}
                  className="flex items-center space-x-1 text-[10px] text-[#15803d] font-bold hover:underline cursor-pointer font-sans"
                >
                  <Check className="w-3 h-3" />
                  <span>Save</span>
                </button>
              )}
            </div>

            {isEditingNote ? (
              <textarea
                value={noteText}
                onChange={(e) => setNoteText(e.target.value)}
                rows={3}
                className="w-full text-xs font-serif italic text-[#422006] bg-transparent border border-[#d9ca85] rounded p-1.5 focus:outline-hidden focus:ring-1 focus:ring-[#ca8a04]"
              />
            ) : (
              <p className="text-xs font-serif italic text-[#422006] leading-relaxed">
                “{receipt.memoryNote}”
              </p>
            )}

            {receipt.marginalia && (
              <div className="mt-2 text-[10px] font-sans text-[#78350f] border-t border-[#ecdca2] pt-1">
                <span className="font-semibold">Archival note:</span> {receipt.marginalia}
              </div>
            )}
          </div>

          {/* Tags */}
          {receipt.tags && receipt.tags.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mt-4 pt-3 border-t border-[#f0e8dc]">
              {receipt.tags.map((t) => (
                <span key={t} className="inline-flex items-center text-[10px] font-sans bg-[#f3ede1] text-[#6b5c49] px-2 py-0.5 rounded-full">
                  <Tag className="w-2.5 h-2.5 mr-1 text-[#8f7d67]" />
                  {t}
                </span>
              ))}
            </div>
          )}

          {/* Connected Receipts Section */}
          {connectedReceipts.length > 0 && (
            <div className="mt-5 pt-4 border-t border-dashed border-[#cfc3b0]">
              <div className="flex items-center space-x-1 text-[10px] uppercase font-bold tracking-wider text-[#635544] mb-2 font-sans">
                <HeartHandshake className="w-3.5 h-3.5 text-[#b45309]" />
                <span>Invisible Threads (Connected Receipts)</span>
              </div>
              <div className="space-y-1.5">
                {connectedReceipts.map((cr) => (
                  <button
                    key={cr.id}
                    onClick={() => {
                      soundEffects.playReceiptTick();
                      onSelectReceipt(cr);
                    }}
                    className="w-full text-left p-2 rounded bg-[#f7f2e7] hover:bg-[#ede5d4] border border-[#ded5c3] transition-colors flex items-center justify-between group cursor-pointer"
                  >
                    <div>
                      <div className="text-[11px] font-bold text-[#2a241b] group-hover:text-[#a16207]">
                        {cr.merchant}
                      </div>
                      <div className="text-[10px] text-[#7d6f5c]">
                        {cr.date} • ${cr.total.toFixed(2)}
                      </div>
                    </div>
                    <ExternalLink className="w-3.5 h-3.5 text-[#9e8f7a] group-hover:text-[#2a241b]" />
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Jagged bottom */}
          <div className="absolute bottom-0 left-0 right-0 h-2 bg-[radial-gradient(ellipse_at_bottom,transparent_60%,#fffefb_61%)] bg-[length:12px_8px]" />
        </div>
      </div>
    </div>
  );
};
