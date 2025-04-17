import React from 'react';
import {View, ViewStyle} from 'react-native';

interface DividerProps {
  color?: string;
  thickness?: number;
  vertical?: boolean;
  style?: ViewStyle;
}

const Divider: React.FC<DividerProps> = ({
  color = '#ccc',
  thickness = 1,
  vertical = false,
  style,
}) => {
  const dividerStyle: ViewStyle = {
    backgroundColor: color,
    height: vertical ? '100%' : thickness,
    width: vertical ? thickness : '100%',
  };

  return <View style={[dividerStyle, style]} />;
};

export default Divider;
