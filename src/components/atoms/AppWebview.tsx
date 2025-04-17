import {useAppTheme} from '@theme/theme-provider';
import React, {useState} from 'react';
import {ActivityIndicator, StyleSheet, View} from 'react-native';
import {WebView} from 'react-native-webview';

interface IAppWebViewProps {
  url: string;
  onError?: (error: string) => void;
}

const AppWebview: React.FC<IAppWebViewProps> = ({url, onError}) => {
  const [loading, setLoading] = useState(true);
  const theme = useAppTheme();
  return (
    <>
      <WebView
        source={{uri: url}}
        style={styles.webview}
        onLoadStart={() => setLoading(true)}
        onLoadEnd={() => setLoading(false)}
        onError={syntheticEvent => {
          const {nativeEvent} = syntheticEvent;
          onError?.(nativeEvent.description);
        }}
        pullToRefreshEnabled
        allowsBackForwardNavigationGestures
        scalesPageToFit={true}
        allowFileAccess={true}
        originWhitelist={['*']}
        javaScriptCanOpenWindowsAutomatically={true}
      // renderLoading={() => <ActivityIndicator size="large" color={theme.colors.primary} />}
      // startInLoadingState={true}
      // textZoom={100}
      />
      {loading && (
        <View style={styles.activity}>
          <ActivityIndicator size="large" color={theme.colors.primary} />
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  activity: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  webview: {
    backgroundColor: 'transparent',
    flex: 1,
  },
});

export default AppWebview;
