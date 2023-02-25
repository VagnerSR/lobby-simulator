/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",

    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    fontFamily: {
      sans: ['Inter', 'sans-serif']
    },
    extend: {
      display: ["group-hover"],
      keyframes: {
        wave: {
          '0%': { transform: 'translateX(3px)' },
          '30%': { transform: 'translateX(6px)' },
          '60%': { transform: 'translateX(9px)' },
          '100%': { transform: 'translateX(10px)' },
        },
      },
      animation: {
        'spin-slow': 'spin 2s linear infinite',
        'bash': 'wave 1s linear infinite',
      }
    },
  },
  plugins: [],
}