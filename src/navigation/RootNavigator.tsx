import useSplashTimeout from '@hooks/useSplashTimeout';
import {
  NavigationContainer,
  DarkTheme as NavigationDarkTheme,
  DefaultTheme as NavigationDefaultTheme,
} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {useAppThemeContext} from '@theme/theme-provider';
import React, {useEffect, useState} from 'react';
import {navigationRef} from './navigation-service';
import {RootStackParamList, ROUTES} from './route-config';
import AuthStackNavigator from './stack/AuthStackNavigator';
import ModalStackNavigator from './stack/ModalStackNavigator';
import ProtectedStackNavigator from './stack/ProtectedStackNavigator';
import PublicStackNavigator from './stack/PublicStackNavigator';
import {SplashScreen} from '@screens/PublicScreens';

const RootStack = createStackNavigator<RootStackParamList>();

const RootNavigator: React.FC = () => {
  const [initialRoute, setInitialRoute] = useState<keyof RootStackParamList | null>(null);
  const isSplashEnd = useSplashTimeout();
  const {currentTheme} = useAppThemeContext();
  const theme = React.useMemo(
    () =>
      currentTheme.themeType === 'dark'
        ? NavigationDarkTheme
        : NavigationDefaultTheme,
    [currentTheme.themeType] // Only recalculate when themeType changes
  );

  const isLoggedIn = false;

  /**
   * This hook will wait for the splash screen to end and then call the prepareAndSetInitalRoute function.
   * The prepareAndSetInitalRoute function will update the initial route name in the state.
   */

  useEffect(() => {
    const initialRouteName = isLoggedIn ? ROUTES.PROTECTED_STACK : ROUTES.AUTH_STACK;
    setInitialRoute(initialRouteName);
    console.log(
      `Initial Screen detected! Navigating to the ${initialRouteName} based on the user role: ${isLoggedIn ? 'User' : 'Guest'}.`
    );
  }, [isLoggedIn]);

  /**
   * If the splash screen has not ended yet, or if the initial route has not been set yet,
   * render the splash screen. Otherwise, render the main stack navigator.
   */
  if (!isSplashEnd || !initialRoute) {
    return <SplashScreen />;
  }


  return (
    <NavigationContainer ref={navigationRef} theme={theme}>
      <RootStack.Navigator
        initialRouteName={initialRoute}
        screenOptions={{headerShown: false}}
      >
        {/* Public Screens */}
        <RootStack.Screen name={ROUTES.PUBLIC_STACK} component={PublicStackNavigator} />

        {/* Protected Screens (Guard inside screen) */}
        <RootStack.Screen name={ROUTES.PROTECTED_STACK} component={ProtectedStackNavigator} />

        {/* Authentication screens */}
        <RootStack.Screen name={ROUTES.AUTH_STACK} component={AuthStackNavigator} />

        {/* Modals */}
        <RootStack.Screen name={ROUTES.MODAL_STACK} component={ModalStackNavigator} />

      </RootStack.Navigator>
    </NavigationContainer>
  );
};

export default RootNavigator;
