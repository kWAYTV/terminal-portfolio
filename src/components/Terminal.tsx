import React, { useState, useRef, useEffect } from "react";
import { CommandLine } from "./CommandLine";
import { CommandOutput } from "./CommandOutput";
import { useCommandHistory } from "../hooks/useCommandHistory";
import { useCommands } from "../hooks/useCommands";

const ASCII_ART = [
  "███████╗██╗   ██╗███████╗████████╗███████╗███╗   ███╗",
  "██╔════╝╚██╗ ██╔╝██╔════╝╚══██╔══╝██╔════╝████╗ ████║",
  "███████╗ ╚████╔╝ ███████╗   ██║   █████╗  ██╔████╔██║",
  "╚════██║  ╚██╔╝  ╚════██║   ██║   ██╔══╝  ██║╚██╔╝██║",
  "███████║   ██║   ███████║   ██║   ███████╗██║ ╚═╝ ██║",
  "╚══════╝   ╚═╝   ╚══════╝   ╚═╝   ╚══════╝╚═╝     ╚═╝",
];

export const Terminal = () => {
  const [outputs, setOutputs] = useState<
    Array<{ command: string; output: React.ReactNode }>
  >([
    {
      command: "init",
      output: (
        <>
          <div className="ascii-art">
            {ASCII_ART.map((line, i) => (
              <div key={i}>{line}</div>
            ))}
          </div>
          <div className="mt-2">
            <p>[SYSTEM] Initializing terminal...</p>
            <p>[SYSTEM] Connection established...</p>
            <p>[SYSTEM] Type 'help' for available commands</p>
          </div>
        </>
      ),
    },
  ]);

  const terminalRef = useRef<HTMLDivElement>(null);
  const { processCommand } = useCommands(setOutputs);
  const { history, addToHistory, navigateHistory } = useCommandHistory();

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [outputs]);

  const handleCommand = (command: string) => {
    addToHistory(command);
    processCommand(command);
  };

  return (
    <div className="terminal-window">
      <div className="terminal-header">
        <div className="flex items-center gap-2">
          <div className="terminal-button close bg-[#ff5f56]" />
          <div className="terminal-button minimize bg-[#ffbd2e]" />
          <div className="terminal-button maximize bg-[#27c93f]" />
        </div>
        <div className="ml-4 text-sm text-gray-400 flex items-center gap-2">
          <span className="text-green-500">●</span>
          <span className="opacity-70">guest@terminal:~</span>
        </div>
      </div>
      <div className="terminal-content" ref={terminalRef}>
        {outputs.map((output, index) => (
          <CommandOutput
            key={index}
            command={output.command}
            output={output.output}
          />
        ))}
        <CommandLine
          onCommand={handleCommand}
          history={history}
          onHistoryNavigate={navigateHistory}
        />
      </div>
    </div>
  );
};
