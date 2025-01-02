import { useState } from 'react';

export const useCommandHistory = () => {
  const [history, setHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);

  const addToHistory = (command: string) => {
    setHistory(prev => [...prev, command]);
    setHistoryIndex(-1);
  };

  const navigateHistory = (direction: 'up' | 'down'): string => {
    if (history.length === 0) return '';

    let newIndex = historyIndex;
    if (direction === 'up') {
      newIndex = historyIndex === -1 ? history.length - 1 : Math.max(0, historyIndex - 1);
    } else {
      newIndex = Math.min(history.length - 1, historyIndex + 1);
      if (newIndex === history.length - 1) newIndex = -1;
    }

    setHistoryIndex(newIndex);
    return newIndex === -1 ? '' : history[newIndex];
  };

  return { history, addToHistory, navigateHistory };
};