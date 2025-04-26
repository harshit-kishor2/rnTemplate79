import React from 'react';
import RootWrapper from './RootWrapper';
import useExceptionHandler from '@hooks/useExceptionHandler';
import RootNavigator from '@navigation/RootNavigator';

const EntryFile = () => {
  // Initialize exception handler with optional custom handlers
  useExceptionHandler();
  return (
    <RootWrapper>
      <RootNavigator />
    </RootWrapper>
  );
};

export default EntryFile;
