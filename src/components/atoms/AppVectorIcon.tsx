import React from 'react';
import {TextProps, TextStyle} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import FontAwesome5Pro from 'react-native-vector-icons/FontAwesome5Pro';
import Fontisto from 'react-native-vector-icons/Fontisto';
import Foundation from 'react-native-vector-icons/Foundation';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Octicons from 'react-native-vector-icons/Octicons';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import Zocial from 'react-native-vector-icons/Zocial';

export const IconType = {
  AntDesign: 'AntDesign',
  Entypo: 'Entypo',
  EvilIcons: 'EvilIcons',
  Feather: 'Feather',
  FontAwesome: 'FontAwesome',
  FontAwesome5: 'FontAwesome5',
  FontAwesome5Brands: 'FontAwesome5Brands',
  Fontisto: 'Fontisto',
  Foundation: 'Foundation',
  Ionicons: 'Ionicons',
  MaterialCommunityIcons: 'MaterialCommunityIcons',
  MaterialIcons: 'MaterialIcons',
  Octicons: 'Octicons',
  SimpleLineIcons: 'SimpleLineIcons',
  Zocial: 'Zocial',
};

export interface IconProps extends TextProps {
  type: string;
  name: string;
  color?: string;
  size?: number;
  onPress?: () => void;
  style?: TextStyle;
}

const AppVectorIcon: React.FC<IconProps> = props => {
  const {
    type,
    name,
    color = '#757575',
    size = 20,
    style,
    onPress,
    ...textProps
  } = props;

  let Element: any;
  switch (type) {
    case IconType.AntDesign:
      Element = AntDesign;
      break;
    case IconType.Entypo:
      Element = Entypo;
      break;
    case IconType.EvilIcons:
      Element = EvilIcons;
      break;
    case IconType.Feather:
      Element = Feather;
      break;
    case IconType.FontAwesome5:
      Element = FontAwesome5;
      break;
    case IconType.FontAwesome:
      Element = FontAwesome;
      break;
    case IconType.FontAwesome5Brands:
      Element = FontAwesome5Pro;
      break;
    case IconType.Fontisto:
      Element = Fontisto;
      break;
    case IconType.Foundation:
      Element = Foundation;
      break;
    case IconType.Ionicons:
      Element = Ionicons;
      break;
    case IconType.MaterialIcons:
      Element = MaterialIcons;
      break;
    case IconType.MaterialCommunityIcons:
      Element = MaterialCommunityIcons;
      break;
    case IconType.Octicons:
      Element = Octicons;
      break;
    case IconType.SimpleLineIcons:
      Element = SimpleLineIcons;
      break;
    case IconType.Zocial:
      Element = Zocial;
      break;
    default:
      Element = MaterialIcons;
      break;
  }

  return (
    <Element
      {...textProps}
      name={name}
      size={size}
      color={color}
      style={style}
      onPress={onPress}
    />
  );
};

export default AppVectorIcon;
