import {useAppTheme} from '@theme/theme-provider';
import React, {PropsWithChildren} from 'react';
import {ActivityIndicator, StyleSheet, View, ViewStyle} from 'react-native';

type Size = 'large' | 'small' | undefined;

interface SimpleLoaderProps extends PropsWithChildren {
  loading: boolean;
  size?: Size;
  color?: string;
  style?: ViewStyle;
  backgroundColor?: string;
}

const SimpleLoader: React.FC<SimpleLoaderProps> = ({
  size = 'large',
  loading = false,
  style,
  color,
  backgroundColor,
  children,
}) => {
  const theme = useAppTheme();
  if (loading) {
    return (
      <View style={[styles.container, style]}>
        {children ? (
          <View
            style={[
              styles.loaderContainer,
              {backgroundColor: backgroundColor ?? theme.colors.background},
            ]}>
            <ActivityIndicator size={size ?? 'large'} color={color} />
          </View>
        ) : (
          <ActivityIndicator size={size} color={color} />
        )}
      </View>
    );
  } else {
    return <>{children}</>;
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loaderContainer: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default SimpleLoader;
