import React, { createContext, useContext, useState, useEffect } from 'react';

interface ArchiveContextType {
  visitedCategories: string[];
  visitedArtifacts: string[];
  lastVisitedCategory: string | null;
  lastVisitedArtifact: string | null;
  isReturningHome: boolean;
  markCategoryVisited: (slug: string) => void;
  markArtifactVisited: (id: string) => void;
  triggerReturnHome: (navigateCb: () => void) => void;
  resetArchiveState: () => void;
}

const ArchiveContext = createContext<ArchiveContextType | undefined>(undefined);

export const ArchiveProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [visitedCategories, setVisitedCategories] = useState<string[]>(() => {
    try {
      const saved = sessionStorage.getItem('archive_visited_categories');
      return saved ? JSON.parse(saved) : ['music'];
    } catch {
      return ['music'];
    }
  });

  const [visitedArtifacts, setVisitedArtifacts] = useState<string[]>(() => {
    try {
      const saved = sessionStorage.getItem('archive_visited_artifacts');
      return saved ? JSON.parse(saved) : ['music-1'];
    } catch {
      return ['music-1'];
    }
  });

  const [lastVisitedCategory, setLastVisitedCategory] = useState<string | null>('music');
  const [lastVisitedArtifact, setLastVisitedArtifact] = useState<string | null>('music-1');
  const [isReturningHome, setIsReturningHome] = useState(false);

  const markCategoryVisited = (slug: string) => {
    setLastVisitedCategory(slug);
    setVisitedCategories((prev) => {
      if (!prev.includes(slug)) {
        const next = [...prev, slug];
        sessionStorage.setItem('archive_visited_categories', JSON.stringify(next));
        return next;
      }
      return prev;
    });
  };

  const markArtifactVisited = (id: string) => {
    setLastVisitedArtifact(id);
    setVisitedArtifacts((prev) => {
      if (!prev.includes(id)) {
        const next = [...prev, id];
        sessionStorage.setItem('archive_visited_artifacts', JSON.stringify(next));
        return next;
      }
      return prev;
    });
  };

  const triggerReturnHome = (navigateCb: () => void) => {
    setIsReturningHome(true);
    setTimeout(() => {
      navigateCb();
      setTimeout(() => {
        setIsReturningHome(false);
      }, 700);
    }, 850);
  };

  const resetArchiveState = () => {
    sessionStorage.removeItem('archive_visited_categories');
    sessionStorage.removeItem('archive_visited_artifacts');
    sessionStorage.removeItem('archive_intro_seen');
    setVisitedCategories(['music']);
    setVisitedArtifacts(['music-1']);
    setLastVisitedCategory('music');
    setLastVisitedArtifact('music-1');
  };

  return (
    <ArchiveContext.Provider
      value={{
        visitedCategories,
        visitedArtifacts,
        lastVisitedCategory,
        lastVisitedArtifact,
        isReturningHome,
        markCategoryVisited,
        markArtifactVisited,
        triggerReturnHome,
        resetArchiveState,
      }}
    >
      {children}
    </ArchiveContext.Provider>
  );
};

export const useArchive = () => {
  const context = useContext(ArchiveContext);
  if (!context) {
    throw new Error('useArchive must be used within an ArchiveProvider');
  }
  return context;
};
