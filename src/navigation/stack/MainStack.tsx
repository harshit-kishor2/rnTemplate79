
import {UserRoles} from '@constants/enum';
import useSplashTimeout from '@hooks/useSplashTimeout';
import {RootStackParamList, ROUTES} from '@navigation/route-config';
import {createStackNavigator} from '@react-navigation/stack';
import {SplashScreen, WebviewScreen} from '@screens/SharedScreens';
import React, {useCallback, useEffect, useState} from 'react';
import GuestStack from './GuestStack';
import UserStack from './UserStack';

const Stack = createStackNavigator<RootStackParamList>();

// Predefined route map for initial route determination
const roleRouteMap: Record<UserRoles, ROUTES> = {
  [UserRoles.User]: ROUTES.USER_STACK,
  [UserRoles.Guest]: ROUTES.GUEST_STACK,
};

/**
 * The main stack navigator that determines the initial route
 * based on the user's role (guest, user, admin) and navigates
 * to the corresponding route when the splash screen ends.
 *
 * The stack navigator contains all the common screens, modal
 * screens, and role-based screens. The role-based screens are
 * grouped by their respective roles and are conditionally
 * rendered based on the user's role.
 */
const MainStack: React.FC = () => {
  const [initialRoute, setInitialRoute] = useState<
    keyof RootStackParamList | null
  >(null);

  // const {userRole} = usePersistAuthStore()
  const userRole = UserRoles.User; // Mocked user role for demonstration
  /**
   * This function determines the initial route name based on the user's role.
   * It uses the predefined role route map to look up the initial route name.
   * If the user role is not found in the map, it defaults to the guest route.
   */
  const prepareAndSetInitalRoute = useCallback(() => {
    const effectiveRole = userRole ?? UserRoles.Guest;
    const initialRouteName = getInitialRouteName(effectiveRole);
    setInitialRoute(initialRouteName);
    console.log(
      `Initial Screen detected! Navigating to the ${initialRouteName} based on the user role: ${effectiveRole}.`
    );
  }, [userRole]);

  /**
   * This hook will wait for the splash screen to end and then call the prepareAndSetInitalRoute function.
   * The prepareAndSetInitalRoute function will update the initial route name in the state.
   */
  const isSplashEnd = useSplashTimeout();

  /**
   * This hook will run when the component is mounted and whenever the user role changes.
   * When the user role changes, we will call the prepareAndSetInitalRoute function to update the initial route.
   */
  useEffect(() => {
    prepareAndSetInitalRoute();
  }, [prepareAndSetInitalRoute]);

  /**
   * If the splash screen has not ended yet, or if the initial route has not been set yet,
   * render the splash screen. Otherwise, render the main stack navigator.
   */
  if (!isSplashEnd || !initialRoute) {
    return <SplashScreen />;
  }

  return (
    <Stack.Navigator
      initialRouteName={initialRoute}
      screenOptions={{headerShown: false}}>
      {userRole.includes(UserRoles.Guest) && (
        <Stack.Screen
          name={ROUTES.GUEST_STACK}
          component={GuestStack}
        />
      )}

      {userRole.includes(UserRoles.User) && (
        <Stack.Screen name={ROUTES.USER_STACK} component={UserStack} />
      )}

      <Stack.Group>
        <Stack.Screen name={ROUTES.WEBVIEW_SCREEN} component={WebviewScreen} />
      </Stack.Group>
    </Stack.Navigator>
  );
};

export default MainStack;

/**
 * Determines the initial route based on the user's role
 * @param {UserRoles} userRole - The role of the user
 * @returns {keyof RootStackParamList} - The initial route name
 */
const getInitialRouteName = (userRole: UserRoles): keyof RootStackParamList => {
  if (!roleRouteMap[userRole]) {
    console.warn(
      `⚠️ Unknown user role: ${userRole}, defaulting to LoginRoute.`
    );
    return ROUTES.LOGIN_SCREEN;
  }
  return roleRouteMap[userRole];
};
