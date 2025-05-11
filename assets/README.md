# Assets

This folder contains all static assets for the project such as images, fonts, icons, and any other media files. Organize the assets in subfolders for easier access and management.

### Subfolders:

1. #### **launcher-icon** -

This subfolder contains the application's icons. These icons are used for the app's launcher icon, notification icons, and any other icons that represent the app.

To generate the app icon, run this command:

```sh
 npx rn-ml appicon -s assets/launcher-icon/app.png
```

Check here for react native launch screen update guide
https://hybridheroes.de/blog/react-native-splash-screen/

2. #### **fonts** -

This subfolder contains all custom font files used in the application. Ensure to include the font files in various formats (e.g., .ttf, .otf) for compatibility across different platforms.

**Add Custom Fonts And Vector Icons**

```javascript
yarn add react-native-vector-icons
yarn add -D @types/react-native-vector-icons
```

Check here for react native vector icon installation guide
https://github.com/oblador/react-native-vector-icons#installation

Check here for custom fonts installation
https://medium.com/@harshitkishor2/harnessing-custom-fonts-in-your-react-native-project-5ae98fbaa98c

Add this file in root directory -`react-native.config.js`

    module.exports = {
        project: {
            ios: {},
            android: {}, // grouped into "project"
        },
        assets: ["./src/assets/fonts/"], // stays the same
        dependencies: {
            'react-native-vector-icons': {
                platforms: {
                    ios: null,
                },
            },
        },
    };

then run `npx react-native-asset` for linking custom fonts.

3. #### **images** -

This subfolder contains image files used in the application. Organize images into further subfolders if needed (e.g., backgrounds, logos, buttons).

For Images and gif we use `react-native-fast-image` where beneficial, enhancing performance especially with larger images or gifs

```javascript
yarn add react-native-fast-image
```

4. #### **animations**

This subfolder contains Lottie animation files (.json) and GIF files. These animations can be used to add dynamic and visually appealing effects to the app.

For Lottie files we use `lottie-react-native`

    yarn add lottie-react-native

Use Custom Component For better performance created under component folder.

5. #### **svg**

This subfolder contains SVG files. SVG (Scalable Vector Graphics) files are used for vector images that can scale without losing quality.

**Svg Installation - **

    yarn add react-native-svg
    yarn add -D react-native-svg-transformer

`Update metro.config.js`

```javascript
const {getDefaultConfig, mergeConfig} = require('@react-native/metro-config');

const defaultConfig = getDefaultConfig(__dirname);
const {assetExts, sourceExts} = defaultConfig.resolver;

/**
 * Metro configuration
 * https://facebook.github.io/metro/docs/configuration
 *
 * @type {import('metro-config').MetroConfig}
 */
const config = {
  transformer: {
    babelTransformerPath: require.resolve('react-native-svg-transformer'),
  },
  resolver: {
    assetExts: assetExts.filter(ext => ext !== 'svg'),
    sourceExts: [...sourceExts, 'svg'],
  },
};

module.exports = mergeConfig(defaultConfig, config);
```

If you are using TypeScript, you need to add this to your declarations.d.ts file (create one if you don't have one already):

```javascript
declare module "*.svg" {
  import React from "react";
  import { SvgProps } from "react-native-svg";
  const content: React.FC<SvgProps>;
  export default content;
}
```

### Example structure:

    assets/
      launcher-icon/
        app.png
      fonts/
        Handlee-Regular.ttf
      images/
        person.png
        backgrounds/
          background1.png
      animations`/
        congrats.json
        loading.gif
      svg/
        login.svg
