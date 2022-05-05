module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['.'],
        extensions: [
          '.ios.ts',
          '.android.ts',
          '.ts',
          '.ios.tsx',
          '.android.tsx',
          '.tsx',
          '.jsx',
          '.js',
          '.json',
          '.png',
          '.jpeg',
        ],
        alias: {
          '@config': './src/config',
          '@screens': './src/screens',
          '@assets': './src/assets',
          '@context': './src/context',
          '@navigation': './src/navigation',
        },
      },
    ],
  ],
};
