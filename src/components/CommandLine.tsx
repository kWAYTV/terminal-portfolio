import React, { useState, useEffect, useRef } from "react";

interface CommandLineProps {
  onCommand: (command: string) => void;
  history: string[];
  onHistoryNavigate: (direction: "up" | "down") => string;
}

const AVAILABLE_COMMANDS = [
  "help",
  "about",
  "projects",
  "contact",
  "clear",
  "skills",
] as const;

export const CommandLine: React.FC<CommandLineProps> = ({
  onCommand,
  history,
  onHistoryNavigate,
}) => {
  const [input, setInput] = useState("");
  const [suggestion, setSuggestion] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const cursorRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  // Keep focus on click anywhere in the terminal
  useEffect(() => {
    const handleClick = () => inputRef.current?.focus();
    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, []);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && input.trim()) {
      onCommand(input.trim());
      setInput("");
      setSuggestion("");
    } else if (e.key === "Tab") {
      e.preventDefault();
      if (suggestion) {
        setInput(suggestion);
        setSuggestion("");
      }
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      const prevCommand = onHistoryNavigate("up");
      setInput(prevCommand);
      setSuggestion("");
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      const nextCommand = onHistoryNavigate("down");
      setInput(nextCommand);
      setSuggestion("");
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.toLowerCase();
    setInput(value);

    if (value) {
      const match = AVAILABLE_COMMANDS.find((cmd) => cmd.startsWith(value));
      setSuggestion(match || "");
    } else {
      setSuggestion("");
    }
  };

  return (
    <div className="flex items-center group relative">
      <span className="text-green-400/90 mr-2">❯</span>
      <div className="flex-1 relative">
        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          className="w-full bg-transparent outline-none font-mono text-green-400/90 relative z-10"
          autoFocus
          spellCheck="false"
          autoCapitalize="none"
          autoComplete="off"
          autoCorrect="off"
        />
        {suggestion && input && suggestion !== input && (
          <span className="absolute left-0 text-gray-600 select-none">
            {input}
            <span className="text-gray-600/50">
              {suggestion.slice(input.length)}
            </span>
          </span>
        )}
        <span
          ref={cursorRef}
          className="absolute top-0 left-0 w-[2px] h-[1.2em] bg-green-400/90 -translate-y-[2px] animate-blink"
          style={{
            transform: `translateX(${input.length}ch)`,
            opacity: document.hasFocus() ? 1 : 0,
          }}
        />
      </div>
    </div>
  );
};
