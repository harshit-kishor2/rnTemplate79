import {useAppTheme} from '@theme/theme-provider';
import React, {JSX, useMemo} from 'react';
import {
  ActivityIndicator,
  StyleProp,
  StyleSheet,
  TextStyle,
  View,
  ViewStyle,
} from 'react-native';

import {Pressable} from 'react-native-gesture-handler';
import AppText from './AppText';

interface ButtonProps {
  buttonContainerStyle?: StyleProp<ViewStyle>;
  titleContainerStyle?: StyleProp<ViewStyle>;
  titleStyle?: StyleProp<TextStyle>;
  title?: React.ReactNode;
  right?: JSX.Element;
  left?: JSX.Element;
  loading?: boolean;
  disabled?: boolean;
  outlined?: boolean;
  backgroundColor?: string;
  width?: number;
  height?: number;
  onPress?: () => void;
}

const AppButton: React.FC<ButtonProps> = props => {
  const {
    buttonContainerStyle,
    title,
    titleContainerStyle,
    titleStyle,
    left,
    right,
    backgroundColor,
    disabled = false,
    outlined = false,
    loading = false,
    height,
    width,
    onPress,
  } = props;

  const theme = useAppTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);

  return (
    <Pressable
      onPress={disabled ? undefined : onPress}
      style={[
        styles.buttonContainer,
        {
          height: height ?? 50,
          width: width ?? '100%',
          backgroundColor: outlined
            ? 'transparent'
            : backgroundColor ?? theme.colors.primary,
          borderColor: backgroundColor ?? theme.colors.primary,
          borderWidth: outlined ? 1 : 0,
          opacity: disabled ? 0.6 : 1,
        },
        buttonContainerStyle,
      ]}
      disabled={disabled}>
      <View style={[styles.titleContainer, titleContainerStyle]}>
        {loading && <ActivityIndicator size="small" />}
        {left}
        {title && (
          <AppText style={StyleSheet.flatten([styles.titleStyle, titleStyle])}>
            {title}
          </AppText>
        )}
        {right}
      </View>
    </Pressable>
  );
};

export default AppButton;

const createStyles = (theme: IAppTheme) =>
  StyleSheet.create({
    buttonContainer: {
      alignItems: 'center',
      borderRadius: 60,
    },
    titleContainer: {
      alignItems: 'center',
      flexDirection: 'row',
      height: '100%',
      justifyContent: 'center',
      width: '100%',
    },
    titleStyle: {
      color: theme.colors.onPrimary,
    },
  });
