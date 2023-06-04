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
    extend: {
      colors: {
        dark: "#242424",
        light: "rgb(224 231 255)",
        primary: "rgb(229 231 235)",
        primaryDark: "rgb(224 231 255)",
        secondary: "rgb(20 184 166)",
        secondaryDark: "rgb(165 180 252)",
        vivid: "rgb(153 246 228)",
        vividDark: "rgb(167 139 250)",
      },
      display: ["group-hover"],
      keyframes: {
        wavebash: {
          '0%': {
            opacity: 1,
            transform: 'translateX(10px)'
          },
          '20%': {
            opacity: 0.5,
            transform: 'translateX(20px)'
          },
          '40%': {
            opacity: 0,
            transform: 'translateX(30px)'
          },
          '60%': {
            opacity: 0,
          },
          '80%': {
            opacity: 0,
          },
          '100%': {
            opacity: 0,
          },
        },
        wavebashtwo: {
          '0%': {
            opacity: 0,
          },
          '20%': {
            opacity: 0,
          },
          '40%': {
            opacity: 0.5,
            transform: 'translateX(10px)'
          },
          '60%': {
            opacity: 1,
            transform: 'translateX(20px)'
          },
          '80%': {
            opacity: 1,
            transform: 'translateX(30px)'
          },
          '100%': {
            opacity: 0,
            transform: 'translateX(30px)'
          },
        },

        wavetilt: {
          '0%': {
            transform: 'rotate(0deg)'
          },
          '20%': {
            transform: 'rotate(0deg)'
          },
          '40%': {
            transform: 'rotate(0deg)'
          },
          '60%': {
            transform: 'rotate(0deg)'
          },
          '80%': {
            transform: 'rotate(0deg)'
          },
          '100%': {
            transform: 'rotate(45deg)'
          },
        },
      },
      animation: {
        'spin-slow': 'spin 2s linear infinite',
        'bash': 'wavebash 2s linear infinite',
        'bashtwo': 'wavebashtwo 2s linear infinite',
        'tilt': 'wavetilt 2s linear infinite',
      }
    },
  },
  plugins: [],
}