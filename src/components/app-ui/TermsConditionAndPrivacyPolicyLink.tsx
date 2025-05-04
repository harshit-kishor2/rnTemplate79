import AppText from '@components/atoms/AppText';
import {rpWidth} from '@helpers/responsive-utils';
import {useAppTranslation} from '@i18n/i18n-provider';
import {useAppNavigation} from '@navigation/hooks';
import {RootStackParamList, ROUTES} from '@navigation/route-config';
import React from 'react';
import {View} from 'react-native';

type ITermsConditionAndPrivacyPolicyLink = {
  from: keyof RootStackParamList;
};
const TermsConditionAndPrivacyPolicyLink: React.FC<
  ITermsConditionAndPrivacyPolicyLink
> = props => {
  const {from} = props;
  const translate = useAppTranslation();
  const navigation = useAppNavigation<ROUTES.LOGIN_SCREEN>();

  const onTermsOfServicePress = () => {
    navigation.navigate(ROUTES.WEBVIEW_SCREEN, {
      from: from,
      page: 't&c',
      webUrl: 'https://google.com',
    });
  };

  const onPrivacyPolicyPress = () => {
    navigation.navigate(ROUTES.WEBVIEW_SCREEN, {
      from: from,
      page: 'p&p',
      webUrl: 'https://google.com',
    });
  };

  return (
    <>
      <AppText text={translate('login_screen.login')} />
      <View style={{flexDirection: 'row'}}>
        <AppText
          onPress={onTermsOfServicePress}
          text={translate('login_screen.login')}
        />
        <View style={{padding: rpWidth(5)}}>
          <AppText text={translate('login_screen.login')} />
        </View>
        <AppText
          onPress={onPrivacyPolicyPress}
          text={translate('login_screen.login')}
        />
      </View>
    </>
  );
};

export default TermsConditionAndPrivacyPolicyLink;
