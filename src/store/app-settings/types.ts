// stores/appSettings/types.ts

export type UserInfo = {
  id: string;
  name: string;
  email: string;
  // Extend with other user info fields
};

export type AppSettingsStateOnly = {
  accessToken: string | null;
  bearerToken: string | null;
  walkthroughEnded: boolean;
  firstVisit: boolean;
  isAuth: boolean;
  userInfo: UserInfo | null;
  notificationsEnabled: boolean;
  onboardingCompleted: boolean;
};

export type AppSettingsActions = {
  setAccessToken: (token: string | null) => void;
  setBearerToken: (token: string | null) => void;
  setWalkthroughEnded: (ended: boolean) => void;
  setFirstVisit: (visit: boolean) => void;
  setIsAuth: (auth: boolean) => void;
  setUserInfo: (info: UserInfo | null) => void;
  clearUserInfo: () => void;
  toggleNotifications: () => void;
  completeOnboarding: () => void;
  resetAppSettings: () => void;
};

export type AppSettingsState = AppSettingsStateOnly & {
  actions: AppSettingsActions;
};
