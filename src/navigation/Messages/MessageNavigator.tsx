import { DefaultTheme } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { HomeRoutes } from '../Home/routes';
import uuidv4 from 'uuidv4';
import { AppColorPalette } from 'src/config/styles';
import { getKeyValue } from 'src/util/helperFunctions';
import { MessageRoutes } from './routes';
import { MessageNavigationOptions } from '../NavigationOptions';

export default function MessageNavigation() {
    const Stack: any = createStackNavigator();
    const navTheme = DefaultTheme;

    navTheme.colors.background = AppColorPalette.appBackgroundColor;
    return (
        <Stack.Navigator screenOptions={MessageNavigationOptions}>
            {Object.keys(MessageRoutes).map(key => {
                return (
                    <Stack.Screen
                        name={getKeyValue(key)(MessageRoutes).name}
                        component={getKeyValue(key)(MessageRoutes).component}
                        key={uuidv4()}
                    />
                );
            })}
        </Stack.Navigator>
    );
}
