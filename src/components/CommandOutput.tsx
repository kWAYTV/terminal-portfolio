import React from "react";

interface CommandOutputProps {
  command: string;
  output: React.ReactNode;
}

export const CommandOutput: React.FC<CommandOutputProps> = ({
  command,
  output,
}) => {
  return (
    <div className="mb-3">
      {command !== "init" && (
        <div className="flex items-center text-green-400/90 mb-1">
          <span className="mr-2">❯</span>
          <span className="font-semibold">{command}</span>
        </div>
      )}
      <div className={command !== "init" ? "command-output" : ""}>{output}</div>
    </div>
  );
};
