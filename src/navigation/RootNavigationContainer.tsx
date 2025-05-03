import {
  NavigationContainer,
  DarkTheme as NavigationDarkTheme,
  DefaultTheme as NavigationDefaultTheme,
} from '@react-navigation/native';
import {useAppThemeContext} from '@theme/theme-provider';
import React, {useMemo} from 'react';
import {navigationRef} from './navigation-service';
import RootNavigator from './RootNavigator';


const RootNavigationContainer = () => {

  const {currentTheme} = useAppThemeContext();

  const theme = useMemo(
    () => (currentTheme.themeType === 'dark' ? NavigationDarkTheme : NavigationDefaultTheme),
    [currentTheme.themeType]
  );


  return (
    <NavigationContainer
      ref={navigationRef}
      theme={theme}
    >
      <RootNavigator />
    </NavigationContainer>
  );
};

export default RootNavigationContainer;
