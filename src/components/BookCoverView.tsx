import React, { useState } from 'react';
import { 
  ChevronLeft, 
  ChevronRight, 
  Bookmark, 
  ArrowRight, 
  Sparkles, 
  Clock, 
  Calendar,
  ExternalLink,
  BookOpen
} from 'lucide-react';
import { Chapter, Persona, Receipt, ViewScreen } from '../types';
import { soundEffects } from '../utils/audio';

interface BookCoverViewProps {
  chapters: Chapter[];
  allReceipts: Receipt[];
  activePersona: Persona;
  onSelectReceipt: (r: Receipt) => void;
  onNavigateScreen: (screen: ViewScreen) => void;
  activeChapterId: string;
  onChangeChapter: (id: string) => void;
}

export const BookCoverView: React.FC<BookCoverViewProps> = ({
  chapters,
  allReceipts,
  activePersona,
  onSelectReceipt,
  onNavigateScreen,
  activeChapterId,
  onChangeChapter
}) => {
  const currentChapterIndex = Math.max(0, chapters.findIndex(c => c.id === activeChapterId));
  const chapter = chapters[currentChapterIndex] || chapters[0];

  // Receipts affixed to this chapter
  const chapterReceipts = allReceipts.filter(r => chapter.receiptIds.includes(r.id) || r.chapterId === chapter.id);

  const handlePrev = () => {
    if (currentChapterIndex > 0) {
      soundEffects.playPageFlip();
      onChangeChapter(chapters[currentChapterIndex - 1].id);
    }
  };

  const handleNext = () => {
    if (currentChapterIndex < chapters.length - 1) {
      soundEffects.playPageFlip();
      onChangeChapter(chapters[currentChapterIndex + 1].id);
    }
  };

  return (
    <div className="min-h-[calc(100vh-120px)] flex flex-col justify-between py-6 px-3 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      
      {/* Top Archival Ribbon & Chapter Stepper */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-6 bg-[#f5efe4] border border-[#ded5c2] px-4 py-2.5 rounded-lg shadow-xs">
        <div className="flex items-center space-x-2">
          <Bookmark className="w-4 h-4 text-[#8f7041]" />
          <span className="font-mono text-xs text-[#524434] uppercase tracking-wider font-semibold">
            {activePersona.name}’s Archive:
          </span>
          <span className="font-serif italic text-xs text-[#786650]">
            “{chapter.title}” ({chapter.timeframe})
          </span>
        </div>

        {/* Chapter Switcher Tabs */}
        <div className="flex items-center space-x-1">
          {chapters.map((ch, idx) => (
            <button
              key={ch.id}
              onClick={() => {
                soundEffects.playPageFlip();
                onChangeChapter(ch.id);
              }}
              className={`px-3 py-1 text-xs rounded font-serif transition-all cursor-pointer ${
                ch.id === chapter.id
                  ? 'bg-[#2b251f] text-[#f7f2e6] font-bold shadow-xs'
                  : 'text-[#61513f] hover:bg-[#eae2cf] hover:text-[#211c16]'
              }`}
            >
              Ch. {ch.numeral}
            </button>
          ))}
        </div>
      </div>

      {/* Physical Living Book Container */}
      <div className="relative bg-[#26211c] text-[#ece5d8] rounded-xl p-3 sm:p-6 lg:p-8 shadow-2xl border-4 border-[#3f352b]">
        
        {/* Book Spine Texture Gradient Effect */}
        <div className="absolute inset-y-0 left-1/2 -translate-x-1/2 w-12 hidden lg:block pointer-events-none book-gutter z-20" />

        {/* Outer Ribbon Bookmark dangling at top */}
        <div className="absolute -top-3 left-16 z-30 w-7 h-14 bg-[#991b1b] shadow-md rounded-b-sm border-x border-[#7f1d1d] flex items-end justify-center pb-1">
          <div className="w-0 h-0 border-l-[14px] border-l-transparent border-r-[14px] border-r-transparent border-b-[8px] border-b-[#26211c]" />
        </div>

        {/* Book Open Spread */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-12 min-h-[560px] bg-[#fbf9f4] text-[#241e17] rounded-lg p-5 sm:p-8 shadow-inner border border-[#ded5c2] relative overflow-hidden">
          
          {/* Subtle page background grid/lines */}
          <div className="absolute inset-0 opacity-4 pointer-events-none bg-[radial-gradient(#6b5940_1px,transparent_1px)] [background-size:16px_16px]" />

          {/* LEFT SPREAD: Literary Chapter Narrative & Context */}
          <div className="flex flex-col justify-between z-10 lg:pr-6 lg:border-r lg:border-[#e7dece]">
            <div>
              {/* Chapter Meta */}
              <div className="flex items-center justify-between border-b border-[#e2d8c5] pb-3 mb-5">
                <div className="flex items-center space-x-2">
                  <span className="font-display text-xs tracking-widest uppercase font-bold text-[#8a6b3b]">
                    CHAPTER {chapter.numeral}
                  </span>
                  <span className="text-[#a1927c]">•</span>
                  <span className="font-mono text-[11px] text-[#695a47] flex items-center">
                    <Calendar className="w-3 h-3 mr-1" />
                    {chapter.timeframe}
                  </span>
                </div>
                <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-mono uppercase bg-[#f0e9dc] text-[#5e4e3c] border border-[#ddcfbe]">
                  {chapterReceipts.length} Fragment Receipts
                </span>
              </div>

              {/* Title & Subtitle */}
              <h1 className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold text-[#1e1913] leading-tight mb-2 tracking-tight">
                {chapter.title}
              </h1>
              <p className="font-serif italic text-sm sm:text-base text-[#6b5842] mb-6">
                {chapter.subtitle}
              </p>

              {/* Polaroid with Washi Tape */}
              <div className="relative my-4 inline-block transform -rotate-1 hover:rotate-0 transition-transform">
                <div className="bg-white p-2.5 pb-6 shadow-md border border-[#dfd6c4] rounded-xs max-w-[280px]">
                  <img 
                    src={chapter.coverImage} 
                    alt={chapter.title} 
                    className="w-full h-44 object-cover filter contrast-105"
                  />
                  <div className="mt-2 text-center font-serif italic text-[11px] text-[#5e4d3a]">
                    Fragment: {chapter.theme}
                  </div>
                </div>
                {/* Simulated washi tape on top of photo */}
                <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-20 h-5 bg-[#e4d5be]/80 border-t border-b border-[#cfbfa4] rotate-2 shadow-xs" />
              </div>

              {/* Excerpt narrative text */}
              <div className="mt-4 space-y-3 font-serif text-xs sm:text-sm text-[#3b3227] leading-relaxed">
                <p className="first-letter:text-3xl first-letter:font-display first-letter:font-bold first-letter:float-left first-letter:mr-2 first-letter:text-[#8a6b3b]">
                  {chapter.narrativeText[0]}
                </p>
                {chapter.narrativeText[1] && (
                  <p className="hidden sm:block text-[#473d31]">
                    {chapter.narrativeText[1]}
                  </p>
                )}
              </div>
            </div>

            {/* Pull Quote Box */}
            <div className="mt-6 pt-4 border-t border-[#e8dfcf] bg-[#f8f3ea] p-3.5 rounded-sm border-l-2 border-l-[#8a6b3b]">
              <p className="font-serif italic text-xs text-[#4b3f31]">
                “{chapter.pullQuote}”
              </p>
            </div>
          </div>

          {/* RIGHT SPREAD: Affixed Thermal Receipts & Marginalia */}
          <div className="flex flex-col justify-between z-10 lg:pl-6">
            <div>
              <div className="flex items-center justify-between border-b border-[#e2d8c5] pb-3 mb-4">
                <div className="font-mono text-xs uppercase tracking-wider text-[#6b5a47] font-semibold flex items-center">
                  <Sparkles className="w-3.5 h-3.5 mr-1.5 text-[#a16207]" />
                  Affixed Receipts & Marginalia
                </div>
                <button
                  onClick={() => onNavigateScreen('raw-data')}
                  className="text-xs font-sans text-[#7a5d34] hover:text-[#261e15] font-medium flex items-center cursor-pointer"
                >
                  <span>Open Full Ledger</span>
                  <ArrowRight className="w-3 h-3 ml-1" />
                </button>
              </div>

              {/* Thermal Receipts Displayed On The Page */}
              <div className="space-y-4 max-h-[460px] overflow-y-auto pr-1">
                {chapterReceipts.map((r, idx) => (
                  <div
                    key={r.id}
                    onClick={() => {
                      soundEffects.playReceiptTick();
                      onSelectReceipt(r);
                    }}
                    className="relative group bg-[#fffefb] p-3.5 sm:p-4 rounded-sm shadow-sm hover:shadow-md border border-[#ded5c2] cursor-pointer transition-all hover:-translate-y-0.5"
                    style={{ transform: `rotate(${idx % 2 === 0 ? '-0.5deg' : '0.5deg'})` }}
                  >
                    {/* Simulated paper clip or tape at top right */}
                    <div className="absolute -top-2 right-4 w-6 h-4 bg-[#d8ccb8]/90 border border-[#b8ab96] shadow-2xs rotate-6" />

                    <div className="flex items-start justify-between">
                      <div>
                        <div className="flex items-center space-x-2">
                          <span className="font-mono text-xs font-bold uppercase text-[#1c1813] group-hover:text-[#92400e] transition-colors">
                            {r.merchant}
                          </span>
                        </div>
                        <div className="flex items-center space-x-2 text-[10px] text-[#73634e] mt-0.5 font-mono">
                          <span>{r.date}</span>
                          <span>•</span>
                          <span className="flex items-center">
                            <Clock className="w-2.5 h-2.5 mr-0.5" />
                            {r.time}
                          </span>
                        </div>
                      </div>
                      
                      <div className="text-right">
                        <span className="font-mono text-sm font-bold text-[#1c1813]">
                          ${r.total.toFixed(2)}
                        </span>
                        <div className="text-[10px] text-[#82715d] font-sans capitalize">
                          {r.emotion}
                        </div>
                      </div>
                    </div>

                    {/* Items quick preview */}
                    <div className="mt-2 text-[11px] font-mono text-[#4a3e31] truncate border-t border-dashed border-[#e8dfd0] pt-1.5">
                      {r.items.map(i => `${i.quantity > 1 ? i.quantity + 'x ' : ''}${i.name}`).join(' • ')}
                    </div>

                    {/* Handwritten sticky margin note */}
                    <div className="mt-2 text-xs font-serif italic text-[#633a10] bg-[#fefce8] p-2 rounded-xs border border-[#ecdba1]">
                      “{r.memoryNote}”
                    </div>

                    <div className="mt-2 flex items-center justify-between text-[10px] text-[#8a7a67]">
                      <span>{r.location.neighborhood ? `${r.location.neighborhood}, ${r.location.city}` : r.location.city}</span>
                      <span className="flex items-center group-hover:text-[#211a13] font-medium">
                        Inspect slip <ExternalLink className="w-2.5 h-2.5 ml-1" />
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Bottom Actions inside book */}
            <div className="mt-6 pt-4 border-t border-[#e8dfcf] flex items-center justify-between">
              <button
                onClick={() => onNavigateScreen('story')}
                className="inline-flex items-center space-x-1.5 px-4 py-2 rounded-md bg-[#332a21] hover:bg-black text-[#f7f2e6] text-xs font-semibold shadow-xs cursor-pointer transition-all"
              >
                <BookOpen className="w-3.5 h-3.5 text-[#dfcfae]" />
                <span>Read Full Chapter Chronicle</span>
              </button>

              <button
                onClick={() => onNavigateScreen('insights')}
                className="text-xs font-sans text-[#6e5a43] hover:text-black font-medium cursor-pointer"
              >
                View Chapter Insights →
              </button>
            </div>
          </div>
        </div>

        {/* Page Turn Pagination Navigation at Bottom */}
        <div className="flex items-center justify-between mt-4 px-2 text-xs font-mono text-[#beb29f]">
          <button
            onClick={handlePrev}
            disabled={currentChapterIndex === 0}
            className="flex items-center space-x-1.5 px-3 py-1.5 rounded bg-[#332a21] hover:bg-[#473b2f] disabled:opacity-30 disabled:hover:bg-[#332a21] transition-colors cursor-pointer"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Turn to Prev Chapter</span>
          </button>

          <div className="text-center">
            <span className="font-serif italic text-sm text-[#e4dac9]">
              Chapter {chapter.numeral} of {chapters.length}
            </span>
          </div>

          <button
            onClick={handleNext}
            disabled={currentChapterIndex === chapters.length - 1}
            className="flex items-center space-x-1.5 px-3 py-1.5 rounded bg-[#332a21] hover:bg-[#473b2f] disabled:opacity-30 disabled:hover:bg-[#332a21] transition-colors cursor-pointer"
          >
            <span>Turn to Next Chapter</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Narrative Footer Banner */}
      <div className="mt-6 text-center text-xs text-[#7d6f5c] font-serif italic">
        “A receipt is not merely financial proof. It is a time capsule of hunger, intention, panic, and quiet recovery.”
      </div>
    </div>
  );
};
