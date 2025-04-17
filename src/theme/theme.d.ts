export {};

declare global {
  namespace ReactNativePaper {
    interface Theme {
      /**
       * Custom property added to the React Native Paper theme.
       */
      myRandomProperty: string; // Update type to match your implementation (boolean/string)
      themeType: 'light' | 'dark';
    }
  }

  // Extend the global IAppTheme type to include the light and dark themes
  type IAppTheme =
    | typeof import('./theme-config').lightTheme
    | typeof import('./theme-config').darkTheme;

  // Define supported theme selection options
  type ISelectedTheme = 'light' | 'dark' | 'auto';

  interface IAppThemeContext {
    currentTheme: IAppTheme;
    selectedThemeType: ISelectedTheme;
    setSelectedThemeType: (themeTypeProp: ISelectedTheme) => void;
    resetTheme: () => void;
  }

  interface IAppThemeProvider {
    autoDetect?: boolean;
    children: React.ReactNode;
  }
}
