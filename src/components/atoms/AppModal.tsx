import React, {useEffect} from 'react';
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  StyleSheet,
} from 'react-native';
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

interface FadeModalProps {
  visible: boolean;
  onClose?: () => void;
  children: React.ReactNode;
  avoidKeyboard?: boolean;
  closeOnBackdrop?: boolean;
}

const AppModal: React.FC<FadeModalProps> = ({
  visible,
  onClose,
  children,
  avoidKeyboard = false,
  closeOnBackdrop = false,
}) => {
  const opacity = useSharedValue(0);
  const translateY = useSharedValue(0);

  useEffect(() => {
    opacity.value = withTiming(visible ? 1 : 0, {
      duration: 300,
      easing: Easing.ease,
    });
    translateY.value = withTiming(visible ? 0 : 50, {
      duration: 300,
      easing: Easing.ease,
    });
  }, [visible, opacity, translateY]);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [{translateY: translateY.value}],
  }));

  if (!visible) return null;

  const keyboardBehavior = Platform.OS === 'ios' ? 'padding' : 'height';

  return (
    <Pressable
      style={styles.overlay}
      onPress={closeOnBackdrop ? onClose : undefined}>
      <KeyboardAvoidingView
        behavior={avoidKeyboard ? keyboardBehavior : undefined}
        style={styles.avoidingView}>
        <Animated.View style={[styles.modal, animatedStyle]}>
          <Pressable style={styles.content} onPress={Keyboard.dismiss}>
            {children}
          </Pressable>
        </Animated.View>
      </KeyboardAvoidingView>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  avoidingView: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
  },
  modal: {
    width: '100%',
    padding: 20,
  },
  content: {
    width: '100%',
  },
});

export default AppModal;
