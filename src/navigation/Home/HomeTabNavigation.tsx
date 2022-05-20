import { DefaultTheme, useNavigation } from '@react-navigation/native';
import React from 'react';
import { AppColorPalette, commonStyles } from 'src/config/styles';
import {
  BottomTabNavigationOptions,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';
import { HomeRoutes } from './routes';
import { Icon, Text } from '@rneui/base';
import { StyleSheet, View } from 'react-native';
import ProfileNavigation from '../Profile/ProfileNavigation';
import uuidv4 from 'uuidv4';
import { getKeyValue } from 'src/util/helperFunctions';
import { ScreenStackHeaderBackButtonImage } from 'react-native-screens';
import Header from '@screens/Login/Components/Header';

import { SafeAreaView } from 'react-native-safe-area-context';
import { HomeRouteNames, ProfileRouteNames } from '../NavigationTypes';
import MessageNavigation from '../Messages/MessageNavigator';

export default function HomeTabNavigation() {
  const navTheme = DefaultTheme;

  navTheme.colors.background = AppColorPalette.appBackgroundColor;
  const navigation = useNavigation();

  const Tab = createBottomTabNavigator();

  const options = (props: any): BottomTabNavigationOptions => {
    const { route } = props;
    let iconName: string;

    switch (route.name) {
      case HomeRoutes.HOME.displayName:
        iconName = 'home';
        break;
      case HomeRoutes.ORDER.displayName:
        iconName = 'silverware-fork-knife';
        break;
      case HomeRoutes.MESSAGE.displayName:
        iconName = 'message-text-outline';
        break;
      case HomeRoutes.PROFILE.displayName:
        iconName = 'person-circle-outline';
        break;
      case HomeRoutes.SEARCH.displayName:
        iconName = 'search-outline';
        break;
      default:
        iconName = '';
        break;
    }
    return {
      tabBarIcon: ({ focused }) => (
        <Icon
          type={
            route.name === HomeRoutes.PROFILE.displayName ||
              route.name === HomeRoutes.SEARCH.displayName
              ? 'ionicon'
              : 'material-community'
          }
          name={iconName}
          iconStyle={focused ? styles.focus : undefined}
          size={25}
        />
      ),
      tabBarButton: route.name === HomeRoutes.VERIFICATION.displayName ? () => null : undefined,
      tabBarShowLabel: false,
      headerShown: route.name === HomeRoutes.VERIFICATION.displayName || route.name === HomeRoutes.HOME.displayName ? true : false,
      headerStyle: route.name === HomeRoutes.VERIFICATION.displayName ? commonStyles.TransparentHeaderBackground : commonStyles.WhiteHeaderBackground,
      header: (props) => {
        if (route.name === HomeRoutes.VERIFICATION.displayName) {
          return (
            <SafeAreaView>
              <Header backArrow onPressBack={() => navigation.navigate("Profile" as HomeRouteNames['PROFILE'])} />
            </SafeAreaView>
          )
        } else if (route.name === HomeRoutes.HOME.displayName) {
          return (
            <SafeAreaView style={commonStyles.WhiteHeaderBackground}>
              <Header />
            </SafeAreaView>
          )
        }
      }
    };
  };

  return (
    <>
      <Tab.Navigator screenOptions={options}>
        {Object.keys(HomeRoutes).map((key: any) => {
          if (key === HomeRoutes.PROFILE.name) {
            return (
              <Tab.Screen
                name={getKeyValue(key)(HomeRoutes).displayName}
                component={ProfileNavigation}
                key={uuidv4()}
              />
            );
          }
          else if (key === HomeRoutes.MESSAGE.name) {
            return (
              <Tab.Screen
                name={getKeyValue(key)(HomeRoutes).displayName}
                component={MessageNavigation}
                key={uuidv4()}
              />
            );
          }
          return (
            <Tab.Screen
              name={getKeyValue(key)(HomeRoutes).displayName}
              component={getKeyValue(key)(HomeRoutes).component}
              key={uuidv4()}
            />
          );
        })}
      </Tab.Navigator>
    </>
  );
}

const styles = StyleSheet.create({
  focus: {
    color: AppColorPalette.orange,
  },

});
