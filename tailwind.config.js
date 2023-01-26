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
        'alice-blue': {
          500: '#F4F5F6',
        },
        brand: {
          400: '#E53FFB',
          600: '#B332E8',
        },
        'deep-blue': {
          800: '#060521',
          900: '#05041A',
        },
        'dark-gray': {
          500: '#3B3B3B',
          800: '#171717',
          900: '#111111',
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
        up: {
          DEFAULT: colors.emerald[300],
          light: colors.emerald[100],
          dark: colors.emerald[400],
          extraDark: colors.emerald[500],
        },
        down: {
          DEFAULT: colors.red[400],
          light: colors.red[200],
          dark: colors.red[500],
          extraDark: colors.red[600],
        },
      },
      borderRadius: {
        DEFAULT: '4px',
      },
      borderWidth: {
        DEFAULT: '1.5px',
      },
    },
  },
  plugins: [],
};
