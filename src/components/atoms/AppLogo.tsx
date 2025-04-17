import {rpHeight} from '@helpers/responsive-utils';
import React, {FC} from 'react';
import {View} from 'react-native';
import AppSvg from './AppSvg';
import ASSETS from '@constants/assets';

type Props = {
  height?: number;
  width?: number;
};
const AppLogo: FC<Props> = ({
  height = rpHeight(100),
  width = rpHeight(100),
}) => {
  return (
    <View
      style={{
        height,
        width,
      }}>
      <AppSvg icon={ASSETS.SVGS.APP_ICON} height={height} width={width} />
    </View>
  );
};

export default AppLogo;
