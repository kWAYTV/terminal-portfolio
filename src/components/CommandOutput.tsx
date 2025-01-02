import React from "react";

interface CommandOutputProps {
  command: string;
  output: React.ReactNode;
}

const makeLinksClickable = (content: React.ReactNode): React.ReactNode => {
  if (typeof content !== "string") return content;

  // Regex for different types of links
  const patterns = {
    url: /https?:\/\/[^\s]+/g,
    email: /[a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9._-]+/g,
    github: /github\.com\/[a-zA-Z0-9._-]+/g,
    twitter: /twitter\.com\/[a-zA-Z0-9._-]+/g,
    linkedin: /linkedin\.com\/in\/[a-zA-Z0-9._-]+/g,
    gitroll: /gitroll\.io\/profile\/[a-zA-Z0-9]+/g,
    // Domain should be last as it's the most generic
    domain:
      /(?<!@)(?<!\/\/)([a-zA-Z0-9][a-zA-Z0-9-]{0,61}[a-zA-Z0-9]\.)+[a-zA-Z]{2,}/g,
  };

  // Split content by spaces to handle URLs better
  return content.split(/\s+/).map((word, index, array) => {
    // Try each pattern in order of specificity
    for (const [type, pattern] of Object.entries(patterns)) {
      if (word.match(pattern)) {
        let href = word;
        let isExternal = true;

        // Handle different types of links
        if (type === "email") {
          href = `mailto:${word}`;
          isExternal = false;
        } else if (!word.startsWith("http")) {
          href = `https://${word}`;
        }

        return (
          <React.Fragment key={index}>
            <a
              href={href}
              target={isExternal ? "_blank" : undefined}
              rel={isExternal ? "noopener noreferrer" : undefined}
              className="text-green-400 hover:underline"
            >
              {word}
            </a>
            {index < array.length - 1 ? " " : ""}
          </React.Fragment>
        );
      }
    }
    return index < array.length - 1 ? `${word} ` : word;
  });
};

const processReactElement = (
  element: React.ReactElement
): React.ReactElement => {
  const children = React.Children.map(element.props.children, (child) => {
    if (typeof child === "string") {
      return makeLinksClickable(child);
    }
    if (React.isValidElement(child)) {
      return processReactElement(child);
    }
    return child;
  });

  return React.cloneElement(element, { ...element.props, children });
};

export const CommandOutput: React.FC<CommandOutputProps> = ({
  command,
  output,
}) => {
  const processedOutput = React.useMemo(() => {
    if (React.isValidElement(output)) {
      return processReactElement(output);
    }
    return makeLinksClickable(output);
  }, [output]);

  return (
    <div className="mb-3">
      {command !== "init" && (
        <div className="flex items-center text-green-400/90 mb-1">
          <span className="mr-2">❯</span>
          <span className="font-semibold">{command}</span>
        </div>
      )}
      <div className={command !== "init" ? "command-output" : ""}>
        {processedOutput}
      </div>
    </div>
  );
};
