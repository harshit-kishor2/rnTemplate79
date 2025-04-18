
import {RootStackParamList, ROUTES} from '@navigation/route-config';
import {createStackNavigator} from '@react-navigation/stack';
import {LoginScreen, RegisterScreen} from '@screens/GuestScreens';
import React from 'react';

const Stack = createStackNavigator<RootStackParamList>();

const GuestStack: React.FC = () => {
  return (
    <Stack.Navigator
      initialRouteName={ROUTES.LOGIN_SCREEN}
      screenOptions={{headerShown: false}}>
      {/*===== All Guest Stack Screens =====*/}
      <Stack.Screen
        name={ROUTES.LOGIN_SCREEN}
        component={LoginScreen}
      />
      <Stack.Screen
        name={ROUTES.REGISTER_SCREEN}
        component={RegisterScreen}
      />

    </Stack.Navigator>
  );
};

export default GuestStack;
