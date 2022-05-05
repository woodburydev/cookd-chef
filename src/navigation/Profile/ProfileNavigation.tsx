import {DefaultTheme} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import {ProfileRoutes} from './routes';
import {HomeRoutes} from '../Home/routes';
import uuidv4 from 'uuidv4';
import {AppColorPalette} from 'src/config/styles';
import {ProfileNavigationOptions} from '../NavigationOptions';
import {getKeyValue} from 'src/util/helperFunctions';

export default function ProfileNavigation() {
  const Stack: any = createStackNavigator();
  const navTheme = DefaultTheme;

  navTheme.colors.background = AppColorPalette.appBackgroundColor;
  return (
    <Stack.Navigator screenOptions={ProfileNavigationOptions}>
      <Stack.Screen
        name={HomeRoutes.PROFILE.name}
        component={HomeRoutes.PROFILE.component}
        key={uuidv4()}
      />
      {Object.keys(ProfileRoutes).map(key => {
        return (
          <Stack.Screen
            name={getKeyValue(key)(ProfileRoutes).name}
            component={getKeyValue(key)(ProfileRoutes).component}
            key={uuidv4()}
          />
        );
      })}
    </Stack.Navigator>
  );
}
