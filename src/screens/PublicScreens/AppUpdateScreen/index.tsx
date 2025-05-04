import DeviceUtils from '@helpers/device-utils';
import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  Easing,
} from 'react-native-reanimated';


const AppUpdateScreen = () => {
  const [isUpdateAvailable, setIsUpdateAvailable] = useState(false);

  const CURRENT_VERSION = DeviceUtils.BUILD_VERSION;
  const LATEST_VERSION: string = '1.1.0';

  const scale = useSharedValue(0);

  useEffect(() => {
    // Compare versions (in real app, fetch LATEST_VERSION from server)
    setIsUpdateAvailable(CURRENT_VERSION !== LATEST_VERSION);

    // Animate in
    scale.value = withTiming(1, {
      duration: 700,
      easing: Easing.out(Easing.exp),
    });

    return () => {
      // Animate out (optional if unmounting)
      scale.value = withTiming(0, {
        duration: 400,
        easing: Easing.in(Easing.exp),
      });
    };
  }, [CURRENT_VERSION, scale]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{scale: scale.value}],
    opacity: scale.value,
  }));

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.card, animatedStyle]}>
        <Text style={styles.versionText}>Current Version: {CURRENT_VERSION}</Text>

        {isUpdateAvailable ? (
          <TouchableOpacity style={styles.updateButton}>
            <Text style={styles.updateText}>Update Now</Text>
          </TouchableOpacity>
        ) : (
          <Text style={styles.updatedText}>Already Updated ✅</Text>
        )}
      </Animated.View>
    </View>
  );
};

export default AppUpdateScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#101010',
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    width: 260,
    height: 260,
    borderRadius: 130,
    backgroundColor: '#1e1e1e',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: {width: 2, height: 2},
    shadowOpacity: 0.3,
    shadowRadius: 5,
  },
  versionText: {
    color: '#ccc',
    fontSize: 18,
    marginBottom: 20,
  },
  updateButton: {
    backgroundColor: '#4caf50',
    paddingVertical: 10,
    paddingHorizontal: 25,
    borderRadius: 25,
  },
  updateText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  updatedText: {
    color: '#00e676',
    fontSize: 16,
  },
});
