/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      transitionProperty: {
        height: 'height',
      },
      fontSize: {
        '2xl': '1.563rem',
        '3xl': '2.125rem',
        '2xs': '0.625rem',
        '3xs': '0.563rem',
      },
      backgroundImage: {},
      boxShadow: {
        glow: '0px 0px 27px 5px theme("colors.purple.9a")',
      },
      colors: {
        gray: {
          13: '#131313',
          18: '#181818',
          24: '#242424',
          36: '#363636',
          42: '#424242',
          53: '#535353',
          84: '#848484',
          999: '#999999',
          ab: '#ababab',
          b7: '#b7b7b7',
          '2a': '#2A2A2A',
          e6: '#E6E6E6',
          '3a': '#3A3A3A',
          '3c': '#3c3c3c',
          '4a': '#4a4a4a',
          '20': '#202020',
          cc: '#cccccc',
          // new grays
          '80': '#808080',
          '16': '#16191E',
          '1e': '#1E2025',
          '28': '#282B2E',
          '48': '#484C57',
          '10': '#101317',
          '13': '#13161A',
        },
        orange: {
          light: '#f18333',
        },
        pink: {
          ff: '#FF6AA0',
        },
        red: {
          warning: '#DC362E',
          error: '#F04238',
        },
        tiffany: { '9e': '#9EFFFF' },
        green: {
          success: '#18CA7F',
          '92': '#92E590',
        },
        purple: {
          '9a': '#9A6AFF',
          '5f': '#5F37B6',
          '3a': '#3A246A',
        },
      },
      animation: {
        'spin-slow': 'spin 15s cubic-bezier(.45,.05,.55,.95) infinite',
      },
      dropShadow: {
        glow: [
          '0 0px 5px rgba(158, 255, 255, 0.5)',
          '0 0px 10px rgba(158, 255, 255, 0.25)',
        ],
      },
    },
    fontFamily: {
      sans: ['ABCFavorit', 'sans-serif'],
    },
  },
  plugins: [],
};
