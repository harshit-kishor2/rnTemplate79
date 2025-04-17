import React, {FC} from 'react';
import {View, PanResponder, StyleSheet} from 'react-native';

type SwipeDetectorProps = {
  onSwipeUp?: () => void;
  onSwipeDown?: () => void;
  onSwipeLeft?: () => void;
  onSwipeRight?: () => void;
  threshold?: number;
  children: React.ReactElement;
};

const SwipeDetector: FC<SwipeDetectorProps> = ({
  onSwipeUp,
  onSwipeDown,
  onSwipeLeft,
  onSwipeRight,
  children,
  threshold = 50,
}) => {
  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => false,
    onMoveShouldSetPanResponder: (evt, gestureState) => {
      return (
        Math.abs(gestureState.dx) > threshold ||
        Math.abs(gestureState.dy) > threshold
      );
    },
    onPanResponderRelease: (evt, gestureState) => {
      const {dx, dy} = gestureState;

      if (Math.abs(dx) > Math.abs(dy)) {
        // Horizontal swipe
        if (dx > threshold) {
          onSwipeRight && onSwipeRight();
        } else if (dx < -threshold) {
          onSwipeLeft && onSwipeLeft();
        }
      } else if (Math.abs(dx) < Math.abs(dy)) {
        // Vertical swipe
        if (dy > threshold) {
          onSwipeDown && onSwipeDown();
        } else if (dy < -threshold) {
          onSwipeUp && onSwipeUp();
        }
      }
    },
  });

  return (
    <View
      {...panResponder.panHandlers}
      style={styles.container}
      pointerEvents="box-none" // Allow child components to receive touch
    >
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default SwipeDetector;
