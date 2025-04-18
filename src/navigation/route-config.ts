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

  MAIN_STACK = 'MAIN_STACK',
  GUEST_STACK = 'GUEST_STACK',
  USER_STACK = 'USER_STACK',
  SPLASH_SCREEN = 'SPLASH_SCREEN',

  // Auth routes
  LOGIN_SCREEN = 'LOGIN_SCREEN',
  REGISTER_SCREEN = 'REGISTER_SCREEN',

  DRAWER = 'DRAWER',
  BOTTOM_TAB = 'BOTTOM_TAB',

  HOME_TAB = 'HOME_TAB',
  HOME_SCREEN = 'HOME_SCREEN',

  SETTING_TAB = 'SETTING_TAB',
  SETTING_SCREEN = 'SETTING_SCREEN',

  PROFILE_TAB = 'PROFILE_TAB',
  PROFILE_SCREEN = 'PROFILE_SCREEN',

  NETWORK_LOGGER = 'NETWORK_LOGGER',

  // Common routes
  WEBVIEW_SCREEN = 'WEBVIEW_SCREEN',

  // Add modal routes here
  FILTER_MODAL = 'FILTER_MODAL',

  // Add all other routes here
}

//  All Screen Route
export type RootStackParamList = {
  [ROUTES.MAIN_STACK]: undefined;
  [ROUTES.GUEST_STACK]: undefined;
  [ROUTES.USER_STACK]: undefined;
  [ROUTES.SPLASH_SCREEN]: undefined;

  // Auth routes
  [ROUTES.LOGIN_SCREEN]: {from?: keyof RootStackParamList;} | undefined;
  [ROUTES.REGISTER_SCREEN]: {from?: keyof RootStackParamList;} | undefined;

  [ROUTES.DRAWER]: undefined;
  [ROUTES.BOTTOM_TAB]: {from?: keyof RootStackParamList;} | undefined;

  [ROUTES.HOME_TAB]: undefined;
  [ROUTES.HOME_SCREEN]: {from?: keyof RootStackParamList;} | undefined;

  [ROUTES.SETTING_TAB]: undefined;
  [ROUTES.SETTING_SCREEN]: {from?: keyof RootStackParamList;} | undefined;

  [ROUTES.PROFILE_TAB]: undefined;
  [ROUTES.PROFILE_SCREEN]: {from?: keyof RootStackParamList;} | undefined;

  [ROUTES.NETWORK_LOGGER]:
  | {from?: keyof RootStackParamList;}
  | undefined;

  // Common routes
  [ROUTES.WEBVIEW_SCREEN]:
  | {webUrl?: string; from?: keyof RootStackParamList; page?: IWebViewPages;}
  | undefined;

  // Add modal routes here
  [ROUTES.FILTER_MODAL]: {from?: keyof RootStackParamList;} | undefined;
};
