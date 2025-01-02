import React from "react";
import { CommandLine } from "./CommandLine";
import { CommandOutput } from "./CommandOutput";
import { useCommandHistory } from "../hooks/useCommandHistory";
import { useCommands } from "../hooks/useCommands";
import { useIsMobile } from "../hooks/use-mobile";
import { useToast } from "../hooks/use-toast";
import { cn } from "../lib/utils";

export const Terminal = () => {
  const [outputs, setOutputs] = React.useState<
    Array<{ command: string; output: React.ReactNode }>
  >([
    {
      command: "init",
      output: (
        <div className="space-y-1 text-sm text-gray-400/90">
          <p className="text-green-400">[ Terminal Portfolio v1.0.0 ]</p>
          <p>Initializing system...</p>
          <p className="text-green-400/90">● Connection established</p>
          <p className="text-green-400/90">● Session started: guest@terminal</p>
          <p className="text-green-400/90">● System ready</p>
          <p className="mt-2">Type 'help' to see available commands</p>
        </div>
      ),
    },
  ]);

  const terminalRef = React.useRef<HTMLDivElement>(null);
  const { processCommand } = useCommands(setOutputs);
  const { history, addToHistory, navigateHistory } = useCommandHistory();
  const isMobile = useIsMobile();
  const { toast } = useToast();

  React.useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [outputs]);

  const handleCommand = (command: string) => {
    addToHistory(command);
    processCommand(command);

    // Show toast for easter egg commands
    const easterEggs = [
      "matrix",
      "coffee",
      "party",
      "rickroll",
      "42",
      "flip",
      "hack",
    ];
    if (easterEggs.includes(command.toLowerCase())) {
      toast({
        title: "🎉 Easter Egg Found!",
        description: "You've discovered a hidden command!",
        duration: 3000,
      });
    }
  };

  return (
    <div className={cn("terminal-window", isMobile && "inset-0 rounded-none")}>
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
      <div ref={terminalRef} className="terminal-content">
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
