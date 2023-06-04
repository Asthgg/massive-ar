import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import ScreenHeader from '../components/ScreenHeader';

import Home from '../screens/Home';
import Feed from '../screens/Feed';
import ArEditor from '../screens/ArEditor';

const Stack = createNativeStackNavigator();

function Navigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Feed" component={Feed} />
        <Stack.Screen name="ArEditor" component={ArEditor} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default Navigator;
