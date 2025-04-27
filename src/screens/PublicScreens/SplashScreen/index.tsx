
import Container from '@components/app-ui/Container';
import AppFastImage from '@components/atoms/AppFastImage';
import AppText from '@components/atoms/AppText';
import ASSETS from '@constants/assets';
import DeviceUtils from '@helpers/device-utils';
import {rpFont, rpHeight, rpWidth} from '@helpers/responsive-utils';
import {useAppTheme} from '@theme/theme-provider';
import React, {useMemo} from 'react';
import {StyleSheet, View} from 'react-native';
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';

const SplashScreen = () => {
  const theme = useAppTheme();
  const styles = useMemo(() => splashScreenStyles(), []);

  // Animated values
  const rotateValue = useSharedValue(0);
  const scaleValue = useSharedValue(1);

  React.useEffect(() => {
    rotateValue.value = withRepeat(
      withTiming(360, {duration: 2000, easing: Easing.linear}),
      -1,
      false
    );
    scaleValue.value = withRepeat(withTiming(1.2, {duration: 1000}), -1, true);
  }, [rotateValue, scaleValue]);

  // Animated style for rotation
  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {rotate: `${rotateValue.value}deg`},
        {scale: scaleValue.value},
      ],
    };
  });

  return (
    <Container style={styles.container}>
      <Animated.View style={[animatedStyle]}>
        <AppFastImage
          source={ASSETS.IMAGES.APP_ICON}
          style={styles.splsh_image}
        />
      </Animated.View>
      <View style={styles.version}>
        <AppText
          fontSize={rpFont(10)}
          text={`v${DeviceUtils.BUILD_VERSION}(${DeviceUtils.BUILD_NUMBER})`}
          color={theme.colors.primary}
        />
      </View>
    </Container>
  );
};

export default SplashScreen;

const splashScreenStyles = () =>
  StyleSheet.create({
    container: {
      justifyContent: 'center',
      alignItems: 'center',
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
