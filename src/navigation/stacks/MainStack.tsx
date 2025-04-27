import useSplashTimeout from '@hooks/useSplashTimeout';
import {RootStackParamList, ROUTES} from '@navigation/route-config';
import {groupedScreens} from '@navigation/screens';
import {createStackNavigator} from '@react-navigation/stack';
import {SplashScreen} from '@screens/PublicScreens';
import React, {useEffect, useState} from 'react';

// Create a stack navigator with the RootStackParamList type
const RootStack = createStackNavigator<RootStackParamList>();

const MainStack = () => {
  const [initialRoute, setInitialRoute] = useState<keyof RootStackParamList | null>(null);
  const isSplashEnd = useSplashTimeout();

  //! Replace with actual login check logic
  const isLoggedIn = true;

  useEffect(() => {
    const initialRouteName = isLoggedIn ? ROUTES.PROFILE_SCREEN : ROUTES.LOGIN_SCREEN;
    setInitialRoute(initialRouteName);
    console.log(`Initial route set to: ${initialRouteName}`);
  }, [isLoggedIn]);

  if (!isSplashEnd || !initialRoute) {
    return <SplashScreen />;
  }
  return (
    <RootStack.Navigator
      initialRouteName={initialRoute}
      screenOptions={{headerShown: false}}
    >
      {
        groupedScreens.map(({groupName, options: groupOptions, screens}) => (
          <RootStack.Group
            key={groupName}
            screenOptions={groupOptions}
          >
            {
              screens.map(({name, component, options: screenOptions}) => (
                <RootStack.Screen
                  key={name}
                  name={name as keyof RootStackParamList}
                  component={component}
                  options={screenOptions}
                />
              ))
            }
          </RootStack.Group>
        ))
      }
    </RootStack.Navigator>
  );
};

export default MainStack;

