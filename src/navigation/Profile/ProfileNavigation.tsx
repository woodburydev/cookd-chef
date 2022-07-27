import { DefaultTheme } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React, { useContext, useState } from 'react';
import { AllProfileRoutes } from './routes';
import { HomeRoutes } from '../Home/routes';
import uuidv4 from 'uuidv4';
import { AppColorPalette } from 'src/config/styles';
import { ProfileNavigationOptions } from '../NavigationOptions';
import { getKeyValue } from 'src/util/helperFunctions';
import { useGetProfilePictureQuery, useGetUserQuery } from 'src/redux/store';

export default function ProfileNavigation() {
  const Stack: any = createStackNavigator();
  const navTheme = DefaultTheme;
  const { data: profilePictureUri, isLoading: isLoadingProfilePictureUri } = useGetProfilePictureQuery();
  const { data: userInfo } = useGetUserQuery();

  navTheme.colors.background = AppColorPalette.appBackgroundColor;
  return (
    <Stack.Navigator screenOptions={(options: any) => ProfileNavigationOptions(options, { profilePictureUri, isLoadingProfilePictureUri, userInfo })}>
      <Stack.Screen
        name={HomeRoutes.PROFILE.name}
        component={HomeRoutes.PROFILE.component}
        key={uuidv4()}
      />
      {Object.keys(AllProfileRoutes).map((key) => {
        return (
          <Stack.Screen
            name={getKeyValue(key)(AllProfileRoutes).name}
            component={getKeyValue(key)(AllProfileRoutes).component}
            key={uuidv4()}
          />
        );
      })}
    </Stack.Navigator>
  );
}
