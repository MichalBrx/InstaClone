/** @type {import('tailwindcss').Config} */ 
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {},
    colors: {
      'white': '#FFFF',
      'whi_gray': '#F2F3F5',
      'border_col': 'rgba(var(--ca6,219,219,219),1)',
      'txt_grey': '#8e8e8e',
      'fb': '#0095f6',
      'fafa': '#fafafa',
      'bg': '#FBFBFB',
      'dark_fb': '#385185;',
      'navBar': '#F5F6F7',
      'browser': 'rgba(0, 0, 0, 0.05)'
    },
    width: {
      '350': '22rem',
      '175': '11rem',
      '260': '16rem',
      '104': '6.5rem',
      '135': '8.5rem',
      '14rem':'14rem',
      '25rem': '25rem',
      '1.75rem': '1.75rem',
      '100%': '100%',
      '29.25rem': '29.25rem'

    },
    // margin: {
    //   'sm': '0.15rem',
    //   '10': '0.6rem'
    // },
    fontFamily: {
      'helve': 'Helvetica, sans-serif'
    }
  },
  plugins: [],
}