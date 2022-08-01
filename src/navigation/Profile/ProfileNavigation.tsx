import {DefaultTheme} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import React, {useContext, useEffect, useState} from 'react';
import {AllProfileRoutes} from './routes';
import {HomeRoutes} from '../Home/routes';
import uuidv4 from 'uuidv4';
import {AppColorPalette} from 'src/config/styles';
import {ProfileNavigationOptions} from '../NavigationOptions';
import {getKeyValue} from 'src/util/helperFunctions';
import {useGetProfilePictureQuery, useGetUserQuery} from 'src/redux/store';
import {useSelector} from 'react-redux';
import Toast, {BaseToast, ErrorToast} from 'react-native-toast-message';

const toastConfig = {
  /*
    Overwrite 'success' type,
    by modifying the existing `BaseToast` component
  */
  success: props => (
    <BaseToast
      {...props}
      style={{top: 10, width: '90%', borderLeftColor: '#008717'}}
      text1Style={{
        fontSize: 16,
        fontWeight: '400',
      }}
      text2Style={{
        fontSize: 13,
        fontWeight: '400',
      }}
    />
  ),
  /*
    Overwrite 'error' type,
    by modifying the existing `ErrorToast` component
  */
  error: props => (
    <ErrorToast
      {...props}
      text1Style={{
        fontSize: 17,
      }}
      text2Style={{
        fontSize: 15,
      }}
    />
  ),
  /*
    Or create a completely new type - `tomatoToast`,
    building the layout from scratch.

    I can consume any custom `props` I want.
    They will be passed when calling the `show` method (see below)
  */
};

export default function ProfileNavigation() {
  const Stack: any = createStackNavigator();
  const navTheme = DefaultTheme;
  const {data: profilePictureUri, isLoading: isLoadingProfilePictureUri} =
    useGetProfilePictureQuery();
  const {data: userInfo} = useGetUserQuery();
  const toast = useSelector(state => state.mainReducer.toastMessage);

  useEffect(() => {
    if (toast && toast.type.length > 0) {
      Toast.show(toast);
    }
  }, [toast]);

  navTheme.colors.background = AppColorPalette.appBackgroundColor;
  return (
    <>
      <Stack.Navigator
        screenOptions={(options: any) =>
          ProfileNavigationOptions(options, {
            profilePictureUri,
            isLoadingProfilePictureUri,
            userInfo,
            toast,
          })
        }>
        <Stack.Screen
          name={HomeRoutes.PROFILE.name}
          component={HomeRoutes.PROFILE.component}
          key={uuidv4()}
        />
        {Object.keys(AllProfileRoutes).map(key => {
          return (
            <Stack.Screen
              name={getKeyValue(key)(AllProfileRoutes).name}
              component={getKeyValue(key)(AllProfileRoutes).component}
              key={uuidv4()}
            />
          );
        })}
      </Stack.Navigator>
      <Toast config={toastConfig} />
    </>
  );
}
