import React, {ReactNode} from 'react';
import {View} from 'react-native';

type RenderIfProps = {
  condition: boolean;
  children: ReactNode;
};

const ShowIf: React.FC<RenderIfProps> = props => {
  const {condition, children} = props;
  if (condition) {
    return <>{children}</>;
  }
  return <View />;
};

export default ShowIf;
