// stores/appSettings/store.ts

import {create} from 'zustand';
import {persist} from 'zustand/middleware';
import {AppSettingsState, AppSettingsStateOnly} from './types';

const initialAppSettingsState: AppSettingsStateOnly = {
  accessToken: null,
  bearerToken: null,
  walkthroughEnded: false,
  firstVisit: true,
  isAuth: false,
  userInfo: null,
  notificationsEnabled: true,
  onboardingCompleted: false,
};

export const useAppSettingsStore = create<AppSettingsState>()(
  persist(
    set => ({
      ...initialAppSettingsState,
      actions: {
        setAccessToken: token => set({accessToken: token}),
        setBearerToken: token => set({bearerToken: token}),
        setWalkthroughEnded: ended => set({walkthroughEnded: ended}),
        setFirstVisit: visit => set({firstVisit: visit}),
        setIsAuth: auth => set({isAuth: auth}),
        setUserInfo: info => set({userInfo: info}),
        clearUserInfo: () => set({userInfo: null}),
        toggleNotifications: () =>
          set(state => ({
            notificationsEnabled: !state.notificationsEnabled,
          })),
        completeOnboarding: () => set({onboardingCompleted: true}),
        resetAppSettings: () => set({...initialAppSettingsState}),
      },
    }),
    {
      name: 'app-settings-store',
      partialize: state => ({
        accessToken: state.accessToken,
        bearerToken: state.bearerToken,
        walkthroughEnded: state.walkthroughEnded,
        firstVisit: state.firstVisit,
        isAuth: state.isAuth,
        userInfo: state.userInfo,
        notificationsEnabled: state.notificationsEnabled,
        onboardingCompleted: state.onboardingCompleted,
      }),
      version: 1,
    },
  ),
);
