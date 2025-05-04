// Define routes as an enum
export enum ROUTES {
  SPLASH_SCREEN = 'SPLASH_SCREEN',
  LOGIN_SCREEN = 'LOGIN_SCREEN',
  REGISTER_SCREEN = 'REGISTER_SCREEN',
  SETTING_SCREEN = 'SETTING_SCREEN',
  PROFILE_SCREEN = 'PROFILE_SCREEN',
  APP_UPDATE_SCREEN = 'APP_UPDATE_SCREEN',
  NETWORK_LOG_SCREEN = 'NETWORK_LOG_SCREEN',
  WEBVIEW_SCREEN = 'WEBVIEW_SCREEN',
  FILTER_MODAL = 'FILTER_MODAL',
}

// Define RootStackParamList with types for each route
export type RootStackParamList = {
  [ROUTES.SPLASH_SCREEN]: undefined;
  [ROUTES.LOGIN_SCREEN]: {from?: keyof RootStackParamList} | undefined;
  [ROUTES.REGISTER_SCREEN]: {from?: keyof RootStackParamList} | undefined;
  [ROUTES.SETTING_SCREEN]: {from?: keyof RootStackParamList} | undefined;
  [ROUTES.PROFILE_SCREEN]:
    | {from?: keyof RootStackParamList; userId?: string}
    | undefined;
  [ROUTES.APP_UPDATE_SCREEN]: {from?: keyof RootStackParamList} | undefined;
  [ROUTES.NETWORK_LOG_SCREEN]: {from?: keyof RootStackParamList} | undefined;
  [ROUTES.WEBVIEW_SCREEN]:
    | {from?: keyof RootStackParamList; page?: string; webUrl?: string}
    | undefined;
  [ROUTES.FILTER_MODAL]: {from?: keyof RootStackParamList} | undefined;
};
