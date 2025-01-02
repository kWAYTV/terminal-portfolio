import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';

const fetchGithubProjects = async () => {
  const response = await fetch('https://api.github.com/users/YOUR_GITHUB_USERNAME/repos');
  return response.json();
};

export const useCommands = (setOutputs: React.Dispatch<React.SetStateAction<Array<{ command: string; output: React.ReactNode }>>>) => {
  const { data: githubProjects } = useQuery({
    queryKey: ['github-projects'],
    queryFn: fetchGithubProjects,
    enabled: false,
  });

  const processCommand = (command: string) => {
    const cmd = command.toLowerCase().trim();

    const outputs: { [key: string]: React.ReactNode } = {
      help: (
        <div className="space-y-2">
          <p className="text-terminal-accent">Available commands:</p>
          <p>help - Show this help message</p>
          <p>about - Learn about me</p>
          <p>projects - View my GitHub projects</p>
          <p>contact - Get my contact information</p>
          <p>clear - Clear the terminal</p>
          <p className="text-terminal-text/50">Try to find hidden commands! 🎮</p>
        </div>
      ),
      about: (
        <div className="space-y-2">
          <p>Hi! I'm [Your Name]</p>
          <p>I'm a software developer passionate about creating beautiful and functional web applications.</p>
          <p>Core skills: React, TypeScript, Node.js, and more.</p>
        </div>
      ),
      projects: (
        <div className="space-y-2">
          {githubProjects ? (
            githubProjects.map((project: any) => (
              <div key={project.id} className="border border-terminal-text/20 p-2 rounded">
                <a href={project.html_url} target="_blank" rel="noopener noreferrer" className="text-terminal-accent hover:underline">
                  {project.name}
                </a>
                <p className="text-sm text-terminal-text/70">{project.description}</p>
              </div>
            ))
          ) : (
            <p>Loading projects...</p>
          )}
        </div>
      ),
      contact: (
        <div className="space-y-2">
          <p>📧 Email: your.email@example.com</p>
          <p>🐦 Twitter: @your_handle</p>
          <p>💼 LinkedIn: linkedin.com/in/your-profile</p>
          <p>🐙 GitHub: github.com/your-username</p>
        </div>
      ),
      matrix: (
        <div className="text-terminal-accent animate-pulse">
          Wake up, Neo...
        </div>
      ),
      flip: (
        <div style={{ transform: 'rotate(180deg)' }}>
          ¡ʎzɐɹɔ ʇıɥs s,ʇɐɥʇ 'ʎǝH
        </div>
      ),
      cheat: (
        <div className="space-y-4">
          <p className="text-red-400 animate-pulse">🎮 CHEAT MODE ACTIVATED 🎮</p>
          <div className="space-y-2 text-terminal-accent">
            <p>🕹️ Hidden Commands Revealed:</p>
            <p className="pl-4">• matrix - Enter the Matrix</p>
            <p className="pl-4">• flip - ¿ʇxǝʇ dılɟ ǝɥʇ ʎɹʇ</p>
            <p className="pl-4">• sudo - Nice try! 😉</p>
            <p className="pl-4">• coffee - ☕ Developer fuel</p>
            <p className="pl-4">• 42 - The answer to everything</p>
            <p className="pl-4">• whoami - Display user info</p>
          </div>
          <p className="text-sm text-terminal-text/50 italic">Achievement Unlocked: Cheater Cheater! 🏆</p>
        </div>
      ),
      coffee: (
        <div className="space-y-2">
          <p>☕ Here's your virtual coffee!</p>
          <pre className="text-terminal-accent">
{`
   ( (
    ) )
  ........
  |      |]
  \      /
   \____/
`}
          </pre>
        </div>
      ),
      "42": (
        <div className="text-terminal-accent">
          🌌 The Answer to the Ultimate Question of Life, the Universe, and Everything
        </div>
      ),
      sudo: (
        <div className="text-terminal-error">
          Nice try! But you're not an admin here 😉
        </div>
      ),
      whoami: (
        <div className="font-mono space-y-1">
          <p className="text-terminal-accent">User Information</p>
          <p>uid=1000(guest) gid=1000(guest)</p>
          <p>Groups: guest, web-surfer, terminal-explorer</p>
          <p>Shell: /bin/portfolio-terminal</p>
          <p>Home: /home/portfolio</p>
          <p className="text-xs text-terminal-text/50 mt-2">Note: This is a simulated Unix-style user info display 🐧</p>
        </div>
      ),
    };

    if (cmd === 'clear') {
      setOutputs([]);
      return;
    }

    const output = outputs[cmd] || (
      <span className="text-terminal-error">
        Command not found. Type 'help' to see available commands.
      </span>
    );

    setOutputs(prev => [...prev, { command, output }]);
  };

  return { processCommand };
};
```

Note: The useCommands.tsx file is getting quite long. Consider asking me to refactor it into smaller, more manageable pieces after this change.