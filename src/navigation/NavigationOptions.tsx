import React from 'react';
import {
  StackNavigationOptions,
  StackNavigationProp,
} from '@react-navigation/stack';
import {StyleSheet, View} from 'react-native';
import {HomeRoutes} from './Home/routes';
import {Text} from '@rneui/themed';
import {ProfileRoutes} from './Profile/routes';
import {commonStyles} from 'src/config/styles';
import {ProfileNavigationRoutes, ProfileRouteNames} from './NavigationTypes';

export const LoginNavigationOptions: StackNavigationOptions = {
  headerShown: false,
};

export const HomeNavigationOptions: StackNavigationOptions = {
  headerShown: false,
};

export const ProfileNavigationOptions = (
  props: StackNavigationProp<ProfileNavigationRoutes, keyof ProfileRouteNames>,
): StackNavigationOptions => {
  const routeName = props.route.name as keyof ProfileRouteNames;
  const displayName = ProfileRoutes[routeName]?.displayName;
  if (props.route.name === HomeRoutes.PROFILE.name) {
    return {
      headerShown: true,
      header: () => (
        <View style={[commonStyles.FlexColCenterCenter, styles.header]}>
          <Text type="header" style={styles.headerText}>
            Profile
          </Text>
        </View>
      ),
    };
  }
  return {
    title: displayName,
    headerBackTitle: 'Back',
    headerShown: true,
  };
};

const styles = StyleSheet.create({
  header: {
    height: 100,
    backgroundColor: 'white',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    shadowColor: '#171717',
    shadowOffset: {width: -2, height: 4},
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  headerText: {
    marginTop: '8%',
  },
});
