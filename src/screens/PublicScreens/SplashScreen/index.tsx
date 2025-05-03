import Container from '@components/app-ui/Container';
import AppFastImage from '@components/atoms/AppFastImage';
import AppText from '@components/atoms/AppText';
import ASSETS from '@constants/assets';
import DeviceUtils from '@helpers/device-utils';
import {rpFont, rpHeight, rpWidth} from '@helpers/responsive-utils';
import useSplashTimeout from '@hooks/useSplashTimeout';
import {useAppNavigation} from '@navigation/hooks';
import {ROUTES} from '@navigation/route-config';
import {useAppTheme} from '@theme/theme-provider';
import React, {useEffect, useMemo} from 'react';
import {StyleSheet, View} from 'react-native';
import Animated, {
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withTiming
} from 'react-native-reanimated';

const SplashScreen = () => {
  const theme = useAppTheme();
  const styles = useMemo(() => splashScreenStyles(), []);
  const deviceHeight = DeviceUtils.WindowHeight;
  const status = useSplashTimeout();
  const navigation = useAppNavigation<ROUTES.SPLASH_SCREEN>();

  // Animated values
  const translateY = useSharedValue(-deviceHeight);

  // Entrance animation
  useEffect(() => {
    translateY.value = -deviceHeight;
    // Step 1: Animate entrance from top
    translateY.value = withTiming(0, {duration: 1000});
  }, [translateY, deviceHeight]);

  // Reverse animation and navigation
  useEffect(() => {
    if (status !== 'idle') {
      const navigationHandler = () => {
        let targetScreen = ROUTES.LOGIN_SCREEN;
        if (status === 'no-internet') {
          targetScreen = ROUTES.LOGIN_SCREEN;
        } else if (status === 'failed') {
          targetScreen = ROUTES.LOGIN_SCREEN;
        } else if (status === 'success') {
          const isLoggedIn = false; // Replace with actual login check
          targetScreen = isLoggedIn ? ROUTES.PROFILE_SCREEN : ROUTES.LOGIN_SCREEN;
        }
        navigation.reset({
          index: 0,
          routes: [{name: targetScreen}],
        });
      };

      // Reverse animation: slide back up
      translateY.value = withTiming(-deviceHeight, {duration: 1000}, () => {
        runOnJS(navigationHandler)();
      }
      );

    }
  }, [status, navigation, translateY, deviceHeight]);

  // Animated style for rotation and translation
  const animatedStyle = useAnimatedStyle(() => {
    const borderRadius = translateY.value === 0 ? 0 : 200;
    return {
      transform: [
        {translateY: translateY.value},
      ],
      borderBottomLeftRadius: borderRadius,
      borderBottomRightRadius: borderRadius,
      overflow: 'hidden',
    };
  });

  return (
    <Container>
      <Animated.View style={[styles.container, animatedStyle]}>
        <AppFastImage
          source={ASSETS.IMAGES.APP_ICON}
          style={styles.splsh_image}
        />
        <View style={styles.version}>
          <AppText
            fontSize={rpFont(10)}
            text={`v${DeviceUtils.BUILD_VERSION}(${DeviceUtils.BUILD_NUMBER})`}
            color={theme.colors.primary}
          />
        </View>
      </Animated.View>
    </Container>
  );
};

export default SplashScreen;

const splashScreenStyles = () =>
  StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'black',
    },
    version: {
      position: 'absolute',
      bottom: rpHeight(15),
      right: rpWidth(20),
    },
    splsh_image: {
      height: rpWidth(200),
      width: rpWidth(200),
      borderRadius: rpWidth(100),
    },
  });
