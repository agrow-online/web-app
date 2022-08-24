/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: 'jit',
  content: ['./node_modules/flowbite-react/**/*.js', './pages/**/*.{ts,tsx}', './public/**/*.html'],
  plugins: [require('flowbite/plugin'), require('flowbite-typography')],
  theme: {
    fontFamily: {
      sans: ['Figtree', 'Roboto', 'sans-serif'],
    },

    fontWeight: {
      extrabold: 700,
      normal: 500,
    },

    button: {
      background: 'red',
    },
  },
};
