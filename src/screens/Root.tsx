import React from 'react';
import {StatusBar} from 'react-native';

import RootLayout from '../components/RootLayout';

import Route from '../route';

const RootScreen = () => {
  return (
    <RootLayout>
      <StatusBar
        barStyle="light-content"
        translucent
        backgroundColor="transparent"
      />
      <Route />
    </RootLayout>
  );
};

export default RootScreen;
