import {RootStackParamList, ROUTES} from '@navigation/route-config';
import {groupedScreens} from '@navigation/screens';
import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';

// Create a stack navigator with the RootStackParamList type
const RootStack = createStackNavigator<RootStackParamList>();

const RootNavigator = () => {
  return (
    <RootStack.Navigator
      initialRouteName={ROUTES.SPLASH_SCREEN}
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

export default RootNavigator;

