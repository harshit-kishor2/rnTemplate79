
import AppText from '@components/atoms/AppText';
import {rpFont} from '@helpers/responsive-utils';
import {useAppTheme} from '@theme/theme-provider';
import React, {FC} from 'react';
import {StyleProp, StyleSheet, TextStyle, View, ViewStyle} from 'react-native';

type Props = {
  errorContainerStyle?: StyleProp<ViewStyle>;
  errorStyle?: StyleProp<TextStyle>;
  error?: string;
};
const ErrorView: FC<Props> = ({errorContainerStyle, errorStyle, error}) => {
  const theme = useAppTheme();
  return (
    <View style={[styles.errorView, errorContainerStyle]}>
      <AppText
        fontSize={rpFont(12)}
        text={error}
        color={theme.colors.error}
        style={StyleSheet.flatten([errorStyle])}
      />
    </View>
  );
};

export default ErrorView;

const styles = StyleSheet.create({
  errorView: {
    marginHorizontal: 16,
    marginTop: 4,
  },
});
