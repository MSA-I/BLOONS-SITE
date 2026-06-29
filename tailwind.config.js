/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        ivory: '#F7F2EA',
        pearl: '#EFE7DA',
        sand: '#E4D8C5',
        ink: '#1C1612',
        noir: '#0B0908',
        gold: '#C9A96E',
        goldlight: '#E8C98B',
        rose: '#D9A6A0',
        muted: '#8A7E70',
      },
      fontFamily: {
        display: ['"Frank Ruhl Libre"', 'serif'],
        body: ['Assistant', 'sans-serif'],
      },
      transitionTimingFunction: {
        spring: 'cubic-bezier(0.32, 0.72, 0, 1)',
      },
      backgroundImage: {
        foil: 'linear-gradient(105deg, #C9A96E, #E8C98B, #C9A96E)',
      },
      letterSpacing: {
        label: '0.22em',
      },
    },
  },
  plugins: [],
}
