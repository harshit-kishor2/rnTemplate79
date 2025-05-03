import {CardStyleInterpolators, StackNavigationOptions} from '@react-navigation/stack';
import {LoginScreen, RegisterScreen} from '@screens/AuthScreens';
import {FilterModal} from '@screens/ModalScreens';
import {ProfileScreen, SettingScreen} from '@screens/ProtectedScreens';
import {AppUpdateScreen, NetworkLogScreen, SplashScreen, WebviewScreen} from '@screens/PublicScreens';
import {ROUTES} from './route-config';
import withAuthGuard from './withAuthGuard';
import {Easing} from 'react-native';

// Define the screen configuration type
type ScreenConfig = {
  name: keyof typeof ROUTES; // Ensures only keys from ROUTES enum are allowed
  component: React.ComponentType<any>; // Ensures each screen is a valid React component
  options?: StackNavigationOptions; // Explicitly define options type as StackNavigationOptions
};

// Grouped screens type
type GroupedScreens = {
  groupName: string;
  options?: StackNavigationOptions; // Group level options like transition effects
  screens: ScreenConfig[]; // List of screens in this group
};


const SCREEN_OPTIONS = {
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

//! Define the grouped screens with options
export const groupedScreens: GroupedScreens[] = [
  {
    groupName: 'public',
    options: SCREEN_OPTIONS.stack, // Apply options from SCREEN_OPTIONS

    screens: [
      {
        name: ROUTES.SPLASH_SCREEN,
        component: SplashScreen,
      },
      {
        name: ROUTES.APP_UPDATE_SCREEN,
        component: AppUpdateScreen,
      },
      {
        name: ROUTES.NETWORK_LOG_SCREEN,
        component: NetworkLogScreen
      },
      {
        name: ROUTES.WEBVIEW_SCREEN,
        component: WebviewScreen
      },
    ],
  },
  {
    groupName: 'auth',
    options: SCREEN_OPTIONS.stack,
    screens: [
      {
        name: ROUTES.LOGIN_SCREEN,
        component: LoginScreen
      },
      {
        name: ROUTES.REGISTER_SCREEN,
        component: RegisterScreen
      },
    ],
  },
  {
    groupName: 'protected',
    options: SCREEN_OPTIONS.stack,
    screens: [
      // {
      //   name: ROUTES.TAB_NAVIGATOR, // TabNavigator for protected area
      //   component: TabNavigator, // Use TabNavigator for this screen
      // },
      // {
      //   name: ROUTES.DRAWER_NAVIGATOR, // DrawerNavigator for another protected area
      //   component: DrawerNavigator, // Use DrawerNavigator for this screen
      // },
      {
        name: ROUTES.SETTING_SCREEN,
        component: withAuthGuard(SettingScreen)
      },
      {
        name: ROUTES.PROFILE_SCREEN,
        component: withAuthGuard(ProfileScreen)
      },
    ],
  },
  {
    groupName: 'modal',
    options: SCREEN_OPTIONS.modal, // Use modal-specific options from SCREEN_OPTIONS
    screens: [
      {
        name: ROUTES.FILTER_MODAL,
        component: FilterModal,
        options: SCREEN_OPTIONS.modal, // Override if needed
      },
    ],
  },
];
