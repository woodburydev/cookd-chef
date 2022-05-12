import React, { useContext } from 'react';
import {
  StackNavigationOptions,
  StackNavigationProp,
} from '@react-navigation/stack';
import { ActivityIndicator, Dimensions, EdgeInsetsPropType, StyleSheet, View } from 'react-native';
import { HomeRoutes } from './Home/routes';
import { AirbnbRating, Button, Icon, Rating, Text } from '@rneui/themed';
import { ProfileRoutes } from './Profile/routes';
import ChefProfilePicture from '@assets/chefProfilePicture.jpeg';
import { AppColorPalette, commonStyles } from 'src/config/styles';
import { HomeRouteNames, ProfileNavigationRoutes, ProfileRouteNames } from './NavigationTypes';
import { UserContext } from 'src/context/UserContext';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { Image } from '@rneui/themed/dist/Image';
import { CommonActions, useNavigation, useNavigationState } from '@react-navigation/core';
import Header from 'src/screens/Login/Components/Header';
import { HeaderBackButton } from '@react-navigation/elements';

export const HomeNavigationOptions: StackNavigationOptions = {
  headerShown: false,
};

const windowHeight = Dimensions.get('window').height;

export const ProfileNavigationOptions = (
  props: StackNavigationProp<ProfileNavigationRoutes, keyof ProfileRouteNames>,
): StackNavigationOptions => {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();
  const { user } = useContext(UserContext);
  const routeName = props.route.name as keyof ProfileRouteNames;
  // seperate sames to save first and last name in DB to display only first name for responsive compatibility
  const displayName = ProfileRoutes[routeName]?.displayName;
  if (props.route.name === HomeRoutes.PROFILE.name) {
    return {
      headerShown: true,
      header: () => (
        <SafeAreaView style={[commonStyles.FlexColCenterCenter, styles.header]} >
          <Icon color={AppColorPalette.orange} style={styles.notificationIcon} containerStyle={[styles.notificationIconContainer, { top: insets.bottom > 30 ? 56 : 45, right: insets.bottom > 30 ? 25 : 40 }]} type="material" name="notification-important" />
          <View style={[commonStyles.FlexRowCenterCenter, styles.HeaderWrapper, { marginTop: insets.bottom > 30 ? "7%" : '0%' }]}>
            <View>
              <Image
                source={ChefProfilePicture}
                style={styles.image}
                containerStyle={styles.imageContainer}
                PlaceholderContent={<ActivityIndicator />}
              />
            </View>
            <View style={[commonStyles.FlexColStartCenter, styles.headerContentContainer]}>
              <Text type="label" style={styles.headerText} numberOfLines={1}>
                Chef {user?.displayname.split(" ")[1]}
              </Text>
              <AirbnbRating
                isDisabled={true}
                defaultRating={5}
                reviews={['']}
                size={15}
                starContainerStyle={styles.starRating}
                ratingContainerStyle={styles.rating}
              />
              <Button mode="miniRed" title="VERIFY" type="solid" style={styles.button} onPress={() => navigation.navigate("Verification")} />
            </View>
          </View>
        </SafeAreaView>
      ),
    };
  } else {
    return {
      headerShown: true,
      header: (headerProps) => {

        return (
          <SafeAreaView>
            <Header backArrow loading={0} onPressBack={() => navigation.navigate('PROFILE')} isVisible />
          </SafeAreaView>
        )
      }
    }
  }
};

const styles = StyleSheet.create({
  header: {
    height: 150,
    backgroundColor: 'white',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    shadowColor: '#171717',
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.1,
    position: 'relative',
    shadowRadius: 3,
  },
  HeaderWrapper: {
    width: "100%",
  },
  image: {
    height: 80,
    width: 80,
  },
  notificationIconContainer: {
    width: 50,
    height: 50,
    position: 'absolute'
  },
  notificationIcon: {
    color: 'orange',
  },
  imageContainer: {
    borderRadius: 50,
    marginRight: 15,
  },
  starRating: {
    height: 20,
    bottom: 18,
    padding: 0,
  },
  rating: {
    height: 20,
  },
  headerText: {
    width: '90%',
    flex: 1,
  },
  headerContentContainer: {
    margin: 0,
    width: "50%",
    padding: 0,
  },
  button: {
  }
});
