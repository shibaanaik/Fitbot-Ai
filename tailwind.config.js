/** @type {import('tailwindcss').Config} */
const config = {
  darkMode: ["class"],
  content: [
    "./src/**/*.{ts,tsx,js,jsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["DM Sans", "sans-serif"],
        display: ["Syne", "sans-serif"],
      },
      colors: {
        background:  "#0a0a0a",
        foreground:  "#f0f0f0",
        card:        "#161616",
        border:      "#2a2a2a",
        input:       "#111111",
        primary: {
          DEFAULT:    "#c8f135",
          foreground: "#0a0a0a",
        },
        secondary: {
          DEFAULT:    "#1e1e1e",
          foreground: "#f0f0f0",
        },
        muted: {
          DEFAULT:    "#1a1a1a",
          foreground: "#888888",
        },
        accent: {
          DEFAULT:    "#c8f135",
          foreground: "#0a0a0a",
          dim:        "#a8cc20",
        },
        "message-ai":   "#161616",
        "message-user": "#c8f135",
      },
      borderRadius: {
        lg:   "14px",
        xl:   "20px",
        "2xl":"28px",
      },
      boxShadow: {
        glow:      "0 0 24px rgba(200,241,53,0.15)",
        "glow-sm": "0 0 12px rgba(200,241,53,0.12)",
        "glow-lg": "0 0 40px rgba(200,241,53,0.2), 0 0 80px rgba(200,241,53,0.06)",
      },
      animation: {
        "pulse-glow":    "pulse-glow 2s ease-in-out infinite",
        "typing-dot-1":  "typing-bounce 1.2s ease-in-out infinite",
        "typing-dot-2":  "typing-bounce 1.2s ease-in-out 0.2s infinite",
        "typing-dot-3":  "typing-bounce 1.2s ease-in-out 0.4s infinite",
        "fade-up":       "fade-up 0.5s ease-out forwards",
      },
      keyframes: {
        "pulse-glow": {
          "0%, 100%": { opacity: "1", boxShadow: "0 0 4px #c8f135" },
          "50%":       { opacity: "0.6", boxShadow: "0 0 10px #c8f135" },
        },
        "typing-bounce": {
          "0%, 80%, 100%": { transform: "translateY(0)", opacity: "0.4" },
          "40%":            { transform: "translateY(-5px)", opacity: "1" },
        },
        "fade-up": {
          from: { opacity: "0", transform: "translateY(12px)" },
          to:   { opacity: "1", transform: "translateY(0)" },
        },
      },
    },
  },
  plugins: [],
};

module.exports = config;