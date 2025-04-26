import {DrawerNavigationProp} from '@react-navigation/drawer';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from './route-config';

/**
 * Generic hook to get typed Stack Navigation
 * @template T - Screen name key from RootStackParamList
 */
export const useAppNavigation = <T extends keyof RootStackParamList>() => {
  return useNavigation<StackNavigationProp<RootStackParamList, T>>();
};

/**
 * Generic hook to get typed Drawer Navigation
 * @template T - Screen name key from RootStackParamList
 */
export const useAppDrawerNavigation = <T extends keyof RootStackParamList>() => {
  return useNavigation<DrawerNavigationProp<RootStackParamList, T>>();
};

/**
 * Generic hook to get typed Route
 * @template T - Screen name key from RootStackParamList
 */
export const useAppRoute = <T extends keyof RootStackParamList>() => {
  return useRoute<RouteProp<RootStackParamList, T>>();
};
