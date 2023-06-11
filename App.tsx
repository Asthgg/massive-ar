import React from 'react';

import RootScreen from './src/screens/Root';
import { ArContextProvider } from './src/context/ArContext';

function App(): JSX.Element {
  return (
    <ArContextProvider>
      <RootScreen />
    </ArContextProvider>
  );
}

export default App;
