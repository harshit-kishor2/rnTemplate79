import React from 'react';
import RootWrapper from './RootWrapper';
import {SplashScreen} from '@screens/SharedScreens';
import useExceptionHandler from '@hooks/useExceptionHandler';

const EntryFile = () => {
  // Initialize exception handler with optional custom handlers
  useExceptionHandler();
  return (
    <RootWrapper>
      <SplashScreen />
    </RootWrapper>
  );
};

export default EntryFile;
