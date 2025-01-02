import React, { useState, useRef, useEffect } from 'react';
import { CommandLine } from './CommandLine';
import { CommandOutput } from './CommandOutput';
import { useCommandHistory } from '../hooks/useCommandHistory';
import { useCommands } from '../hooks/useCommands';

export const Terminal = () => {
  const [outputs, setOutputs] = useState<Array<{ command: string; output: React.ReactNode }>>([]);
  const terminalRef = useRef<HTMLDivElement>(null);
  const { processCommand } = useCommands(setOutputs);
  const { history, addToHistory, navigateHistory } = useCommandHistory();

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [outputs]);

  return (
    <div className="container mx-auto p-4 h-screen flex items-center justify-center relative">
      <div className="absolute inset-0 bg-gradient-to-b from-purple-500/10 via-blue-500/10 to-teal-500/10 animate-gradient-y pointer-events-none" />
      <div className="terminal-window w-full max-w-4xl relative">
        <div className="terminal-title-bar">
          <div className="window-button bg-red-500"></div>
          <div className="window-button bg-yellow-500"></div>
          <div className="window-button bg-green-500"></div>
          <span className="ml-4 text-sm opacity-60">portfolio.sh</span>
        </div>
        <div className="terminal-content" ref={terminalRef}>
          <div className="mb-6 text-terminal-accent font-bold">
            Welcome to my interactive portfolio! Type 'help' to see available commands.
          </div>
          {outputs.map((output, index) => (
            <CommandOutput key={index} command={output.command} output={output.output} />
          ))}
          <CommandLine onCommand={handleCommand} history={history} onHistoryNavigate={navigateHistory} />
        </div>
      </div>
    </div>
  );
};