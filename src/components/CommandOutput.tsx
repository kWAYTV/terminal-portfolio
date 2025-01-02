import React from 'react';

interface CommandOutputProps {
  command: string;
  output: React.ReactNode;
}

export const CommandOutput: React.FC<CommandOutputProps> = ({ command, output }) => {
  const renderContent = (content: React.ReactNode): React.ReactNode => {
    if (typeof content === 'string') {
      // Convert URLs to clickable links
      const urlRegex = /(https?:\/\/[^\s]+)/g;
      return content.split(urlRegex).map((part, index) => {
        if (part.match(urlRegex)) {
          return (
            <a
              key={index}
              href={part}
              target="_blank"
              rel="noopener noreferrer"
              className="clickable-link"
            >
              {part}
            </a>
          );
        }
        return part;
      });
    }
    return content;
  };

  return (
    <div className="mb-4">
      <div className="flex items-center">
        <span className="command-prompt mr-2">❯</span>
        <span>{command}</span>
      </div>
      <div className="command-output ml-6">{renderContent(output)}</div>
    </div>
  );
};