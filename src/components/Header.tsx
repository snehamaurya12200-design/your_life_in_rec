import React from 'react';
import { 
  BookOpen, 
  Receipt as ReceiptIcon, 
  LineChart, 
  Share2, 
  Sparkles, 
  Volume2, 
  VolumeX, 
  PlusCircle, 
  ScrollText,
  User
} from 'lucide-react';
import { Persona, ViewScreen } from '../types';
import { soundEffects } from '../utils/audio';

interface HeaderProps {
  currentScreen: ViewScreen;
  onSelectScreen: (screen: ViewScreen) => void;
  activePersona: Persona;
  allPersonas: Persona[];
  onSelectPersona: (persona: Persona) => void;
  onOpenAddModal: () => void;
  onOpenThermalScroll: () => void;
  isMuted: boolean;
  onToggleMute: () => void;
  receiptsCount: number;
}

export const Header: React.FC<HeaderProps> = ({
  currentScreen,
  onSelectScreen,
  activePersona,
  allPersonas,
  onSelectPersona,
  onOpenAddModal,
  onOpenThermalScroll,
  isMuted,
  onToggleMute,
  receiptsCount
}) => {
  const navItems: { id: ViewScreen; label: string; icon: React.ComponentType<{ className?: string }> }[] = [
    { id: 'book', label: 'The Living Book', icon: BookOpen },
    { id: 'raw-data', label: 'Raw Data & Ledger', icon: ReceiptIcon },
    { id: 'insights', label: 'Insights & Margins', icon: LineChart },
    { id: 'connections', label: 'Connections', icon: Share2 },
    { id: 'story', label: 'Story & Chronicle', icon: Sparkles },
  ];

  return (
    <header className="sticky top-0 z-40 bg-[#fbf9f4]/95 backdrop-blur-md border-b border-[#e5dfd3] shadow-xs">
      {/* Top Banner: Vintage Archive Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          
          {/* Brand Title & Metaphor */}
          <div className="flex items-center space-x-3 sm:space-x-4">
            <button
              onClick={() => {
                soundEffects.playPageFlip();
                onSelectScreen('book');
              }}
              className="flex items-center space-x-3 text-left group cursor-pointer focus:outline-hidden"
              title="Return to Book Cover"
            >
              <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-sm bg-[#2b2620] text-[#f7f4ec] flex items-center justify-center shadow-md border border-[#443c33] group-hover:scale-105 transition-transform">
                <BookOpen className="w-5 h-5 text-[#dfcfb0]" />
              </div>
              <div>
                <div className="flex items-center space-x-2">
                  <span className="font-display font-bold text-lg sm:text-xl text-[#26211a] tracking-tight group-hover:text-[#634832] transition-colors">
                    THE LIVING BOOK
                  </span>
                  <span className="hidden md:inline-flex items-center px-2 py-0.5 rounded text-[10px] uppercase font-mono tracking-wider bg-[#ede7db] text-[#6e5d48] border border-[#d9d0bf]">
                    Archive Vol. I
                  </span>
                </div>
                <p className="text-[11px] sm:text-xs text-[#7d7162] font-serif italic">
                  “Your Life, In Receipts”
                </p>
              </div>
            </button>
          </div>

          {/* Center / Right controls: Persona Selector & Actions */}
          <div className="flex items-center space-x-2 sm:space-x-3">
            
            {/* Persona Switcher Dropdown */}
            <div className="relative group">
              <div className="flex items-center space-x-2 bg-[#f4efe4] hover:bg-[#ede5d5] border border-[#dbd1bf] rounded-md px-2.5 py-1.5 cursor-pointer transition-colors text-xs font-sans text-[#3f362b]">
                <img 
                  src={activePersona.avatar} 
                  alt={activePersona.name} 
                  className="w-5 h-5 rounded-full object-cover border border-[#b8ab96]"
                />
                <span className="font-medium hidden sm:inline">{activePersona.name}</span>
                <span className="text-[10px] text-[#857764] hidden lg:inline font-mono">
                  ({receiptsCount} receipts)
                </span>
                <User className="w-3.5 h-3.5 text-[#857764] sm:hidden" />
              </div>

              {/* Persona dropdown menu */}
              <div className="absolute right-0 mt-1 w-64 bg-[#fcfbf7] border border-[#d9d0be] rounded-lg shadow-xl py-1.5 hidden group-hover:block z-50">
                <div className="px-3 py-1 text-[10px] uppercase font-mono text-[#8c7b64] tracking-wider border-b border-[#ebe4d6]">
                  Select Life Archive
                </div>
                {allPersonas.map((p) => (
                  <button
                    key={p.id}
                    onClick={() => {
                      soundEffects.playPageFlip();
                      onSelectPersona(p);
                    }}
                    className={`w-full text-left px-3 py-2 flex items-center space-x-3 hover:bg-[#f3edd9] transition-colors cursor-pointer ${
                      p.id === activePersona.id ? 'bg-[#eee7d5] font-semibold' : ''
                    }`}
                  >
                    <img 
                      src={p.avatar} 
                      alt={p.name} 
                      className="w-7 h-7 rounded-full object-cover border border-[#c5b8a5]"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="text-xs text-[#2a241b] truncate font-sans">{p.name}</div>
                      <div className="text-[10px] text-[#7a6b57] truncate font-serif italic">{p.subtitle}</div>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Quick action: Long thermal scroll */}
            <button
              onClick={() => {
                soundEffects.playReceiptTick();
                onOpenThermalScroll();
              }}
              className="hidden sm:inline-flex items-center space-x-1.5 px-2.5 py-1.5 rounded-md text-xs font-mono text-[#4b4034] bg-[#f2ecde] hover:bg-[#eae2cf] border border-[#d5cbba] cursor-pointer transition-colors"
              title="View Continuous Thermal Scroll"
            >
              <ScrollText className="w-3.5 h-3.5 text-[#735e46]" />
              <span className="hidden md:inline">Continuous Tape</span>
            </button>

            {/* Quick action: Add/Scan Receipt */}
            <button
              onClick={() => {
                soundEffects.playReceiptTick();
                onOpenAddModal();
              }}
              className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-md text-xs font-medium text-[#fbf8f0] bg-[#3a3026] hover:bg-[#251e18] shadow-xs cursor-pointer transition-all active:scale-95"
            >
              <PlusCircle className="w-3.5 h-3.5 text-[#dfcfb0]" />
              <span>Log Receipt</span>
            </button>

            {/* Sound Effects toggle */}
            <button
              onClick={onToggleMute}
              className="p-1.5 rounded-md text-[#786955] hover:text-[#2d251d] hover:bg-[#eee7d7] transition-colors cursor-pointer"
              title={isMuted ? 'Unmute tactile paper sounds' : 'Mute sound effects'}
              aria-label="Toggle Sound"
            >
              {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4 text-[#8a6839]" />}
            </button>
          </div>
        </div>

        {/* Primary Journey Navigation Tabs: RAW DATA -> INSIGHTS -> CONNECTIONS -> STORY */}
        <div className="flex items-center space-x-1 sm:space-x-2 border-t border-[#eee6d7] py-2 overflow-x-auto no-scrollbar">
          {navItems.map((item, idx) => {
            const Icon = item.icon;
            const isActive = currentScreen === item.id;
            return (
              <React.Fragment key={item.id}>
                <button
                  onClick={() => {
                    soundEffects.playPageFlip();
                    onSelectScreen(item.id);
                  }}
                  className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-md text-xs font-sans whitespace-nowrap cursor-pointer transition-all ${
                    isActive
                      ? 'bg-[#3b3228] text-[#f7f3e8] font-semibold shadow-xs'
                      : 'text-[#695c4d] hover:text-[#261f18] hover:bg-[#ede5d6]'
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-[#dfcfae]' : 'text-[#8c7a65]'}`} />
                  <span>{item.label}</span>
                </button>
                {idx < navItems.length - 1 && (
                  <span className="text-[#d8cfbe] select-none text-xs hidden sm:inline">
                    →
                  </span>
                )}
              </React.Fragment>
            );
          })}
        </div>
      </div>
    </header>
  );
};
