import {useEffect, useState} from 'react';
import {Platform, Keyboard} from 'react-native';
import {KeyboardEvents} from 'react-native-keyboard-controller';

const useKeyboard = () => {
  const [visible, setVisible] = useState(false);
  const [keyboardHeight, setKeyboardHeight] = useState(0);

  const showEvent =
    Platform.OS === 'ios' ? 'keyboardWillShow' : 'keyboardDidShow';
  const hideEvent =
    Platform.OS === 'ios' ? 'keyboardWillHide' : 'keyboardDidHide';

  const onKeyboardShow = (event: any) => {
    setVisible(true);
    setKeyboardHeight(event.endCoordinates?.height ?? 0);
  };
  const onKeyboardHide = () => {
    setVisible(false);
    setKeyboardHeight(0);
  };

  useEffect(() => {
    const showSubscription = KeyboardEvents.addListener(
      showEvent,
      onKeyboardShow
    );
    const hideSubscription = KeyboardEvents.addListener(
      hideEvent,
      onKeyboardHide
    );

    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, [showEvent, hideEvent]);

  const dismiss = () => {
    Keyboard.dismiss();
  };

  return {isKeyboardVisible: visible, keyboardHeight, dismiss};
};

export default useKeyboard;
