import ErrorView from '@components/app-ui/ErrorView';
import {useAppTheme} from '@theme/theme-provider';
import React, {useCallback, useMemo} from 'react';
import {
  NativeSyntheticEvent,
  Platform,
  TextInput as RNTextInput,
  TextInputProps as RNTextInputProps,
  StyleProp,
  StyleSheet,
  TargetedEvent,
  TextInputFocusEventData,
  TextStyle,
  View,
  ViewStyle,
} from 'react-native';

import Animated, {
  Easing,
  interpolate,
  interpolateColor,
  useAnimatedProps,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';


export type Variant = 'filled' | 'outlined' | 'standard';

export interface IAppTextInputProps extends RNTextInputProps {
  /**
   * The variant of the TextInput style.
   * @default "filled"
   */
  variant?: Variant;
  /**
   * The label to display.
   */
  label?: string;
  /**
   * The element placed before the text input.
   */
  leftIcon?: React.ReactNode | null;
  /**
   * The element placed after the text input.
   */
  rightIcon?: React.ReactNode | null;
  /**
   * The helper text to display.
   */
  error?: string;
  /**
   * Callback function to call when user moves pointer over the input.
   */
  onMouseEnter?: (event: NativeSyntheticEvent<TargetedEvent>) => void;
  /**
   * Callback function to call when user moves pointer away from the input.
   */
  onMouseLeave?: (event: NativeSyntheticEvent<TargetedEvent>) => void;
  /**
   * The style of the container view.
   */
  style?: StyleProp<ViewStyle>;
  /**
   * The style of the text input container view.
   */
  inputContainerStyle?: StyleProp<ViewStyle>;
  /**
   * The style of the text input.
   */
  inputStyle?: RNTextInputProps['style'];
  /**
   * The style of the text input's leading element container.
   */
  leftIconContainerStyle?: StyleProp<ViewStyle>;
  /**
   * The style of the text input's trailing element container.
   */
  rightIconContainerStyle?: StyleProp<ViewStyle>;
  /**
   * Background color of the input container style.
   * @default "white"
   */
  backgroundColor?: string;
  /**
   * On focus background color of the input container style.
   * @default "#e9e9e9"
   */
  onFocusBackgroundColor?: string;
  /**
   * Border color of the outline input container style.
   * @default "black"
   */
  borderColor?: string;
  /**
   * On focus Border color of the outline input container style.
   * @default "#0c5fed"
   */
  onFocusBorderColor?: string;
  /**
   * On hover background color of the filled input container style.
   * @default "#e9e9e9"
   */
  onHoverBackgroundColor?: string;
  /**
   * Label text color of the input.
   * @default "black"
   */
  labelColor?: string;
  /**
   * On focus Label text color change.
   * @default "#0c5fed"
   */
  onFocusLabelColor?: string;
  /**
   * On error or any helper text below text Input container style.
   */
  errorContainerStyle?: StyleProp<ViewStyle>;
  /**
   * On error or any helper text below text Input Text-Style.
   */
  errorStyle?: StyleProp<TextStyle>;
  /**
   * In outlined variant the gap border color.
   * @default white
   */
  outlineGapColor?: string;

  hideErrorPadding?: boolean;
}

const AnimatedTextInput = Animated.createAnimatedComponent(RNTextInput);

const AppTextInputWithoutRef = (
  props: IAppTextInputProps,
  ref?: React.Ref<RNTextInput>
) => {
  const {
    backgroundColor = 'white',
    borderColor = 'black',
    error,
    errorContainerStyle,
    errorStyle,
    inputContainerStyle,
    inputStyle,
    label,
    labelColor = 'black',
    leftIcon,
    leftIconContainerStyle,
    onBlur,
    onFocus,
    onFocusBackgroundColor = '#e9e9e9',
    onFocusBorderColor = '#0c5fed',
    onFocusLabelColor = '#0c5fed',
    onHoverBackgroundColor = '#e9e9e9',
    onMouseEnter,
    onMouseLeave,
    outlineGapColor = 'white',
    placeholder,
    rightIcon,
    rightIconContainerStyle,
    style,
    variant = 'filled',
    hideErrorPadding = false,
    ...rest
  } = props;

  const theme = useAppTheme();
  const hovered = useSharedValue(false);
  const focused = useSharedValue(false);
  const focusAnimation = useSharedValue(0);
  const activeAnimation = useSharedValue(0);

  const isStandardVariant = variant === 'standard';

  const styles = useMemo(() => inputStyles(theme), [theme]);

  const handleMouseEnter = useCallback(
    (event: NativeSyntheticEvent<TargetedEvent>) => {
      onMouseEnter?.(event);
      hovered.value = true;
    },
    [hovered, onMouseEnter]
  );

  const handleMouseLeave = useCallback(
    (event: NativeSyntheticEvent<TargetedEvent>) => {
      onMouseLeave?.(event);
      hovered.value = false;
    },
    [hovered, onMouseLeave]
  );

  const handleFocus = useCallback(
    (event: NativeSyntheticEvent<TextInputFocusEventData>) => {
      onFocus?.(event);
      focused.value = true;
    },
    [focused, onFocus]
  );

  const handleBlur = useCallback(
    (event: NativeSyntheticEvent<TextInputFocusEventData>) => {
      onBlur?.(event);
      focused.value = false;
    },
    [focused, onBlur]
  );

  useDerivedValue(() => {
    focusAnimation.value = withTiming(focused.value ? 1 : 0, {
      duration: 200,
      easing: Easing.out(Easing.ease),
    });
  }, [focused, focusAnimation]);

  const active = useDerivedValue(() => {
    const isFocused = focused.value; // Safely read shared value
    const isInputFilled = (rest?.value?.length ?? 0) > 0;
    return isFocused || isInputFilled;
  });

  useDerivedValue(() => {
    activeAnimation.value = withTiming(active.value ? 1 : 0, {
      duration: 200,
      easing: Easing.out(Easing.ease),
    });
  }, [active, activeAnimation]);
  const animatedInputContainerStyle = useAnimatedStyle(() => {
    let resolvedBackgroundColor;
    if (variant === 'filled') {
      if (focused.value) {
        resolvedBackgroundColor = onFocusBackgroundColor;
      } else if (hovered.value) {
        resolvedBackgroundColor = onHoverBackgroundColor;
      } else {
        resolvedBackgroundColor = backgroundColor;
      }
    } else {
      resolvedBackgroundColor = backgroundColor;
    }
    return {
      backgroundColor: resolvedBackgroundColor,
      borderBottomEndRadius: isStandardVariant ? 0 : 4,
      borderBottomStartRadius: isStandardVariant ? 0 : 4,
      borderTopEndRadius: 4,
      borderTopStartRadius: 4,
    };
  }, [focused, hovered, variant]);

  const animatedInput = useAnimatedStyle(() => {
    const paddingIfStandard = isStandardVariant ? 0 : 16;
    const paddingTop = variant === 'filled' && label ? 18 : 0;
    return {
      fontSize: 16,
      minHeight: isStandardVariant ? 48 : 56,
      paddingEnd: rightIcon ? 12 : paddingIfStandard,
      paddingStart: leftIcon ? 12 : paddingIfStandard,
      paddingTop,
    };
  }, [variant, leftIcon, rightIcon]);

  const animatedLeading = useAnimatedStyle(() => {
    return {
      marginStart: isStandardVariant ? 0 : 12,
      marginVertical: isStandardVariant ? 12 : 16,
    };
  }, [variant]);

  const animatedTrailing = useAnimatedStyle(() => {
    return {
      marginEnd: isStandardVariant ? 0 : 12,
      marginVertical: isStandardVariant ? 12 : 16,
    };
  }, [variant]);

  const animatedOutline = useAnimatedStyle(() => {
    let resolvedBorderColor;
    if (focused.value) {
      resolvedBorderColor = onFocusBorderColor;
    } else if (hovered.value) {
      resolvedBorderColor = onFocusBorderColor;
    } else {
      resolvedBorderColor = borderColor;
    }
    return {
      borderBottomEndRadius: 4,
      borderBottomStartRadius: 4,
      borderColor: resolvedBorderColor,
      borderTopEndRadius: 4,
      borderTopStartRadius: 4,
      borderWidth: focused.value ? 2 : 1,
    };
  }, [focused, hovered]);

  const animatedOutlineLabelGap = useAnimatedStyle(() => {
    return {
      height: focused.value ? 2 : 1,
    };
  }, [focused]);

  const animatedLabelContainer = useAnimatedStyle(() => {
    const baseHeight = isStandardVariant ? 48 : 56;
    let startValue = 0;
    if (isStandardVariant) {
      startValue = leftIcon ? 36 : 0;
    } else {
      startValue = leftIcon ? 48 : 16;
    }
    return {
      height: baseHeight,
      start: startValue,
    };
  }, [variant, leftIcon]);

  const animatedLabel = useAnimatedStyle(() => {
    const fontSizeValue = interpolate(activeAnimation.value, [0, 1], [16, 12]);

    const colorValue = interpolateColor(
      focusAnimation.value,
      [0, 1],
      [labelColor, onFocusLabelColor]
    );
    let translateYValue = 0;
    if (variant === 'filled') {
      translateYValue = -12;
    } else if (variant === 'outlined') {
      translateYValue = -28;
    } else {
      translateYValue = -24;
    }
    const translateY = interpolate(
      activeAnimation.value,
      [0, 1],
      [0, translateYValue]
    );

    return {
      color: colorValue,
      fontSize: fontSizeValue,
      transform: [{translateY}],
    };
  }, [focusAnimation, activeAnimation, variant, labelColor, onFocusLabelColor]);

  const animatedPlaceholder = useAnimatedProps<IAppTextInputProps>(() => {
    const resolvedPlaceholder = label && !focused.value ? '' : placeholder;
    return {
      placeholder: resolvedPlaceholder,
    };
  }, [label, focused, placeholder]);

  const animatedUnderline = useAnimatedStyle(() => {
    return {
      backgroundColor: interpolateColor(
        focusAnimation.value,
        [0, 1],
        [borderColor, onFocusBorderColor]
      ),
      transform: [{scaleX: focusAnimation.value}],
    };
  }, [focusAnimation]);

  const animatedOutlineLabel = useAnimatedStyle(() => {
    return {
      backgroundColor: interpolateColor(
        activeAnimation.value,
        [0, 1],
        [backgroundColor, outlineGapColor]
      ),
      transform: [{scaleX: activeAnimation.value}],
    };
  }, [activeAnimation]);

  return (
    <View style={[styles.container, style]}>
      <Animated.View
        style={[
          styles.inputContainer,
          animatedInputContainerStyle,
          inputContainerStyle,
        ]}>
        {leftIcon && (
          <Animated.View
            style={[styles.leading, animatedLeading, leftIconContainerStyle]}>
            {leftIcon}
          </Animated.View>
        )}

        <AnimatedTextInput
          ref={ref}
          style={[styles.input, animatedInput, inputStyle]}
          animatedProps={animatedPlaceholder}
          placeholderTextColor={theme.colors.placeholder}
          onFocus={handleFocus}
          onBlur={handleBlur}
          {...({
            onMouseEnter: handleMouseEnter,
            onMouseLeave: handleMouseLeave,
            ...rest,
          } as any)}
        />

        {rightIcon && (
          <Animated.View
            style={[
              styles.trailing,
              animatedTrailing,
              rightIconContainerStyle,
            ]}>
            {rightIcon}
          </Animated.View>
        )}

        {(variant === 'filled' || variant === 'standard') && (
          <>
            <View
              style={[styles.underline, {backgroundColor: borderColor}]}
              pointerEvents="none"
            />
            <Animated.View
              style={[styles.underlineFocused, animatedUnderline]}
              pointerEvents="none"
            />
          </>
        )}

        {variant === 'outlined' && (
          <Animated.View
            style={[StyleSheet.absoluteFill, animatedOutline, styles.outline]}
            pointerEvents="none"
          />
        )}

        {label ? (
          <Animated.View
            style={[styles.labelContainer, animatedLabelContainer]}
            pointerEvents="none">
            {variant === 'outlined' && (
              <Animated.View
                style={[
                  styles.outlineLabelGap,
                  animatedOutlineLabel,
                  animatedOutlineLabelGap,
                ]}
              />
            )}
            <Animated.Text style={animatedLabel}>{label}</Animated.Text>
          </Animated.View>
        ) : null}
      </Animated.View>
      {!hideErrorPadding && (
        <ErrorView
          error={error}
          errorContainerStyle={errorContainerStyle}
          errorStyle={errorStyle}
        />
      )}
    </View>
  );
};

const AppInput: React.FC<IAppTextInputProps> = React.memo(
  React.forwardRef((props: IAppTextInputProps, ref?: React.Ref<RNTextInput>) =>
    AppTextInputWithoutRef(props, ref)
  )
);

export default AppInput;

const inputStyles = (theme: IAppTheme) =>
  StyleSheet.create({
    container: {
      width: '100%',
      paddingVertical: 5,
    },
    input: {
      flex: 1,
      ...Platform.select({
        web: {
          outlineStyle: 'none',
        },
      }),
    },
    inputContainer: {
      flexDirection: 'row',
    },
    labelContainer: {
      justifyContent: 'center',
      position: 'absolute',
      top: 0,
    },
    leading: {
      alignItems: 'center',
      height: 24,
      justifyContent: 'center',
      width: 24,
    },
    outline: {},
    outlineLabelGap: {
      backgroundColor: theme.colors.background,
      end: -4,
      position: 'absolute',
      start: -4,
      top: 0,
    },
    trailing: {
      alignItems: 'center',
      height: 24,
      justifyContent: 'center',
      width: 24,
    },
    underline: {
      bottom: 0,
      end: 0,
      height: 1,
      position: 'absolute',
      start: 0,
    },
    underlineFocused: {
      bottom: 0,
      end: 0,
      height: 2,
      position: 'absolute',
      start: 0,
    },
  });

/***
      <AppInput
        style={{width: 300}}
        variant="outlined"
        label="Email"
        placeholder="Enter your email"
        leftIcon={<AppVectorIcon type='Feather' name="mail" />}
        rightIcon={<AppVectorIcon type='Feather' name="mail" />}
      />
   */
