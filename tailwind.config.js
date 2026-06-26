/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        gold: '#D4AF6A',
        cream: '#F5ECD7',
        rose: '#E8B4A0',
        dark: '#2C1810',
        'bg-light': '#FFFDF9',
        'bg-cream': '#FAF6F0',
      },
      fontFamily: {
        heebo: ['Heebo', 'sans-serif'],
        playfair: ['Playfair Display', 'serif'],
      },
      animation: {
        'shimmer': 'shimmer 4s ease-in-out infinite',
        'float': 'float 4s ease-in-out infinite',
        'bounce-slow': 'bounce 2s infinite',
      },
      keyframes: {
        shimmer: {
          '0%': { backgroundPosition: '200% center' },
          '100%': { backgroundPosition: '-200% center' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0) rotate(0deg)' },
          '25%': { transform: 'translateY(-10px) rotate(2deg)' },
          '50%': { transform: 'translateY(-20px) rotate(0deg)' },
          '75%': { transform: 'translateY(-10px) rotate(-2deg)' },
        },
      },
      transitionTimingFunction: {
        'spring': 'cubic-bezier(0.23, 1, 0.32, 1)',
      },
      boxShadow: {
        'gold': '0 4px 20px rgba(212, 175, 106, 0.25)',
        'gold-lg': '0 8px 40px rgba(212, 175, 106, 0.35)',
      },
    },
  },
  plugins: [],
}
