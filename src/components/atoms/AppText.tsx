
import COLORS from '@constants/colors';
import FONTS from '@constants/fonts';
import {useAppTheme} from '@theme/theme-provider';
import React, {forwardRef} from 'react';
import {
  AnimatableNumericValue,
  StyleSheet,
  Text,
  TextProps,
  TextStyle,
  GestureResponderEvent,
  Pressable,
} from 'react-native';

interface AppTextProps extends TextProps {
  text?: string;
  children?: React.ReactNode | string;
  align?: TextAlign;
  style?: TextStyle | TextStyle[];
  numberOfLines?: number;
  ellipsizeMode?: 'head' | 'middle' | 'tail' | 'clip';
  textTransform?: TextTransform;
  adjustsFontSizeToFit?: boolean;
  fontSize?: number;
  lineHeight?: number;
  fontFamily?: string;
  fontWeight?: FontWeight;
  color?: string;
  opacity?: AnimatableNumericValue;
  onPress?: (event: GestureResponderEvent) => void;
}

const AppText = forwardRef<Text, AppTextProps>(
  (
    {
      text,
      children,
      align = 'auto',
      style,
      fontSize = 16,
      fontFamily = FONTS.ROBOTO.REGULAR,
      fontWeight = 'normal',
      lineHeight,
      color,
      opacity,
      ellipsizeMode,
      textTransform,
      numberOfLines,
      adjustsFontSizeToFit,
      onPress,
      ...props
    }: AppTextProps,
    ref
  ) => {
    const theme = useAppTheme();
    return (
      <Pressable onPress={onPress} disabled={!onPress}>
        <Text
          ref={ref} // Forward the ref
          {...props}
          ellipsizeMode={ellipsizeMode}
          adjustsFontSizeToFit={adjustsFontSizeToFit}
          numberOfLines={numberOfLines}
          style={StyleSheet.flatten([
            {
              textAlign: align,
              textTransform,
              color: color ?? (onPress ? COLORS.blue : theme.colors.text),
              opacity,
              fontSize,
              fontFamily,
              fontWeight,
              lineHeight: lineHeight ?? fontSize + 4,
            },
            style,
          ])}>
          {text ?? children}
        </Text>
      </Pressable>
    );
  }
);

export default AppText;
