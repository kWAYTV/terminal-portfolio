import React, { useState, useEffect, useRef } from 'react';

interface CommandLineProps {
  onCommand: (command: string) => void;
  history: string[];
  onHistoryNavigate: (direction: 'up' | 'down') => string;
}

export const CommandLine: React.FC<CommandLineProps> = ({ onCommand, history, onHistoryNavigate }) => {
  const [input, setInput] = useState('');
  const [suggestion, setSuggestion] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  const commands = ['help', 'about', 'projects', 'contact', 'clear', 'matrix', 'flip'];

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && input.trim()) {
      onCommand(input.trim());
      setInput('');
      setSuggestion('');
    } else if (e.key === 'Tab') {
      e.preventDefault();
      if (suggestion) {
        setInput(suggestion);
        setSuggestion('');
      }
    } else if (e.key === 'ArrowUp') {
      const prevCommand = onHistoryNavigate('up');
      setInput(prevCommand);
    } else if (e.key === 'ArrowDown') {
      const nextCommand = onHistoryNavigate('down');
      setInput(nextCommand);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInput(value);

    if (value) {
      const match = commands.find(cmd => cmd.startsWith(value.toLowerCase()));
      setSuggestion(match || '');
    } else {
      setSuggestion('');
    }
  };

  return (
    <div className="flex items-center">
      <span className="command-prompt mr-2">❯</span>
      <input
        ref={inputRef}
        type="text"
        value={input}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        className="bg-transparent outline-none flex-1"
        autoFocus
      />
      {suggestion && input && suggestion !== input && (
        <span className="suggestion">{suggestion.slice(input.length)}</span>
      )}
      <span className="cursor" />
    </div>
  );
};