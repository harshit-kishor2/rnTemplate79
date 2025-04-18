
import {RootStackParamList, ROUTES} from '@navigation/route-config';
import {
  createStackNavigator
} from '@react-navigation/stack';
import {HomeScreen, ProfileScreen} from '@screens/AuthScreens';
import React from 'react';
const Stack = createStackNavigator<RootStackParamList>();

const UserStack: React.FC = () => {

  return (
    <Stack.Navigator
      initialRouteName={ROUTES.HOME_SCREEN}
      screenOptions={{headerShown: false}}>
      {/*===== All Stack Screens here =====*/}
      <Stack.Screen
        name={ROUTES.HOME_SCREEN}
        component={HomeScreen}
      />
      <Stack.Screen
        name={ROUTES.PROFILE_SCREEN}
        component={ProfileScreen}
      // options={{
      //   gestureEnabled: true,
      //   gestureDirection: 'horizontal-inverted',
      //   cardStyleInterpolator:
      //     CardStyleInterpolators.forHorizontalIOS,
      // }}
      />
    </Stack.Navigator>
  );
};

export default UserStack;
