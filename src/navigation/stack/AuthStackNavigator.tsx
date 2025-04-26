
import {RootStackParamList, ROUTES, SCREEN_OPTIONS} from '@navigation/route-config';
import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import {LoginScreen, RegisterScreen} from '@screens/AuthScreens';

const AuthStack = createStackNavigator<RootStackParamList>();

const AuthStackNavigator: React.FC = () => {
  return (
    <AuthStack.Navigator
      initialRouteName={ROUTES.LOGIN_SCREEN}
      screenOptions={SCREEN_OPTIONS.stack}
    >
      {/* ===== All Auth Stack Screens ===== */}
      <AuthStack.Screen
        name={ROUTES.LOGIN_SCREEN}
        component={LoginScreen}
      />
      <AuthStack.Screen
        name={ROUTES.REGISTER_SCREEN}
        component={RegisterScreen}
      />

    </AuthStack.Navigator>
  );
};

export default AuthStackNavigator;
