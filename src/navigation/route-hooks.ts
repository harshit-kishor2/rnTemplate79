import {DrawerNavigationProp} from '@react-navigation/drawer';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';

import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from './route-config';

/**
 * Type-safe hook to access navigation object for stack navigation.
 * Provides autocomplete and type checking for screen names and parameters.
 *
 * @template T - Screen name key from RootStackParamList
 * @returns {StackNavigationProp<RootStackParamList, T>} Navigation prop with type safety
 *
 * @example
 * // In a screen component:
 * const navigation = useAppNavigation<'HomeRoute'>();
 * navigation.navigate('DetailRoute', { itemId: '123' });
 */
export const useAppNavigation = <
  T extends keyof RootStackParamList
>(): StackNavigationProp<RootStackParamList, T> => {
  return useNavigation<StackNavigationProp<RootStackParamList, T>>();
};

/**
 * Type-safe hook to access route parameters for the current screen.
 * Ensures proper type checking of route parameters based on screen name.
 *
 * @template T - Screen name key from RootStackParamList
 * @returns {RouteProp<RootStackParamList, T>} Route prop with type-safe parameters
 *
 * @example
 * // In a screen component expecting an 'itemId' parameter:
 * const route = useAppRoute<'HomeRoute'>();
 * const itemId = route.params.itemId; // Correctly typed as string
 */
export const useAppRoute = <T extends keyof RootStackParamList>(): RouteProp<
  RootStackParamList,
  T
> => {
  return useRoute<RouteProp<RootStackParamList, T>>();
};

/**
 * Type-safe hook to access navigation object for drawer navigation.
 * Provides autocomplete and type checking for screen names and parameters.
 *
 * @template T - Screen name key from RootStackParamList
 * @returns {DrawerNavigationProp<RootStackParamList, T>} Navigation prop with type safety
 *
 * @example
 * // In a screen component:
 * const navigation = useAppDrawerNavigation<'AppDrawerRoute'>();
 * navigation.navigate('SomeDrawerRoute', { param1: 'value' });
 */

export const useAppDrawerNavigation = <
  T extends keyof RootStackParamList
>(): DrawerNavigationProp<RootStackParamList, T> => {
  return useNavigation<DrawerNavigationProp<RootStackParamList, T>>();
};
