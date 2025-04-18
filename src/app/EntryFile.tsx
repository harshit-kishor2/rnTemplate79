import React from 'react';
import RootWrapper from './RootWrapper';
import useExceptionHandler from '@hooks/useExceptionHandler';
import AppNavigator from '@navigation/AppNavigator';

const EntryFile = () => {
  // Initialize exception handler with optional custom handlers
  useExceptionHandler();
  return (
    <RootWrapper>
      <AppNavigator />
    </RootWrapper>
  );
};

export default EntryFile;
