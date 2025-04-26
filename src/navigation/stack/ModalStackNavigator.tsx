
import {RootStackParamList, ROUTES, SCREEN_OPTIONS} from '@navigation/route-config';
import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import {FilterModal} from '@screens/ModalScreens';

const ModalStack = createStackNavigator<RootStackParamList>();

const ModalStackNavigator: React.FC = () => {
  return (
    <ModalStack.Navigator
      initialRouteName={ROUTES.FILTER_MODAL}
      screenOptions={SCREEN_OPTIONS.modal}
    >
      {/* ===== All Modal Stack ===== */}
      <ModalStack.Screen
        name={ROUTES.FILTER_MODAL}
        component={FilterModal}
      />


    </ModalStack.Navigator>
  );
};

export default ModalStackNavigator;
