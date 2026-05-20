import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: "#FFF5F3",
          100: "#FDEAE6",
          200: "#FAD0C8",
          300: "#F5AFA4",
          400: "#E8897C",
          500: "#C9726A",
          600: "#A85852",
          700: "#8A453F",
          800: "#6B332E",
          900: "#4D2320",
        },
        gold: {
          50: "#FDF9F0",
          100: "#FBF2DC",
          200: "#F5E3B3",
          300: "#ECCF85",
          400: "#E0B85A",
          500: "#C9A454",
          600: "#A8854A",
          700: "#86673A",
          800: "#644D2B",
          900: "#43341D",
        },
        cream: "#FDF7EF",
        petal: "#F9EFE8",
      },
      fontFamily: {
        display: ["var(--font-display)"],
        script: ["var(--font-script)"],
        body: ["var(--font-body)"],
      },
      animation: {
        float: "float 6s ease-in-out infinite",
        "fade-up": "fadeUp 0.8s ease-out forwards",
        "fade-in": "fadeIn 1s ease-out forwards",
        "spin-slow": "spin 20s linear infinite",
        pulse: "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-20px)" },
        },
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(30px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [],
};
export default config;
