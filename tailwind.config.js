/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        silk: {
          950: "#09090b",
          900: "#121216",
          850: "#18181f",
          800: "#22222a",
          700: "#32323e",
          600: "#4b4b5c",
          500: "#73738c",
          400: "#9d9db5",
          300: "#c7c7d9",
          200: "#e4e4ee",
          100: "#f3f3f8",
        },
        accent: {
          classic: "#7928ca",
          ember: "#f97316",
          vamp: "#ec4899",
          neon: "#00f0ff",
        },
      },
      fontFamily: {
        sans: ["Inter", "-apple-system", "BlinkMacSystemFont", "Segoe UI", "sans-serif"],
        mono: ["JetBrains Mono", "Fira Code", "Consolas", "monospace"],
      },
      animation: {
        'pulse-subtle': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'shimmer': 'shimmer 2.5s infinite linear',
      },
      keyframes: {
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },
    },
  },
  plugins: [],
}

