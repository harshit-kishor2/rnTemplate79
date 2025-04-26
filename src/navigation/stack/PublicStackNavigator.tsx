
import {RootStackParamList, ROUTES, SCREEN_OPTIONS} from '@navigation/route-config';
import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import {AppUpdateScreen, NetworkLogScreen, WebviewScreen} from '@screens/PublicScreens';

const PublicStack = createStackNavigator<RootStackParamList>();

const PublicStackNavigator: React.FC = () => {
  return (
    <PublicStack.Navigator
      initialRouteName={ROUTES.APP_UPDATE_SCREEN}
      screenOptions={SCREEN_OPTIONS.stack}
    >

      {/*===== All Public Stack Screens =====*/}
      <PublicStack.Screen
        name={ROUTES.APP_UPDATE_SCREEN}
        component={AppUpdateScreen}
      />
      <PublicStack.Screen
        name={ROUTES.NETWORK_LOG_SCREEN}
        component={NetworkLogScreen}
      />
      <PublicStack.Screen
        name={ROUTES.WEBVIEW_SCREEN}
        component={WebviewScreen}
      />

    </PublicStack.Navigator>
  );
};

export default PublicStackNavigator;
