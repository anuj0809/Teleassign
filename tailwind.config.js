/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{html,js,jsx,tsx}',
    './components/**/*.{html,js,jsx,tsx}'
  ],
  theme: {
    extend:
    {
      fontFamily: {
        'roboto': ['Roboto', 'sans-serif']
      },
    },
    screens: {
      'xs': "200px" ,

      'sm': '576px',
      // => @media (min-width: 576px) { ... }

      'md': '960px',
      // => @media (min-width: 960px) { ... }

      'lg': '1440px',
      // => @media (min-width: 1440px) { ... }
    },
  },
  plugins: [],
}

