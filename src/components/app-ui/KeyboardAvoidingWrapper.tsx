import React from 'react';
import {Platform, StyleProp, StyleSheet, ViewStyle} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {
  KeyboardAwareScrollView,
  KeyboardAwareScrollViewProps,
} from 'react-native-keyboard-controller';

interface IKeyboardAvoidingWrapperProps extends KeyboardAwareScrollViewProps {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  contentContainerStyle?: StyleProp<ViewStyle>;
}

const KeyboardAvoidingWrapper: React.FC<IKeyboardAvoidingWrapperProps> = ({
  children,
  style,
  contentContainerStyle,
  bottomOffset = 50,
  extraKeyboardSpace = Platform.OS === 'ios' ? 20 : 0,
}) => {
  return (
    <KeyboardAwareScrollView
      style={[styles.container, style]}
      contentContainerStyle={[styles.content_container, contentContainerStyle]}
      bottomOffset={bottomOffset}
      extraKeyboardSpace={extraKeyboardSpace}
      keyboardShouldPersistTaps="handled"
      ScrollViewComponent={ScrollView}>
      {children}
    </KeyboardAwareScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content_container: {
    flexGrow: 1,
  },
});

export default KeyboardAvoidingWrapper;
