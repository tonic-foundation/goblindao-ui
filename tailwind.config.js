const defaultTheme = require('tailwindcss/defaultTheme');
const colors = require('tailwindcss/colors');

// shut up warnings
delete colors['lightBlue'];
delete colors['warmGray'];
delete colors['trueGray'];
delete colors['coolGray'];
delete colors['blueGray'];

module.exports = {
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', ...defaultTheme.fontFamily.sans],
        brand: ['Inter', ...defaultTheme.fontFamily.sans],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      },
      colors: {
        ...colors,
        brand: {
          400: '#E53FFB',
          600: '#B332E8',
        },
        info: {
          500: '#4965f0',
        },
        success: {
          500: '#15B97E',
        },
        warning: {
          500: '#E8BB47',
        },
        danger: {
          500: '#CA3A31',
        },
      },
      borderRadius: {
        DEFAULT: '4px',
      },
      borderWidth: {
        DEFAULT: '1px',
      },
      container: {
        screens: {
          lg: '992px',
          xl: '1028px',
        },
      },
    },
  },
  plugins: [],
};
