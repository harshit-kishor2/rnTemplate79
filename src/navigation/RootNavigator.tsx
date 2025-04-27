import {
  NavigationContainer,
  DarkTheme as NavigationDarkTheme,
  DefaultTheme as NavigationDefaultTheme,
} from '@react-navigation/native';
import {useAppThemeContext} from '@theme/theme-provider';
import React, {useMemo} from 'react';
import {navigationRef} from './navigation-service';
import MainStack from './stacks/MainStack';


const RootNavigator = () => {

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
      <MainStack />
    </NavigationContainer>
  );
};

export default RootNavigator;
