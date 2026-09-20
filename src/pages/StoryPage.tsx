import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'motion/react';
import {
  RotateCcw,
  Sparkles,
  Compass,
  ArrowRight,
  Bookmark,
  Share2,
  Calendar,
  Layers,
  Heart,
} from 'lucide-react';
import { ARCHIVE_ARTIFACTS, MOMENTS_CATALOG } from '../data/artifacts';
import { PageTransition } from '../components/PageTransition';
import { useArchive } from '../context/ArchiveContext';

export const StoryPage: React.FC = () => {
  const navigate = useNavigate();
  const { visitedCategories, visitedArtifacts, resetArchiveState } = useArchive();

  const activeMoment = MOMENTS_CATALOG[0];
  const primaryTraces = activeMoment.traceIds
    .map((id) => ARCHIVE_ARTIFACTS.find((a) => a.id === id))
    .filter(Boolean);

  const handleStartAgain = () => {
    resetArchiveState();
    navigate('/');
  };

  return (
    <PageTransition variant="fade">
      <div className="min-h-screen bg-[#08090c] text-white pt-24 pb-28 px-4 sm:px-8">
        {/* Soft background glow */}
        <div
          className="fixed inset-0 pointer-events-none opacity-20 z-0"
          style={{
            background:
              'radial-gradient(ellipse at 50% 15%, #d4af37 0%, #08090c 60%)',
          }}
        />

        <div className="relative z-10 max-w-4xl mx-auto space-y-12">
          {/* Top Breadcrumb */}
          <div className="flex items-center justify-between border-b border-white/10 pb-6">
            <Link
              to="/connections"
              className="flex items-center gap-2 text-xs font-mono text-[#a0a4b5] hover:text-white transition-colors"
            >
              <span>← Back to Relational Web</span>
            </Link>
            <div className="flex items-center gap-2 text-xs font-mono text-[#d4af37]">
              <Bookmark className="w-3.5 h-3.5" />
              <span>THE LIVING BOOK // FINAL CHAPTER</span>
            </div>
          </div>

          {/* Hero Story Banner */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center space-y-4"
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/[0.04] border border-[#d4af37]/40 text-xs font-mono tracking-widest text-[#d4af37]">
              <Sparkles className="w-3.5 h-3.5" />
              <span>THE COMPLETE ARC // YOUR LIFE, IN RECEIPTS</span>
            </div>

            <h1 className="text-4xl sm:text-6xl font-editorial tracking-tight text-[#f5f2eb]">
              Fragments Form an Architecture
            </h1>

            <p className="text-base sm:text-xl text-[#a3a6b2] italic font-light max-w-2xl mx-auto leading-relaxed">
              “We often remember our lives as continuous storylines. But when inspected closely, they are constructed from small, physical anchors.”
            </p>
          </motion.div>

          {/* User Session Memory Stats Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="p-6 sm:p-8 rounded-2xl bg-[#11131a]/90 border border-white/10 shadow-2xl space-y-4"
          >
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div className="space-y-1">
                <h3 className="text-lg font-editorial text-white">
                  Your Exploration Audit
                </h3>
                <p className="text-xs text-[#8b8f9e]">
                  Data points activated during this reading session.
                </p>
              </div>
              <div className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-[#d4af37]">
                Session Verified
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center font-mono">
              <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5">
                <div className="text-2xl font-bold text-[#d4af37]">
                  {visitedCategories.length || 9}
                </div>
                <div className="text-[11px] text-[#717688] uppercase mt-1">
                  Planets Visited
                </div>
              </div>
              <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5">
                <div className="text-2xl font-bold text-[#38bdf8]">
                  {visitedArtifacts.length || 4}
                </div>
                <div className="text-[11px] text-[#717688] uppercase mt-1">
                  Traces Inspected
                </div>
              </div>
              <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5">
                <div className="text-2xl font-bold text-[#14b8a6]">
                  {ARCHIVE_ARTIFACTS.length}
                </div>
                <div className="text-[11px] text-[#717688] uppercase mt-1">
                  Catalog Total
                </div>
              </div>
              <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5">
                <div className="text-2xl font-bold text-[#d946ef]">100%</div>
                <div className="text-[11px] text-[#717688] uppercase mt-1">
                  Physical Fidelity
                </div>
              </div>
            </div>
          </motion.div>

          {/* The Narrative Vignette of Moment 024 */}
          <div className="space-y-6">
            <h2 className="text-2xl font-editorial text-[#f5f2eb] border-b border-white/10 pb-3 flex items-center justify-between">
              <span>The Synthesis: Nocturnal Odyssey</span>
              <span className="text-xs font-mono text-[#d4af37] font-normal">
                October 14 • 4 Interlocking Traces
              </span>
            </h2>

            <div className="prose prose-invert max-w-none text-sm sm:text-base text-[#a0a4b5] leading-relaxed font-light space-y-4">
              <p>
                At 22:15, a vinyl record spun softly in a quiet living room—Brian Eno&apos;s ambient frequencies filling the dim room. An hour later, an automated boarding pass confirmation chimed for flight NH109 into Tokyo Haneda, launching a voyage across the international date line.
              </p>
              <p>
                Before dawn broke at 02:45 AM, an unassuming card swipe of $25.31 paid for black coffee and pastries at Caffè Nero near the international departure gate. And by noon, VIP pass 04 had admitted you to the gallery exhibition halls.
              </p>
              <p className="italic text-[#f5f2eb]">
                Taken alone, a receipt is disposable paper; a boarding pass is thrown in a bin; a song plays once and ends. But bound together inside The Living Book, they form an indelible portrait of who you were on that autumn night.
              </p>
            </div>

            {/* Visual Node Mosaic */}
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 pt-4">
              {primaryTraces.map((trace) => {
                if (!trace) return null;
                return (
                  <div
                    key={trace.id}
                    onClick={() => navigate('/moment/moment-024')}
                    className="p-4 rounded-xl bg-white/[0.03] hover:bg-white/[0.06] border border-white/10 hover:border-[#d4af37]/40 transition-all cursor-pointer space-y-2 group"
                  >
                    <div className="flex items-center justify-between text-xs font-mono">
                      <span style={{ color: trace.accentColor }} className="font-semibold">
                        {trace.category}
                      </span>
                      <span className="text-[#6c7082] text-[10px]">{trace.timestamp}</span>
                    </div>
                    <div className="font-semibold text-sm text-white group-hover:text-[#d4af37] transition-colors truncate">
                      {trace.title}
                    </div>
                    <div className="text-xs text-[#8b8f9e] line-clamp-2">
                      {trace.subtitle}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Reflection Quote & Closing Call to Action */}
          <div className="pt-12 border-t border-white/10 text-center space-y-6">
            <div className="max-w-lg mx-auto space-y-2">
              <Heart className="w-5 h-5 mx-auto text-[#d4af37]" />
              <h3 className="text-xl font-editorial text-white">
                The Archive Remains Open
              </h3>
              <p className="text-xs sm:text-sm text-[#8b8f9e] font-light">
                Return to the 3D celestial canvas at any time to explore alternative planetary orbits, inspect individual artifacts, or examine new connections.
              </p>
            </div>

            {/* Bottom Actions */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                id="story-explore-again-btn"
                onClick={() => navigate('/explore')}
                className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-[#d4af37] hover:bg-[#e4be42] text-black font-mono text-xs sm:text-sm font-bold tracking-wider uppercase transition-all duration-300 shadow-xl shadow-[#d4af37]/20 active:scale-95"
              >
                <Compass className="w-4 h-4 text-black" />
                <span>RETURN TO 3D UNIVERSE</span>
              </button>

              <button
                id="story-reset-journey-btn"
                onClick={handleStartAgain}
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-white/5 hover:bg-white/10 text-[#d4d6e0] border border-white/15 hover:border-white/30 font-mono text-xs tracking-wider transition-all duration-300 active:scale-95"
              >
                <RotateCcw className="w-3.5 h-3.5 text-[#d4af37]" />
                <span>START JOURNEY OVER</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </PageTransition>
  );
};
