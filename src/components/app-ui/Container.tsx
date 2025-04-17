import {useAppTheme} from '@theme/theme-provider';
import React, {ReactNode} from 'react';
import {
  DimensionValue,
  StatusBar,
  StyleSheet,
  View,
  ViewStyle,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

interface ContainerProps {
  useSafeArea?: boolean;
  children: ReactNode;
  backgroundColor?: string;
  statusBarColor?: string;
  padding?: DimensionValue;
  paddingHorizontal?: DimensionValue;
  margin?: DimensionValue;
  alignItems?: AlignItems;
  style?: ViewStyle;
}
const Container: React.FC<ContainerProps> = ({
  useSafeArea = true,
  children,
  backgroundColor,
  statusBarColor,
  padding = 0,
  paddingHorizontal,
  margin = 0,
  alignItems,
  style,
}: ContainerProps) => {
  const theme = useAppTheme();
  // Change bar style according to theme
  const barStyle = theme.themeType == 'dark' ? 'light-content' : 'dark-content';
  const ContainerTag = useSafeArea ? SafeAreaView : View;
  return (
    <ContainerTag
      style={StyleSheet.flatten([
        styles.container,
        {
          backgroundColor: backgroundColor ?? theme.colors.background,
          padding,
          margin,
          alignItems: alignItems,
          paddingHorizontal: paddingHorizontal,
        },
        style,
      ])}>
      <StatusBar
        barStyle={barStyle}
        backgroundColor={statusBarColor ?? theme.colors.background}
      />
      {children}
    </ContainerTag>
  );
};

export default Container;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
