import {RootStackParamList} from '@navigation/route-config';
import {DrawerNavigationProp} from '@react-navigation/drawer';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';

/**
 * Generic hook to get typed Stack Navigation
 * @template T - Screen name key from RootStackParamList
 */
const useAppNavigation = <T extends keyof RootStackParamList>() => {
  return useNavigation<StackNavigationProp<RootStackParamList, T>>();
};

/**
 * Generic hook to get typed Drawer Navigation
 * @template T - Screen name key from RootStackParamList
 */
const useAppDrawerNavigation = <T extends keyof RootStackParamList>() => {
  return useNavigation<DrawerNavigationProp<RootStackParamList, T>>();
};

/**
 * Generic hook to get typed Route
 * @template T - Screen name key from RootStackParamList
 */
const useAppRoute = <T extends keyof RootStackParamList>() => {
  return useRoute<RouteProp<RootStackParamList, T>>();
};

export {
  useAppNavigation,
  useAppDrawerNavigation,
  useAppRoute,
};
