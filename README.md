Here's a clean and structured `README.md` file based on the setup instructions:

---

# React Native Project Starter Guide

Welcome to new React Native project! This guide walks you through setting up the essential folder structure, tools, packages, and best practices to kickstart development efficiently.

---

## 🚀 1. Project Initialization

Start by creating a standardized folder structure to keep code modular and maintainable.

Then, create a `README.md` file inside each relevant folder to explain its purpose and usage.

---

## ✨ 2. Path Aliasing

Enable cleaner imports using path aliases. Follow this [Gist](https://gist.github.com/harshit-kishor2/efb4fe80251282226eb575d39654ebda).

- Update `tsconfig.json`
- Update `babel.config.js`

---

## 🔍 3. ESLint + Lefthook Setup

### ESLint

Set up linting using this [Gist](https://gist.github.com/harshit-kishor2/ebd41c9781e10826c09d60658f315f89)
Check `.eslintrc` and `.eslintignore` files.

### Lefthook (Git Hooks)

Validate commit messages and run linters automatically. Follow this [Gist](https://gist.github.com/harshit-kishor2/a52b1fc5ba4cee77a4558e6d2bcbabbf)
Check `lefthook.yml` and the `.githooks` directory.

---

## 📦 4. Install Essential UI & Layout Packages

```bash
yarn add react-native-paper react-native-safe-area-context react-native-gesture-handler react-native-reanimated react-native-keyboard-controller
```

### Important Setup

- Add at the top of your entry file:

  ```js
  import 'react-native-gesture-handler';
  ```

- Update `babel.config.js`:

  ```js
  module.exports = {
    presets: [
      /* your presets */
    ],
    env: {
      production: {
        plugins: ['react-native-paper/babel'],
      },
    },
    plugins: ['react-native-reanimated/plugin'],
  };
  ```

- Wrap your app with Layout Providers:

  ```tsx
  import {GestureHandlerRootView} from 'react-native-gesture-handler';
  import {KeyboardProvider} from 'react-native-keyboard-controller';
  import {SafeAreaProvider} from 'react-native-safe-area-context';

  const LayoutProviders = ({children}) => (
    <GestureHandlerRootView style={{flex: 1}}>
      <SafeAreaProvider>
        <KeyboardProvider statusBarTranslucent>{children}</KeyboardProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
  ```

---

## 🎨 5. Theme Setup

Check the `README.md` in the `theme/` directory for setup and customization.

---

## 🌐 6. Localization

Check the `README.md` in the `i18n/` directory for internationalization setup.

---

## ⚠️ 7. Global Exception Handling

Use [`react-native-exception-handler`](https://github.com/master-atul/react-native-exception-handler).
Create a hook and call it in your entry file.

---

## 🖼️ 8. Asset Management

```bash
yarn add react-native-vector-icons react-native-fast-image lottie-react-native react-native-svg
yarn add -D @types/react-native-vector-icons react-native-svg-transformer
```

- SVGs, Images, Fonts, Lottie → See `assets/README.md`

---

## 🧰 9. Helper Utilities

Install useful utilities:

```bash
yarn add react-native-device-info react-native-iphone-screen-helper
yarn add react-native-size-matters react-native-responsive-fontsize
yarn add dayjs react-native-toast-message
```

---

## 🧩 10. Components

Install form and UI helpers:

```bash
yarn add react-hook-form zod @hookform/resolvers
yarn add @shopify/flash-list
yarn add react-native-webview
yarn add react-native-linear-gradient react-native-shimmer-placeholder
```

---

## 🧵 11. Custom Hooks

Check the `README.md` inside the `hooks/` directory.

Useful packages:

```bash
yarn add react-native-share react-native-blob-util react-native-permissions
```

---

## 🧭 12. Navigation Setup

Check the `README.md` in the `navigation/` directory.

---

## 🗃️ 13. State Management

```bash
yarn add zustand
```

Check the `README.md` in the `store/` directory.

---

## 🌐 14. Services & API

```bash
yarn add axios axios-logger
```

Set up services like `apiClient.ts` inside the `services/` directory. Check `README.md`.

---

## 🔥 15. Useful Packages

You can integrate these later:

- `react-native-network-logger`
- `fuse.js`

---

## 🌍 16. Multi-Environment Setup

Use this [Gist](https://gist.github.com/harshit-kishor2/6fff6229e43037c5b484dfcd63ca277a) to enable support for multiple flavors and environments.

---

## 🔐 17. APK Signing

Follow this guide: [Signed APK Gist](https://gist.github.com/harshit-kishor2/abfe7f4f9160d219c5ac13c5f0c6438a)

---

## ➕ Extras

```bash
yarn add @gorhom/portal @gorhom/bottom-sheet
```
