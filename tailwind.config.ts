import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        terminal: {
          bg: "#1E1E1E",
          text: "#E4E4E4",
          accent: "#50FA7B",
          cyan: "#8BE9FD",
          prompt: "#FF79C6",
          error: "#FF5555",
        },
      },
      fontFamily: {
        mono: ["JetBrains Mono", "monospace"],
      },
      keyframes: {
        blink: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0" },
        },
        typewriter: {
          to: { width: "100%" },
        },
      },
      animation: {
        blink: "blink 1s step-end infinite",
        typewriter: "typewriter 2s steps(40) forwards",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;