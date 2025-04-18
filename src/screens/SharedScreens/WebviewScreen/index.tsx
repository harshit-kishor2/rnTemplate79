
import Container from '@components/app-ui/Container';
import AppWebview from '@components/atoms/AppWebview';
import {useAppTranslation} from '@i18n/i18n-provider';
import React from 'react';


const WebViewScreen: React.FC = () => {
  const translate = useAppTranslation();
  const route = useAppRoute<RouteConst.WebViewRoute>();
  const getTitle = (page?: IWebViewPages): string => {
    switch (page) {
      case 't&c':
        return translate('webview_screen.t&c');
      case 'p&p':
        return translate('webview_screen.p&p');
      default:
        return '';
    }
  };

  return (
    <Container>
      <AppHeader title={getTitle(route.params?.page) ?? ''} />
      <AppWebview url="https://google.com" />
    </Container>
  );
};

export default WebViewScreen;
