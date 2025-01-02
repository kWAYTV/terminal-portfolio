import React from 'react';

interface CommandOutputProps {
  command: string;
  output: React.ReactNode;
}

export const CommandOutput: React.FC<CommandOutputProps> = ({ command, output }) => {
  return (
    <div className="mb-4">
      <div className="flex items-center">
        <span className="command-prompt mr-2">❯</span>
        <span>{command}</span>
      </div>
      <div className="command-output ml-6">{output}</div>
    </div>
  );
};