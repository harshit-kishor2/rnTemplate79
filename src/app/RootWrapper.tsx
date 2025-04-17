import {AppLocalizationProvider} from '@i18n/i18n-provider';
import {AppThemeProvider} from '@theme/theme-provider';
import React from 'react';
import {StyleSheet} from 'react-native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {KeyboardProvider} from 'react-native-keyboard-controller';
import {SafeAreaProvider} from 'react-native-safe-area-context';

type PropsWithChildren = {
  children: React.ReactNode;
};

//! Layout Providers Composition
const LayoutProviders: React.FC<PropsWithChildren> = ({children}) => (
  <GestureHandlerRootView style={styles.container}>
    <SafeAreaProvider style={styles.container}>
      <KeyboardProvider statusBarTranslucent>{children}</KeyboardProvider>
    </SafeAreaProvider>
  </GestureHandlerRootView>
);

//! Core Providers Composition (PortalProvider,BottomSheetModalProvider, ToastProvider, ErrorBoundary)
const CoreProviders: React.FC<PropsWithChildren> = ({children}) => (
  <>
    <>{children}</>
  </>
);

//! All Global Context Providers Composition (AppThemeProvider, AppLocalizationProvider)
const GlobalContextProviders: React.FC<PropsWithChildren> = ({children}) => (
  <AppThemeProvider autoDetect>
    <AppLocalizationProvider defaultLanguage="en">
      {children}
    </AppLocalizationProvider>
  </AppThemeProvider>
);

//! Root Wrapper Component with all Providers
const RootWrapper: React.FC<PropsWithChildren> = ({children}) => (
  <GlobalContextProviders>
    <LayoutProviders>
      <CoreProviders>{children}</CoreProviders>
    </LayoutProviders>
  </GlobalContextProviders>
);

export default RootWrapper;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
