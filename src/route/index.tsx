import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import Home from '../screens/Home';
import ArEditor from '../screens/arEditor/index';
import cutomsTabBar from './components/cutomsTabBar';
import customTabScreen from './components/customTabScreen';

const Tab = createBottomTabNavigator();

function MainBottomTabs() {
  return (
    <Tab.Navigator {...cutomsTabBar()}>
      <Tab.Screen
        name="Home"
        component={Home}
        options={customTabScreen({
          iconName: 'home',
          title: 'Home',
        })}
      />
      <Tab.Screen
        name="Ar"
        component={ArEditor}
        options={customTabScreen({
          iconName: 'cube-scan',
          title: 'Ar Editor',
        })}
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
