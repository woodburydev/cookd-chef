import {DefaultTheme} from '@react-navigation/native';
import {
  createStackNavigator,
  StackNavigationOptions,
  StackNavigationProp,
} from '@react-navigation/stack';
import React, {useContext, useState} from 'react';
import {UserContext} from 'src/context/UserContext';
import {
  LoginNavigationRoutes,
  LoginRoutesNames,
} from 'src/navigation/NavigationTypes';
import {LoginRoutes} from './routes';
import auth from '@react-native-firebase/auth';
import Header from 'src/screens/Login/Components/Header';
import {AppColorPalette} from 'src/config/styles';
import {LoginNavigationOptions} from '../NavigationOptions';
import {getKeyValue} from 'src/util/helperFunctions';

export default function LoginNavigation() {
  const [isVisible, setIsVisible] = useState(false);
  const [loading, setLoading] = useState(0);
  const Stack: any = createStackNavigator();
  const navTheme = DefaultTheme;
  navTheme.colors.background = AppColorPalette.appBackgroundColor;
  const {user} = useContext(UserContext);

  const getInitialRoute = () => {
    if (auth().currentUser && !user) {
      const hasEmailAndPassword = auth().currentUser?.providerData[1];
      if (hasEmailAndPassword) {
        return LoginRoutes.ALLERGIES.name;
      } else {
        return LoginRoutes.SIGN_UP.name;
      }
    } else {
      return LoginRoutes.GET_STARTED.name;
    }
  };

  // intercepting screen options for control before rendering each route.
  const screenOptions = (
    props: StackNavigationProp<LoginNavigationRoutes, keyof LoginRoutesNames>,
  ): StackNavigationOptions => {
    switch (props.route.name) {
      case LoginRoutes.PHONE_NUMBER.name:
        setLoading(0);
        setIsVisible(true);
        break;
      case LoginRoutes.SIGN_UP.name:
        setLoading(0.2);
        setIsVisible(true);
        break;
      case LoginRoutes.EMAIL.name:
        setLoading(0.4);
        setIsVisible(true);
        break;
      case LoginRoutes.ENTER_OTP.name:
        setLoading(0);
        setIsVisible(true);
        break;
      case LoginRoutes.SET_PASSWORD.name:
        setLoading(0.6);
        setIsVisible(true);
        break;
      case LoginRoutes.ALLERGIES.name:
        setLoading(0.8);
        setIsVisible(true);
        break;
      case LoginRoutes.CUISINES.name:
        setLoading(1);
        setIsVisible(true);
        break;
      case LoginRoutes.GET_STARTED.name:
        setIsVisible(false);
        break;
    }

    return LoginNavigationOptions;
  };
  return (
    <>
      <Header loading={loading} isVisible={isVisible} />
      <Stack.Navigator
        screenOptions={screenOptions}
        theme={navTheme}
        initialRouteName={getInitialRoute()}>
        {Object.keys(LoginRoutes).map(key => {
          return (
            <Stack.Screen
              name={getKeyValue(key)(LoginRoutes).name}
              component={getKeyValue(key)(LoginRoutes).component}
              key={getKeyValue(key)(LoginRoutes).name}
            />
          );
        })}
      </Stack.Navigator>
    </>
  );
}
