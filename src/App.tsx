import React, { useState } from 'react';
import { 
  PERSONAS, 
  INITIAL_CHAPTERS, 
  INITIAL_RECEIPTS 
} from './data/mockLifeData';
import { Chapter, Persona, Receipt, ViewScreen } from './types';
import { Header } from './components/Header';
import { BookCoverView } from './components/BookCoverView';
import { RawDataView } from './components/RawDataView';
import { InsightsView } from './components/InsightsView';
import { ConnectionsView } from './components/ConnectionsView';
import { StoryView } from './components/StoryView';
import { ReceiptModal } from './components/ReceiptModal';
import { AddReceiptModal } from './components/AddReceiptModal';
import { ThermalScrollModal } from './components/ThermalScrollModal';
import { soundEffects } from './utils/audio';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<ViewScreen>('book');
  const [personas] = useState<Persona[]>(PERSONAS);
  const [activePersona, setActivePersona] = useState<Persona>(PERSONAS[0]);
  const [chapters, setChapters] = useState<Chapter[]>(INITIAL_CHAPTERS);
  const [activeChapterId, setActiveChapterId] = useState<string>(INITIAL_CHAPTERS[0].id);
  const [receipts, setReceipts] = useState<Receipt[]>(INITIAL_RECEIPTS);
  
  // Modals state
  const [inspectingReceipt, setInspectingReceipt] = useState<Receipt | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isThermalScrollOpen, setIsThermalScrollOpen] = useState(false);
  const [isMuted, setIsMuted] = useState(soundEffects.isMuted);

  const handleToggleMute = () => {
    const muted = soundEffects.toggleMute();
    setIsMuted(muted);
  };

  const handleSelectPersona = (p: Persona) => {
    setActivePersona(p);
    setActiveChapterId(p.defaultChapterId);
  };

  const handleUpdateMemoryNote = (id: string, newNote: string) => {
    setReceipts(prev => prev.map(r => r.id === id ? { ...r, memoryNote: newNote } : r));
    if (inspectingReceipt && inspectingReceipt.id === id) {
      setInspectingReceipt(prev => prev ? { ...prev, memoryNote: newNote } : null);
    }
  };

  const handleAddReceipt = (newReceipt: Receipt) => {
    setReceipts(prev => [newReceipt, ...prev]);
    // Also attach to active chapter
    setChapters(prev => prev.map(ch => {
      if (ch.id === activeChapterId) {
        return {
          ...ch,
          receiptIds: [newReceipt.id, ...ch.receiptIds],
          receiptsCount: (ch.receiptsCount || 0) + 1
        };
      }
      return ch;
    }));
    // Open the new receipt to admire it
    setInspectingReceipt(newReceipt);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#f7f4ec] text-[#241e17] font-sans antialiased selection:bg-[#dfcfae] selection:text-[#1c1813]">
      
      {/* Universal Navigation Header */}
      <Header
        currentScreen={currentScreen}
        onSelectScreen={setCurrentScreen}
        activePersona={activePersona}
        allPersonas={personas}
        onSelectPersona={handleSelectPersona}
        onOpenAddModal={() => setIsAddModalOpen(true)}
        onOpenThermalScroll={() => setIsThermalScrollOpen(true)}
        isMuted={isMuted}
        onToggleMute={handleToggleMute}
        receiptsCount={receipts.length}
      />

      {/* Main Dynamic View Screen */}
      <main className="flex-1">
        {currentScreen === 'book' && (
          <BookCoverView
            chapters={chapters}
            allReceipts={receipts}
            activePersona={activePersona}
            onSelectReceipt={setInspectingReceipt}
            onNavigateScreen={setCurrentScreen}
            activeChapterId={activeChapterId}
            onChangeChapter={setActiveChapterId}
          />
        )}

        {currentScreen === 'raw-data' && (
          <RawDataView
            receipts={receipts}
            onSelectReceipt={setInspectingReceipt}
            onOpenAddModal={() => setIsAddModalOpen(true)}
          />
        )}

        {currentScreen === 'insights' && (
          <InsightsView
            receipts={receipts}
            onSelectReceipt={setInspectingReceipt}
          />
        )}

        {currentScreen === 'connections' && (
          <ConnectionsView
            receipts={receipts}
            onSelectReceipt={setInspectingReceipt}
          />
        )}

        {currentScreen === 'story' && (
          <StoryView
            chapters={chapters}
            receipts={receipts}
            activePersona={activePersona}
            onSelectReceipt={setInspectingReceipt}
            onOpenThermalScroll={() => setIsThermalScrollOpen(true)}
            activeChapterId={activeChapterId}
            onChangeChapter={setActiveChapterId}
          />
        )}
      </main>

      {/* Global Modals */}
      <ReceiptModal
        receipt={inspectingReceipt}
        allReceipts={receipts}
        onClose={() => setInspectingReceipt(null)}
        onSelectReceipt={setInspectingReceipt}
        onUpdateMemoryNote={handleUpdateMemoryNote}
      />

      <AddReceiptModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAddReceipt={handleAddReceipt}
        activeChapterId={activeChapterId}
      />

      <ThermalScrollModal
        isOpen={isThermalScrollOpen}
        onClose={() => setIsThermalScrollOpen(false)}
        receipts={receipts}
        persona={activePersona}
      />

      {/* Tactile Archival Footer */}
      <footer className="bg-[#ede5d6] border-t border-[#ded5c2] py-6 px-4 sm:px-6 lg:px-8 text-xs font-serif text-[#695945]">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center space-x-2">
            <span className="font-display font-bold text-[#2a2219]">THE LIVING BOOK</span>
            <span>•</span>
            <span className="italic">“Your Life, In Receipts” Archive Edition</span>
          </div>
          <div className="flex items-center space-x-4 font-mono text-[11px] text-[#786650]">
            <span>RAW DATA</span>
            <span>→</span>
            <span>INSIGHTS</span>
            <span>→</span>
            <span>CONNECTIONS</span>
            <span>→</span>
            <span>STORY</span>
          </div>
          <div className="text-[11px] text-[#85745e]">
            Interactive Human Memory Project
          </div>
        </div>
      </footer>
    </div>
  );
}
