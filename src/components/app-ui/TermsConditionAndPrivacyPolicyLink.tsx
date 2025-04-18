
import AppText from '@components/atoms/AppText';
import {rpWidth} from '@helpers/responsive-utils';
import {useAppTranslation} from '@i18n/i18n-provider';
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
  const navigation = useAppNavigation<RouteConst.LoginRoute>();

  const onTermsOfServicePress = () => {
    navigation.navigate(RouteConst.WebViewRoute, {
      from: from,
      page: 't&c',
      webUrl: 'https://google.com',
    });
  };

  const onPrivacyPolicyPress = () => {
    navigation.navigate(RouteConst.WebViewRoute, {
      from: from,
      page: 'p&p',
      webUrl: 'https://google.com',
    });
  };

  return (
    <>
      <AppText
        text={translate('login_screen.by_continuing_you_agree_to_our')}
      />
      <View style={{flexDirection: 'row'}}>
        <AppText
          onPress={onTermsOfServicePress}
          text={translate('login_screen.terms_of_service')}
        />
        <View style={{padding: rpWidth(5)}}>
          <AppText text={translate('login_screen.and')} />
        </View>
        <AppText
          onPress={onPrivacyPolicyPress}
          text={translate('login_screen.privacy_policy')}
        />
      </View>
    </>
  );
};

export default TermsConditionAndPrivacyPolicyLink;
