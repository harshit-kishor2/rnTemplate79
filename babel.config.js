module.exports = {
  presets: ['module:@react-native/babel-preset'],
  env: {
    production: {
      plugins: ['react-native-paper/babel'],
    },
  },
  plugins: [
    //  module-resolver
    [
      'module-resolver',
      {
        root: ['./'],
        alias: {
          '@assets': './assets',
          '@components': './src/components',
          '@constants': './src/constants',
          '@helpers': './src/helpers',
          '@hooks': './src/hooks',
          '@i18n': './src/i18n',
          '@navigation': './src/navigation',
          '@screens': './src/screens',
          '@store': './src/store',
          '@theme': './src/theme',
          '@type': './types',
        },
      },
    ],

    // Reanimated plugin has to be listed last after all other plugins
    'react-native-reanimated/plugin',
  ],
};
