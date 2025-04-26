
import {RootStackParamList, ROUTES, SCREEN_OPTIONS} from '@navigation/route-config';
import {
  createStackNavigator
} from '@react-navigation/stack';
import React from 'react';
import {ProfileScreen, SettingScreen} from '@screens/ProtectedScreens';

const ProtectedStack = createStackNavigator<RootStackParamList>();

const ProtectedStackNavigator: React.FC = () => {
  return (
    <ProtectedStack.Navigator
      initialRouteName={ROUTES.PROFILE_SCREEN}
      screenOptions={SCREEN_OPTIONS.stack}
    >
      {/*===== All Protected Stack Screens here =====*/}
      <ProtectedStack.Screen
        name={ROUTES.SETTING_SCREEN}
        component={SettingScreen}
      />
      <ProtectedStack.Screen
        name={ROUTES.PROFILE_SCREEN}
        component={ProfileScreen}
      // options={{
      //   gestureEnabled: true,
      //   gestureDirection: 'horizontal-inverted',
      //   cardStyleInterpolator:
      //     CardStyleInterpolators.forHorizontalIOS,
      // }}
      />
    </ProtectedStack.Navigator>
  );
};

export default ProtectedStackNavigator;
