import {DefaultTheme} from '@react-navigation/native';
import React from 'react';
import {AppColorPalette} from 'src/config/styles';
import {
  BottomTabNavigationOptions,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';
import {HomeRoutes} from './routes';
import {Icon} from '@rneui/base';
import {StyleSheet} from 'react-native';
import ProfileNavigation from '../Profile/ProfileNavigation';
import uuidv4 from 'uuidv4';
import {getKeyValue} from 'src/util/helperFunctions';

export default function HomeTabNavigation() {
  const navTheme = DefaultTheme;

  navTheme.colors.background = AppColorPalette.appBackgroundColor;

  const Tab = createBottomTabNavigator();

  const options = (props: any): BottomTabNavigationOptions => {
    const {route} = props;
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
      tabBarIcon: ({focused}) => (
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
      tabBarShowLabel: false,
      headerShown: false,
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
