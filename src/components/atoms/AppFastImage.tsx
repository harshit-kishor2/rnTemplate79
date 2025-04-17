import React, {useEffect, useState} from 'react';
import type {LayoutChangeEvent} from 'react-native';
import {
  ActivityIndicator,
  LayoutRectangle,
  StyleProp,
  StyleSheet,
  View,
  ViewStyle,
} from 'react-native';
import FastImage, {
  FastImageProps as FastImageProp,
  ImageStyle,
  Priority,
  Source,
} from 'react-native-fast-image';

export type FastImageProps = Omit<FastImageProp, 'source'>;

export interface ImageProps extends FastImageProps {
  containerStyle?: StyleProp<ViewStyle>;
  style?: ImageStyle;
  priority?: Priority;
  uploading?: boolean;
  children?: React.ReactNode;
  showIndicator?: boolean;
  indicatorSize?: number;
  source?: string | Source | number;
  loaderColor?: string;
  fallbackSource?: Source | number;
}

const AppFastImage: React.FC<ImageProps> = props => {
  const {
    children,
    containerStyle,
    indicatorSize = 20,
    loaderColor,
    priority,
    resizeMode,
    showIndicator = true,
    source,
    fallbackSource,
    style,
    uploading,
    ...rest
  } = props;

  const [loading, setLoading] = useState(false);
  const [layout, setLayout] = useState<LayoutRectangle | null>(null);
  const [imageSource, setImageSource] = useState<number | Source | undefined>(
    undefined
  );

  useEffect(() => {
    if (typeof uploading !== 'undefined' && uploading !== loading) {
      setLoading(uploading);
    }
  }, [loading, uploading]);

  useEffect(() => {
    if (typeof source === 'string') {
      setImageSource({
        uri: source,
        priority: priority ?? FastImage.priority.normal,
      });
    } else if (typeof source === 'object' && source?.uri) {
      setImageSource(source);
    } else if (typeof source === 'number') {
      setImageSource(source);
    }
  }, [priority, source]);

  const onLayout = (e: LayoutChangeEvent) => {
    const {x, y, height, width} = e.nativeEvent.layout;
    if (
      layout &&
      layout.x === x &&
      layout.y === y &&
      layout.height === height &&
      layout.width === width
    ) {
      return;
    }
    setLayout(e.nativeEvent.layout);
  };

  const shouldShowIndicator =
    showIndicator &&
    loading &&
    typeof source === 'string' &&
    (source.startsWith('http') || source.startsWith('https'));

  let indicator = null;
  if (shouldShowIndicator) {
    indicator = (
      <View style={styles.indicator}>
        <ActivityIndicator
          color={loaderColor ?? 'grey'}
          size={indicatorSize}
          animating={loading}
        />
      </View>
    );
  }

  let imageStyle: StyleProp<ImageStyle> = {...style};

  if (imageStyle.flex && layout) {
    imageStyle = {...style};
    delete imageStyle.flex;
    imageStyle = {...imageStyle, ...layout};
  }

  return (
    <View style={[styles.container, containerStyle]} onLayout={onLayout}>
      <FastImage
        style={imageStyle}
        source={imageSource}
        resizeMode={resizeMode ?? FastImage.resizeMode.contain}
        onLoadStart={() => {
          !loading && setLoading(true);
        }}
        onError={() => {
          setLoading(false);
          fallbackSource && setImageSource(fallbackSource);
        }}
        onLoadEnd={() => {
          setLoading(false);
        }}
        {...rest}>
        {children}
      </FastImage>
      {indicator}
    </View>
  );
};

export default AppFastImage;

const styles = StyleSheet.create({
  container: {},
  indicator: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

/**
 * Examples

// Remote Image
<AppFastImage
  source="https://example.com/your-image.jpg"
  containerStyle={styles.imageContainer}
  style={styles.image}
  loaderColor="blue"
  indicatorSize={30}
  showIndicator={true}
/>;

// Local Image
<AppFastImage
  source={require('./path-to-local-image.png')}
  containerStyle={styles.imageContainer}
  style={styles.image}
/>;

// Image with Fallback
<AppFastImage
  source="https://example.com/your-image.jpg"
  fallbackSource={require('./path-to-fallback-image.png')}
  containerStyle={styles.imageContainer}
  style={styles.image}
  loaderColor="green"
/>;

//  Custom Image with Uploading Indicator
<AppFastImage
  source="https://example.com/uploading-image.jpg"
  uploading={true}
  containerStyle={styles.imageContainer}
  style={styles.image}
  loaderColor="red"
  indicatorSize={50}
>
  <Text style={styles.text}>Uploading...</Text>
</AppFastImage>;

*/
