import { useQuery } from "@tanstack/react-query";

interface GitHubProject {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
}

const fetchGithubProjects = async (): Promise<GitHubProject[]> => {
  try {
    const response = await fetch("https://api.github.com/users/kWAYTV/repos");
    if (!response.ok) throw new Error("Failed to fetch projects");
    return response.json();
  } catch (error) {
    console.error("Error fetching projects:", error);
    return [];
  }
};

export const useCommands = (
  setOutputs: React.Dispatch<
    React.SetStateAction<Array<{ command: string; output: React.ReactNode }>>
  >
) => {
  const {
    data: githubProjects,
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ["github-projects"],
    queryFn: fetchGithubProjects,
    enabled: true,
    gcTime: 30 * 60 * 1000,
  });

  const processCommand = (command: string) => {
    const cmd = command.toLowerCase().trim();

    const outputs: { [key: string]: React.ReactNode } = {
      help: (
        <div className="space-y-2">
          <p className="text-green-400">Available commands:</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-1 text-gray-400">
            <p>help - Show this help message</p>
            <p>about - Learn about me</p>
            <p>projects - View my projects</p>
            <p>contact - Get my contact info</p>
            <p>clear - Clear terminal</p>
          </div>
          <p className="text-gray-600 text-sm mt-2">
            Tip: Try to find hidden commands!
          </p>
        </div>
      ),
      about: (
        <div className="space-y-2">
          <p>Hi! I'm kWAY</p>
          <p>
            I'm a software developer passionate about creating beautiful and
            functional web & backend applications.
          </p>
        </div>
      ),
      projects: (
        <div className="space-y-2">
          {isLoading ? (
            <p className="text-yellow-400">Loading projects...</p>
          ) : error ? (
            <div className="text-red-400">
              <p>Failed to load projects.</p>
              <button
                onClick={() => refetch()}
                className="text-green-400 hover:underline mt-1"
              >
                Try again
              </button>
            </div>
          ) : !githubProjects?.length ? (
            <p className="text-yellow-400">No projects found.</p>
          ) : (
            githubProjects.map((project) => (
              <div
                key={project.id}
                className="border border-green-500/10 p-2 rounded"
              >
                <a
                  href={project.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-green-400 hover:underline"
                >
                  {project.name}
                </a>
                <p className="text-sm text-gray-400">{project.description}</p>
              </div>
            ))
          )}
        </div>
      ),
      contact: (
        <div className="space-y-2">
          <p>📧 Email: contact@perc.dev</p>
          <p>🐦 Twitter: @ogeperc</p>
          <p>🐙 GitHub: github.com/kWAYTV</p>
          <p>👁️ Overview: gitroll.io/profile/uezq54oxIk4VFZkLigfxGmGgm57z1</p>
        </div>
      ),
      // Easter egg commands
      matrix: (
        <div className="text-green-400 animate-pulse">Wake up, Neo...</div>
      ),
      sudo: <div className="text-red-400">Permission denied: Nice try! 😎</div>,
      hack: (
        <pre className="text-green-400 animate-pulse">
          {`
INITIALIZING HACK.EXE...
[██████████] 100%
ACCESS DENIED!
Nice try, but I'm unhackable! 😉
`}
        </pre>
      ),
      coffee: (
        <div className="space-y-2">
          <p>☕ Here's your virtual coffee!</p>
          <pre className="font-mono text-yellow-500 whitespace-pre leading-none">
            {`
     ) )
    ( (
  .........
  |       |]
   \\_____/
`}
          </pre>
        </div>
      ),
      flip: (
        <div style={{ transform: "rotate(180deg)" }}>
          ¡ʎzɐɹɔ ʇıɥs s,ʇɐɥʇ 'ʎǝH
        </div>
      ),
      party: (
        <div className="space-y-1 animate-bounce">
          <p>🎉 🎈 🎊 🎵 🎸 🎷</p>
          <p>Let's get this party started!</p>
          <p>💃 🕺 🎵 🎶 🎹 🎼</p>
        </div>
      ),
      rickroll: (
        <div className="space-y-2 text-yellow-400">
          <p>Never gonna give you up</p>
          <p>Never gonna let you down</p>
          <p>Never gonna run around and desert you</p>
          <p>Never gonna make you cry</p>
          <p>Never gonna say goodbye</p>
          <p>Never gonna tell a lie and hurt you</p>
        </div>
      ),
      "42": (
        <div className="text-purple-400">
          🌌 The Answer to the Ultimate Question of Life, the Universe, and
          Everything
        </div>
      ),
      time: new Date().toLocaleString(),
      whoami: "guest@terminal:~$",
      ls: (
        <div className="text-gray-400">
          <p>system/</p>
          <p> ├─ about.sys</p>
          <p> ├─ projects.db</p>
          <p> ├─ skills.dat</p>
          <p> └─ contact.enc</p>
        </div>
      ),
      cheat: (
        <div className="space-y-2">
          <p className="text-yellow-400">🎮 Hidden Commands Found!</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-gray-400">
            <p>matrix - Enter the Matrix</p>
            <p>coffee - Get virtual coffee</p>
            <p>party - Start a party</p>
            <p>rickroll - Never gonna give you up</p>
            <p>42 - The answer to everything</p>
            <p>flip - ¡ʎzɐɹɔ ʇıɥs s,ʇɐɥʇ</p>
            <p>hack - Try to hack the system</p>
            <p>sudo - Try to get permissions</p>
            <p>whoami - Show current user</p>
            <p>ls - List system files</p>
            <p>time - Show current time</p>
          </div>
          <p className="text-sm text-gray-600">You found the cheat sheet! 🎉</p>
        </div>
      ),
    };

    if (cmd === "clear") {
      setOutputs([]);
      return;
    }

    const output = outputs[cmd] || (
      <span className="text-red-400">
        Command not found. Type 'help' to see available commands.
      </span>
    );

    setOutputs((prev) => [...prev, { command: cmd, output }]);
  };

  return { processCommand };
};
