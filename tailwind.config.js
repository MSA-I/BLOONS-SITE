/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        // Warm boutique palette — "élégance en l'air"
        ink: '#211C1A',
        body: '#5A524C',
        muted: '#7A6F66',
        blush: '#BE7589',
        rose: '#D99FA9',
        roselight: '#E7B7BF',
        gold: '#9C7A33',
        goldmid: '#C9A24B',
        goldlight: '#D4AE5E',
        cream: '#FDF8F4',
        creamdeep: '#FBF1EC',
      },
      fontFamily: {
        display: ['"Frank Ruhl Libre"', 'serif'],
        body: ['Assistant', 'sans-serif'],
        accent: ['"Cormorant Garamond"', 'serif'],
      },
      transitionTimingFunction: {
        spring: 'cubic-bezier(0.16, 1, 0.3, 1)',
      },
      letterSpacing: {
        label: '0.16em',
      },
    },
  },
  plugins: [],
}
