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
      dropShadow: {
        '3xl': '0 35px 35px rgba(0, 0, 0, 0.25)',
        '4xl': [
          '0 35px 35px rgba(0, 0, 0, 0.25)',
          '0 45px 65px rgba(0, 0, 0, 0.15)',
        ],
      },
      colors: {
        primary: {
          dark: '#E5E2B9',
          default: '#FEFBD8',
          light: '#FFFEEC',
        },
        secondary: {
          dark: '#E6D7BD',
          default: '#FFF3DA',
          light: '#FFF9ED',
        },

        contrastText: {
          secondary: '#FBFAF5',
          primary: '#2C2A29',
        },
        // primary: '#A62639',
        accent: {
          secondary: '#F1DDE2',
          primary: '#74293D',
        },
        highlight: {
          dark: '#CBBBAA ',
          light: '#F3EAE2 ',
          default: '#E4D3C3',
        },
      },
      // colors: {
      //   primary: {
      //     dark: '#F29F58',
      //     default: '#FAF9F6',
      //     accent: '#1B1833',
      //   },
      //   button: {
      //     secondary: '#1B1833',
      //     primary: '#441752',
      //   },
      // },
    },
  },
  plugins: [],
};
