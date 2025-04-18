import {
  CommonActions,
  createNavigationContainerRef,
  NavigationState,
  PartialState,
  StackActions,
  TabActions,
} from '@react-navigation/native';
import {RootStackParamList} from './route-config';


/**
 * Navigation container reference used for top-level navigation actions.
 * Should be passed to the NavigationContainer component.
 */
export const navigationRef = createNavigationContainerRef<RootStackParamList>();

/**
 * Checks if the navigation container is ready and logs a warning if not.
 * @returns {boolean} True if navigation is ready, false otherwise
 */
function checkNavigationReady(): boolean {
  const isReady = navigationRef.isReady();
  if (!isReady) console.warn('Navigation service not initialized');
  return isReady;
}

/**
 * Navigate to a screen in the current navigation tree.
 * @template T - Screen name from RootStackParamList
 * @param {T} screen - Name of the screen to navigate to
 * @param {RootStackParamList[T]} [params] - Screen parameters
 */
function navigate<T extends keyof RootStackParamList>(
  ...args: T extends unknown
    ? undefined extends RootStackParamList[T]
    ? [screen: T] | [screen: T, params: RootStackParamList[T]]
    : [screen: T, params: RootStackParamList[T]]
    : never
) {
  if (navigationRef.isReady()) {
    navigationRef.navigate(...args);
  }
}

/**
 * Navigate back to the previous screen in the stack.
 * Fails gracefully if there's no navigation history.
 */
function goBack() {
  if (checkNavigationReady() && navigationRef.canGoBack()) {
    navigationRef.goBack();
  } else {
    console.warn('Cannot go back - no available navigation history');
  }
}

/**
 * Stack navigation actions.
 */
const stackActions = {
  /**
   * Push a new screen onto the stack.
   * @template T - Screen name from RootStackParamList
   * @param {T} screen - Screen name to push
   * @param {RootStackParamList[T]} params - Screen parameters
   */
  push<T extends keyof RootStackParamList>(
    routeName: T,
    params: RootStackParamList[T]
  ) {
    if (checkNavigationReady()) {
      navigationRef.dispatch(StackActions.push(routeName, params));
    }
  },

  /**
   * Pop screens from the stack.
   * @param {number} [count=1] - Number of screens to pop
   */
  pop(count: number = 1) {
    if (checkNavigationReady()) {
      navigationRef.dispatch(StackActions.pop(count));
    }
  },

  /**
   * Pop all screens except the first in the stack.
   */
  popToTop() {
    if (checkNavigationReady()) {
      navigationRef.dispatch(StackActions.popToTop());
    }
  },

  /**
   * Replace the current screen with a new one.
   * @template T - Screen name from RootStackParamList
   * @param {T} routeName The name of the screen to replace with.
   * @param {RootStackParamList[T]} [params] The params to pass to the new screen.
   */
  replace<T extends keyof RootStackParamList>(
    routeName: T,
    params: RootStackParamList[T]
  ) {
    if (checkNavigationReady()) {
      navigationRef.dispatch(StackActions.replace(routeName, params));
    }
  },
};

/**
 * Tab navigation actions.
 */
const tabActions = {
  /**
   * Jump to the specified tab.
   * @template T - Screen name from RootStackParamList
   * @param {T} routeName The name of the tab to jump to.
   * @param {RootStackParamList[T]} [params] The params to pass to the tab.
   */
  jumpTo<T extends keyof RootStackParamList>(
    routeName: T,
    params?: RootStackParamList[T]
  ) {
    if (checkNavigationReady()) {
      navigationRef.dispatch(TabActions.jumpTo(routeName, params));
    }
  },
};

/**
 * State management functions.
 */
const stateActions = {
  /**
   * Reset the navigation state completely.
   * @param {PartialState<NavigationState>} state - New navigation state
   */
  reset(state: PartialState<NavigationState>) {
    if (checkNavigationReady()) {
      navigationRef.reset(state);
    }
  },

  /**
   * Navigate to the specified screen and reset the navigation state.
   * @param {T} routeName The name of the screen to navigate to.
   * @param {RootStackParamList[T]} [params] The params to pass to the screen.
   */
  navigateAndReset<T extends keyof RootStackParamList>(
    routeName: T,
    params: RootStackParamList[T]
  ) {
    if (checkNavigationReady()) {
      navigationRef.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{name: routeName, params}],
        })
      );
    }
  },

  /**
   * Reset the root navigation state (use cautiously).
   * @param {PartialState<NavigationState>} [state] - Optional initial state
   * @default { index: 0, routes: [] } - Empty navigation state
   */
  resetRoot(
    state: PartialState<NavigationState> = {index: 0, routes: []}
  ): void {
    if (checkNavigationReady()) {
      navigationRef.resetRoot(state);
    }
  },
};

const NavigationService = {
  navigate,
  goBack,
  ...stackActions,
  ...tabActions,
  ...stateActions,
};

export default NavigationService;
