import {
  CardStyleInterpolators,
  StackNavigationOptions,
} from '@react-navigation/stack';

export const SCREEN_OPTIONS = {
  stack: {
    headerShown: false,
    cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
  } as StackNavigationOptions,
  modal: {
    presentation: 'modal',
    headerShown: false,
    gestureEnabled: true,
    gestureDirection: 'vertical',
    cardStyleInterpolator: CardStyleInterpolators.forVerticalIOS,
  } as StackNavigationOptions,
};

export enum ROUTES {
  SPLASH_SCREEN = 'SPLASH_SCREEN',

  // Auth Stack Navigator
  AUTH_STACK = 'AUTH_STACK',
  LOGIN_SCREEN = 'LOGIN_SCREEN',
  REGISTER_SCREEN = 'REGISTER_SCREEN',

  // Protected Stack Navigator
  PROTECTED_STACK = 'PROTECTED_STACK',
  SETTING_SCREEN = 'SETTING_SCREEN',
  PROFILE_SCREEN = 'PROFILE_SCREEN',

  // Public Stack Navigator
  PUBLIC_STACK = 'PUBLIC_STACK',
  APP_UPDATE_SCREEN = 'APP_UPDATE_SCREEN',
  NETWORK_LOG_SCREEN = 'NETWORK_LOG_SCREEN',
  WEBVIEW_SCREEN = 'WEBVIEW_SCREEN',

  // Modal Stack Navigator
  MODAL_STACK = 'MODAL_STACK',
  FILTER_MODAL = 'FILTER_MODAL',

}

//  All Screen Route
export type RootStackParamList = {

  [ROUTES.SPLASH_SCREEN]: undefined;

  // Auth Stack Navigator
  [ROUTES.AUTH_STACK]: undefined;
  [ROUTES.LOGIN_SCREEN]: {from?: keyof RootStackParamList;} | undefined;
  [ROUTES.REGISTER_SCREEN]: {from?: keyof RootStackParamList;} | undefined;

  // Protected Stack Navigator
  [ROUTES.PROTECTED_STACK]: undefined;
  [ROUTES.SETTING_SCREEN]: {from?: keyof RootStackParamList;} | undefined;
  [ROUTES.PROFILE_SCREEN]: {from?: keyof RootStackParamList;} | undefined;

  // Public Stack Navigator
  [ROUTES.PUBLIC_STACK]: undefined;
  [ROUTES.APP_UPDATE_SCREEN]: {from?: keyof RootStackParamList;} | undefined;
  [ROUTES.NETWORK_LOG_SCREEN]: {from?: keyof RootStackParamList;} | undefined;
  [ROUTES.WEBVIEW_SCREEN]: {from?: keyof RootStackParamList;} | undefined;

  // Modal Stack Navigator
  [ROUTES.MODAL_STACK]: undefined;
  [ROUTES.FILTER_MODAL]: {from?: keyof RootStackParamList;} | undefined;
};
