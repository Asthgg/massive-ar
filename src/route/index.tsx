import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import ScreenHeader from '../components/ScreenHeader';

import Home from '../screens/Home';
import Feed from '../screens/Profile';
import ArEditor from '../screens/ArEditor';

const Tab = createBottomTabNavigator();

function MainBottomTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={Home} options={{header: () => null}} />
      <Tab.Screen
        name="Ar"
        component={ArEditor}
        options={{header: () => null}}
      />
      <Tab.Screen
        name="Profile"
        component={Feed}
        options={{header: () => null}}
      />
    </Tab.Navigator>
  );
}

export default () => {
  return (
    <NavigationContainer>
      <MainBottomTabs />
    </NavigationContainer>
  );
};
