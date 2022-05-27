import React from 'react';

import {createStackNavigator} from '@react-navigation/stack';
import HomeTabNavigation from './HomeTabNavigation';
import {HomeNavigationOptions} from '../NavigationOptions';

export default function HomeNavigation() {
  const Stack: any = createStackNavigator();
  return (
    <Stack.Navigator screenOptions={HomeNavigationOptions}>
      <Stack.Screen name="HOME_TAB_NAVIGATION" component={HomeTabNavigation} />
    </Stack.Navigator>
  );
}
