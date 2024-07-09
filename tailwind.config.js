/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontSize: {
        md: ['0.95rem', { lineHeight: '1.25rem' }],
      },
      fontFamily: {
        nunito: ['Nunito Sans'],
        dancingScript: ['Dancing Script'],
        greatVibes: ['Great Vibes'],
        roboto: ['Roboto'],
      },
    },
  },
  plugins: [],
};
