import React from 'react';
import RootWrapper from './RootWrapper';
import useExceptionHandler from '@hooks/useExceptionHandler';
import RootNavigationContainer from '@navigation/RootNavigationContainer';

const EntryFile = () => {
  // Initialize exception handler with optional custom handlers
  useExceptionHandler();
  return (
    <RootWrapper>
      <RootNavigationContainer />
    </RootWrapper>
  );
};

export default EntryFile;
