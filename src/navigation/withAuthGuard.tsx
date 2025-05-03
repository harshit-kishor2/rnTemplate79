import React, {useEffect} from 'react';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {Text} from 'react-native';
import {RootStackParamList, ROUTES} from './route-config';
import {delay} from '@helpers/utils';

// Define navigation prop type
type NavigationProp = StackNavigationProp<RootStackParamList>;

// Higher Order Component (HOC) for protecting routes
const withAuthGuard = (WrappedComponent: React.FC) => {
  return (props: any) => {
    const isLoggedIn = false; // Replace with actual auth state
    const navigation = useNavigation<NavigationProp>();

    useEffect(() => {
      console.log('useEffect: Checking auth state');
      if (!isLoggedIn) {
        console.log('Navigating to:', ROUTES.LOGIN_SCREEN);
        delay(1000).then(() => {
          navigation.navigate(ROUTES.LOGIN_SCREEN);
        });
      }
    }, [isLoggedIn, navigation, props.route?.name]);

    if (!isLoggedIn) {
      return <Text>Redirecting to login...</Text>;
    }

    return <WrappedComponent {...props} />;
  };
};

export default withAuthGuard;
