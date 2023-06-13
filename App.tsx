import React from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';

import RootScreen from './src/screens/Root';
import {ArContextProvider} from './src/context/ArContext';

function App(): JSX.Element {
  return (
    <SafeAreaProvider>
      <ArContextProvider>
        <RootScreen />
      </ArContextProvider>
    </SafeAreaProvider>
  );
}

export default App;
