export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        darkBg: "#0a0a0c",
        charcoal: "#141418",
        softSlate: "#1c1c22",
        mutedSlate: "#26262e",
        accent: "#6366f1",        // soft indigo
        accentMuted: "#4f46e5",   // deeper indigo
        amber: "#d4a574",         // elegant muted amber
        amberMuted: "#b8956a",
        textPrimary: "#e4e4e7",
        textSecondary: "#a1a1aa",
        textMuted: "#71717a",
        borderSubtle: "rgba(255, 255, 255, 0.06)",
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'float-delayed': 'float 8s ease-in-out 2s infinite',
        'grain': 'grain 8s steps(10) infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        grain: {
          '0%, 100%': { transform: 'translate(0, 0)' },
          '10%': { transform: 'translate(-5%, -10%)' },
          '30%': { transform: 'translate(3%, -15%)' },
          '50%': { transform: 'translate(12%, 9%)' },
          '70%': { transform: 'translate(9%, 4%)' },
          '90%': { transform: 'translate(-1%, 7%)' },
        },
      },
    },
  },
  plugins: [],
}
