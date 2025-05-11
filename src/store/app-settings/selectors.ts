// stores/appSettings/selectors.ts

import {useAppSettingsStore} from './store';
import {AppSettingsActions, AppSettingsStateOnly} from './types';

// Read-only state selector
export const useAppSettingsSelector = (): AppSettingsStateOnly =>
  useAppSettingsStore(state => ({
    accessToken: state.accessToken,
    bearerToken: state.bearerToken,
    walkthroughEnded: state.walkthroughEnded,
    firstVisit: state.firstVisit,
    isAuth: state.isAuth,
    userInfo: state.userInfo,
    notificationsEnabled: state.notificationsEnabled,
    onboardingCompleted: state.onboardingCompleted,
  }));

// Dispatch-only action selector
export const useAppSettingsActions = (): AppSettingsActions =>
  useAppSettingsStore(state => state.actions);
