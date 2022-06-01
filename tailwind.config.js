const {WINDOW_HEIGHT, WINDOW_WIDTH} = require('src/config/constants');
const plugin = require('tailwindcss/plugin');

module.exports = {
  content: ['./input.css'],
  theme: {
    screens: {
      sm: WINDOW_WIDTH < 650,
      md: WINDOW_WIDTH > 750,
      lg: WINDOW_WIDTH > 850,
    },
    extend: {
      colors: {
        orange: '#F26430',
        appBackgroundColor: '#F6F5F5',
        red: '#FF1643',
      },
    },
  },
  plugins: [
    plugin(({addUtilities}) => {
      addUtilities({
        'row-center-center': {
          alignItems: 'center',
          flexDirection: 'row',
          justifyContent: 'center',
        },
        'row-center-around': {
          alignItems: 'center',
          flexDirection: 'row',
          justifyContent: 'space-around',
        },
        'row-start-start': {
          alignItems: 'flex-start',
          flexDirection: 'row',
          justifyContent: 'flex-start',
        },
        'col-center-start': {
          alignItems: 'center',
          justifyContent: 'flex-start',
          flexDirection: 'column',
        },
        'col-center-center': {
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'column',
        },
        'col-start-center': {
          alignItems: 'flex-start',
          justifyContent: 'center',
          flexDirection: 'column',
        },
        'row-center-start': {
          alignItems: 'center',
          justifyContent: 'flex-start',
          flexDirection: 'row',
        },
        'row-center-between': {
          alignItems: 'center',
          flexDirection: 'row',
          justifyContent: 'space-between',
        },
        'h/50': {
          height: WINDOW_HEIGHT / 2,
        },
        'w/100': {
          width: WINDOW_WIDTH,
        },
        'rounded-4xl': {
          borderRadius: 32,
        },
        'rounded-5xl': {
          borderRadius: 40,
        },
      });
    }),
  ],
  corePlugins: require('tailwind-rn/unsupported-core-plugins'),
};
