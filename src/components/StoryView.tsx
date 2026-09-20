import React, { useState } from 'react';
import { 
  BookOpen, 
  Sparkles, 
  Printer, 
  ScrollText, 
  Bookmark, 
  Calendar, 
  Clock, 
  ArrowRight,
  ExternalLink,
  Feather,
  RefreshCw
} from 'lucide-react';
import { Chapter, Persona, Receipt } from '../types';
import { soundEffects } from '../utils/audio';

interface StoryViewProps {
  chapters: Chapter[];
  receipts: Receipt[];
  activePersona: Persona;
  onSelectReceipt: (r: Receipt) => void;
  onOpenThermalScroll: () => void;
  activeChapterId: string;
  onChangeChapter: (id: string) => void;
}

export const StoryView: React.FC<StoryViewProps> = ({
  chapters,
  receipts,
  activePersona,
  onSelectReceipt,
  onOpenThermalScroll,
  activeChapterId,
  onChangeChapter
}) => {
  const [selectedChapterId, setSelectedChapterId] = useState<string>(activeChapterId || chapters[0].id);
  const chapter = chapters.find(c => c.id === selectedChapterId) || chapters[0];

  // Memoir Reflection Synthesizer state
  const reflectionThemes = [
    {
      id: 'archaeology',
      title: 'The Archaeology of Ordinary Tuesdays',
      prompt: 'What our $4 coffees, train tokens, and grocery tabs reveal about our secret endurance.',
      text: `Looking across the accumulated ledger of ${activePersona.name}, the most moving entries are rarely the grand vacations. They are the Tuesday afternoon receipts—$4.50 for black drip coffee, $18.50 for groceries bought with weary hands at 8:00 PM, a train ticket bought because walking home in the downpour was more than the body could bear.\n\nEvery civilization leaves pottery shards; we leave thermal paper slips. In fifty years, someone finding these fragments will know that someone lived here, grew hungry, paid their small debts to society, and sat by the window watching the dusk arrive.`
    },
    {
      id: 'midnight',
      title: 'The Nocturnal Courage',
      prompt: 'Examining what happens when the clock passes 2:00 AM and fear gives way to decision.',
      text: `Between midnight and dawn, conventional logic sleeps. That is why the most pivotal receipts bear timestamps like 02:43 AM and 03:12 AM. The diner booth with cold eggs, the emergency flight confirmation, the 24-hour pharmacy lozenges.\n\nWe tell ourselves that major life pivots are planned in sterile daylight conferences. The receipts tell a different truth: courage usually strikes in the cold dark, wearing wool socks and staring at a blinking cursor.`
    },
    {
      id: 'sanctuary',
      title: 'The Anatomy of Recovery',
      prompt: 'How shopping carts shift from instant noodles to fresh sourdough and flower pots.',
      text: `When grief or burnout occupies a life, the transactions are purely defensive: aspirin, quick takeout, taxis taken to avoid seeing people. But then, almost imperceptibly, a shift occurs in the ledger.\n\nA bag of rye flour. A re-wired brass desk lamp. Two small packets of perennial seeds. Healing does not arrive with triumphant trumpets; it arrives when you buy something that requires you to believe you will still be around next spring.`
    }
  ];

  const [activeThemeId, setActiveThemeId] = useState<string>(reflectionThemes[0].id);
  const currentReflection = reflectionThemes.find(t => t.id === activeThemeId) || reflectionThemes[0];
  const [isSynthesizing, setIsSynthesizing] = useState(false);

  // Chapter receipts
  const chapterReceipts = receipts.filter(r => chapter.receiptIds.includes(r.id) || r.chapterId === chapter.id);

  const handleSynthesize = (themeId: string) => {
    soundEffects.playReceiptTick();
    setIsSynthesizing(true);
    setActiveThemeId(themeId);
    setTimeout(() => {
      setIsSynthesizing(false);
      soundEffects.playChime();
    }, 450);
  };

  return (
    <div className="py-6 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto space-y-8">
      
      {/* Chapter Navigation Stepper */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#e2d8c7] pb-4">
        <div>
          <div className="flex items-center space-x-2 text-xs font-mono uppercase tracking-wider text-[#85745e]">
            <span>PHASE 04: STORY</span>
            <span>•</span>
            <span>THE LIVING CHRONICLE</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-display font-bold text-[#241e17] mt-1">
            The Memoir in Receipts
          </h1>
        </div>

        <div className="flex items-center space-x-2">
          {/* Continuous Thermal Tape Button */}
          <button
            onClick={() => {
              soundEffects.playReceiptTick();
              onOpenThermalScroll();
            }}
            className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-md text-xs font-mono bg-[#ede5d6] hover:bg-[#e2d8c5] text-[#423526] border border-[#d6ccb8] transition-colors cursor-pointer"
          >
            <ScrollText className="w-3.5 h-3.5 text-[#7a6448]" />
            <span>Continuous Thermal Roll</span>
          </button>

          {/* Chapter Selector */}
          <div className="flex items-center space-x-1 bg-[#f0e8dc] p-1 rounded-md border border-[#dbcfbe]">
            {chapters.map((ch) => (
              <button
                key={ch.id}
                onClick={() => {
                  soundEffects.playPageFlip();
                  setSelectedChapterId(ch.id);
                  onChangeChapter(ch.id);
                }}
                className={`px-2.5 py-1 text-xs font-serif rounded transition-all cursor-pointer ${
                  selectedChapterId === ch.id
                    ? 'bg-[#2b241c] text-[#f7f2e6] font-bold shadow-xs'
                    : 'text-[#61513f] hover:text-black'
                }`}
              >
                Ch. {ch.numeral}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Chapter Reader Container (Emulating Beautiful Editorial Book Typography) */}
      <article className="bg-[#fcfbf7] p-6 sm:p-10 lg:p-14 rounded-xl border border-[#ded5c2] shadow-sm relative">
        
        {/* Archival Chapter Heading */}
        <div className="text-center max-w-2xl mx-auto mb-10 pb-8 border-b border-[#e8dfcf]">
          <div className="text-xs font-display font-bold uppercase tracking-widest text-[#8f7041] mb-2">
            CHAPTER {chapter.numeral}
          </div>
          <h2 className="text-3xl sm:text-4xl font-display font-bold text-[#1f1913] leading-tight">
            {chapter.title}
          </h2>
          <p className="font-serif italic text-base text-[#6e5d4a] mt-2">
            {chapter.subtitle}
          </p>
          <div className="flex items-center justify-center space-x-2 text-xs font-mono text-[#8a7a67] mt-4">
            <Calendar className="w-3.5 h-3.5" />
            <span>{chapter.timeframe}</span>
            <span>•</span>
            <span>Archive of {activePersona.name}</span>
          </div>
        </div>

        {/* Narrative Prose with Interleaved Receipts */}
        <div className="prose prose-stone max-w-none space-y-6 font-serif text-base sm:text-lg text-[#2e261d] leading-relaxed">
          
          {/* Paragraph 1 with Drop Cap */}
          <p className="first-letter:text-5xl first-letter:font-display first-letter:font-bold first-letter:float-left first-letter:mr-3 first-letter:text-[#8f7041] first-letter:leading-none">
            {chapter.narrativeText[0]}
          </p>

          {/* Interleaved Receipt Callout Card */}
          {chapterReceipts[0] && (
            <div className="my-8 not-prose">
              <div 
                onClick={() => {
                  soundEffects.playReceiptTick();
                  onSelectReceipt(chapterReceipts[0]);
                }}
                className="bg-[#fffefb] p-4 sm:p-5 rounded-sm border border-[#e0d6c5] shadow-sm hover:shadow-md transition-all cursor-pointer max-w-lg mx-auto transform -rotate-1 hover:rotate-0"
              >
                <div className="flex items-center justify-between text-xs font-mono text-[#786a57] border-b border-dashed border-[#e6dccf] pb-2 mb-2">
                  <span className="font-bold text-[#1f1913] uppercase">{chapterReceipts[0].merchant}</span>
                  <span>${chapterReceipts[0].total.toFixed(2)}</span>
                </div>
                <div className="text-xs font-mono text-[#4a3e31] space-y-0.5">
                  {chapterReceipts[0].items.map(it => (
                    <div key={it.id} className="flex justify-between">
                      <span>{it.name}</span>
                      <span>${it.price.toFixed(2)}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-3 bg-[#fefce8] p-2 rounded text-xs font-serif italic text-[#573510] border border-[#ecdba2]">
                  Marginal note: “{chapterReceipts[0].memoryNote}”
                </div>
                <div className="mt-2 text-[10px] font-mono text-[#8f7e68] text-right">
                  Click to inspect authentic thermal slip →
                </div>
              </div>
            </div>
          )}

          {/* Paragraph 2 */}
          {chapter.narrativeText[1] && (
            <p>{chapter.narrativeText[1]}</p>
          )}

          {/* Pull Quote */}
          <blockquote className="my-8 border-l-4 border-[#8f7041] pl-5 py-2 font-serif italic text-lg sm:text-xl text-[#423425] bg-[#f8f4ec] rounded-r-md">
            “{chapter.pullQuote}”
          </blockquote>

          {/* Paragraph 3 */}
          {chapter.narrativeText[2] && (
            <p>{chapter.narrativeText[2]}</p>
          )}

          {/* Gallery of Affixed Receipts for this chapter */}
          <div className="my-10 not-prose pt-6 border-t border-[#e8dfcf]">
            <h3 className="font-mono text-xs uppercase tracking-wider text-[#7a6b57] font-bold mb-4 flex items-center">
              <Bookmark className="w-4 h-4 mr-1.5 text-[#8f7041]" />
              Archival Receipts Affixed to This Chapter
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {chapterReceipts.map((r) => (
                <div
                  key={r.id}
                  onClick={() => {
                    soundEffects.playReceiptTick();
                    onSelectReceipt(r);
                  }}
                  className="bg-[#fffefb] p-3.5 rounded border border-[#ded5c2] shadow-xs hover:shadow-md transition-all cursor-pointer text-xs"
                >
                  <div className="flex justify-between font-mono font-bold text-[#1f1913] uppercase mb-1">
                    <span className="truncate pr-2">{r.merchant}</span>
                    <span>${r.total.toFixed(2)}</span>
                  </div>
                  <div className="text-[10px] font-mono text-[#7a6b58] mb-2">
                    {r.date} • {r.time}
                  </div>
                  <div className="font-serif italic text-[11px] text-[#4d361b] bg-[#fefce8] p-1.5 rounded border border-[#ebdb9b] line-clamp-2">
                    “{r.memoryNote}”
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </article>

      {/* MEMOIR REFLECTION SYNTHESIZER */}
      <div className="bg-[#f7f2e7] p-6 sm:p-8 rounded-xl border border-[#ded4c0] shadow-xs space-y-4">
        <div className="flex items-center space-x-2 text-xs font-mono text-[#78644e] uppercase tracking-wider">
          <Feather className="w-4 h-4 text-[#8f7041]" />
          <span>Interactive Synthesis • The Human Reflection</span>
        </div>
        <h3 className="text-xl font-display font-bold text-[#241e17]">
          Synthesize Archive Reflections
        </h3>
        <p className="text-xs sm:text-sm font-serif italic text-[#635340]">
          Select an interpretative lens to synthesize the emotional subtext beneath this lifetime of transacted receipts:
        </p>

        {/* Theme Buttons */}
        <div className="flex flex-wrap gap-2 pt-2">
          {reflectionThemes.map((theme) => (
            <button
              key={theme.id}
              onClick={() => handleSynthesize(theme.id)}
              className={`px-3 py-2 rounded-md text-xs font-sans text-left transition-all cursor-pointer border ${
                activeThemeId === theme.id
                  ? 'bg-[#2b241c] text-[#f8f5ee] border-[#18130e] font-semibold shadow-xs'
                  : 'bg-white text-[#473b2d] border-[#d8cdba] hover:bg-[#ede5d4]'
              }`}
            >
              {theme.title}
            </button>
          ))}
        </div>

        {/* Synthesized Reflection Output Box */}
        <div className="relative mt-4 bg-[#fffefc] p-6 rounded-lg border border-[#ded5c2] shadow-inner font-serif text-sm sm:text-base text-[#30271e] leading-relaxed">
          {isSynthesizing ? (
            <div className="py-8 text-center space-y-2 text-[#7d6f5c]">
              <RefreshCw className="w-5 h-5 animate-spin mx-auto text-[#8f7041]" />
              <div className="text-xs font-mono uppercase tracking-wider">
                Reading receipts & synthesizing memoir...
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="text-xs font-mono uppercase tracking-widest text-[#8f7041] font-bold">
                {currentReflection.title}
              </div>
              {currentReflection.text.split('\n\n').map((paragraph, idx) => (
                <p key={idx}>{paragraph}</p>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
