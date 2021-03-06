import React, {useContext, useEffect} from 'react';
import {StackNavigationOptions, StackNavigationProp} from '@react-navigation/stack';
import {ActivityIndicator, StyleSheet, View} from 'react-native';
import {HomeRoutes} from './Home/routes';
import {AirbnbRating, Button, Icon, Rating, Text} from '@rneui/themed';
import {AllProfileRoutes} from './Profile/routes';
import {AppColorPalette, commonStyles} from 'src/config/styles';
import {
  MessageNavigationRoutes,
  MessageRouteNames,
  ProfileNavigationRoutes,
  ProfileRouteNames,
} from './NavigationTypes';
import ProfilePicture from '@assets/profilePicture.png';
import {UserContext} from 'src/context/UserContext';
import {SafeAreaView, useSafeAreaInsets} from 'react-native-safe-area-context';
import {Image} from '@rneui/themed/dist/Image';
import {useNavigation} from '@react-navigation/core';
import Header from 'src/components/Header';
import {MessageRoutes} from './Messages/routes';
import {useSelector} from 'react-redux';
import {showToast} from 'src/redux/store';

export const HomeNavigationOptions: StackNavigationOptions = {
  headerShown: false,
};

export const MessageNavigationOptions = (
  props: StackNavigationProp<MessageNavigationRoutes, keyof MessageRouteNames>,
): StackNavigationOptions => {
  const navigation = useNavigation();
  const routeName = props.route.name as keyof MessageRouteNames;
  const {recipientDisplayName} = props.route?.params || '';
  const displayName = MessageRoutes[routeName]?.displayName;
  if (routeName === MessageRoutes.MESSAGE_DETAIL.name) {
    return {
      headerShown: true,
      headerStyle: commonStyles.WhiteHeaderBackground,
      header: headerProps => {
        return (
          <SafeAreaView style={commonStyles.WhiteHeaderBackground}>
            <Header
              backArrow
              onPressBack={() => navigation.navigate('MESSAGE')}
              headerText={recipientDisplayName}
            />
          </SafeAreaView>
        );
      },
    };
  }
  return {
    headerShown: true,
    headerStyle: commonStyles.WhiteHeaderBackground,
    header: headerProps => {
      return (
        <SafeAreaView style={commonStyles.WhiteHeaderBackground}>
          <Header headerText={displayName} />
        </SafeAreaView>
      );
    },
  };
};

export const ProfileNavigationOptions = (
  props: StackNavigationProp<ProfileNavigationRoutes, keyof ProfileRouteNames>,
  {profilePictureUri, isLoadingProfilePictureUri, userInfo, toast}: any,
): StackNavigationOptions => {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();
  const routeName = props.route.name as keyof ProfileRouteNames;
  const displayName = AllProfileRoutes[routeName]?.displayName;

  if (props.route.name === HomeRoutes.PROFILE.name) {
    return {
      headerShown: true,
      header: () => (
        <SafeAreaView style={[commonStyles.FlexColCenterCenter, styles.header]}>
          <Icon
            color={AppColorPalette.orange}
            style={styles.notificationIcon}
            containerStyle={[
              styles.notificationIconContainer,
              {
                top: insets.bottom > 30 ? 56 : 45,
                right: insets.bottom > 30 ? 25 : 40,
              },
            ]}
            type="material"
            name="notification-important"
          />
          <View
            style={[
              commonStyles.FlexRowCenterCenter,
              styles.HeaderWrapper,
              {marginTop: insets.bottom > 30 ? '7%' : '0%'},
            ]}>
            <View>
              <Image
                source={
                  !isLoadingProfilePictureUri && !profilePictureUri
                    ? ProfilePicture
                    : {uri: profilePictureUri}
                }
                style={styles.image}
                containerStyle={styles.imageContainer}
                PlaceholderContent={<ActivityIndicator />}
              />
            </View>
            <View style={[commonStyles.FlexColStartCenter, styles.headerContentContainer]}>
              <Text type="label" style={styles.headerText} numberOfLines={1}>
                Chef {userInfo?.displayname.split(' ')[1]}
              </Text>
              <AirbnbRating
                isDisabled={true}
                defaultRating={5}
                reviews={['']}
                size={15}
                starContainerStyle={styles.starRating}
                ratingContainerStyle={styles.rating}
              />
              <Button
                mode="miniRed"
                title="Verify"
                type="solid"
                style={styles.button}
                onPress={() => navigation.navigate('Verification')}
              />
            </View>
          </View>
        </SafeAreaView>
      ),
    };
  } else if (props.route.name === AllProfileRoutes.MENU_DETAILS_ADD.name) {
    const menuId = props.route.params.menuId;
    const newItem = props.route.params.new;
    const detail = props.route.params.detail;
    const editing = props.route.params.editing;
    return {
      headerShown: true,
      header: headerProps => {
        return (
          <>
            <SafeAreaView style={commonStyles.WhiteHeaderBackground}>
              <Header
                backArrow
                headerText={editing ? `Edit ${detail}` : `New ${detail}`}
                onPressBack={() => navigation.navigate('MENU_DETAILS', {menuId, new: newItem})}
              />
            </SafeAreaView>
          </>
        );
      },
    };
  } else if (props.route.name === AllProfileRoutes.MENU_DETAILS.name) {
    const newItem = props.route.params.new;
    return {
      headerShown: true,
      header: headerProps => {
        return (
          <>
            <SafeAreaView style={commonStyles.WhiteHeaderBackground}>
              <Header
                backArrow
                headerText={newItem ? 'New Menu' : 'Menu Details'}
                onPressBack={
                  // sub navigation fix, if we are on menu details, back should take us to menus. Not profile.
                  props.route.name === AllProfileRoutes.MENU_DETAILS.name
                    ? () => navigation.navigate('MENUS')
                    : () => navigation.navigate('PROFILE')
                }
              />
            </SafeAreaView>
          </>
        );
      },
    };
  } else
    return {
      headerShown: true,
      header: headerProps => {
        return (
          <SafeAreaView style={commonStyles.WhiteHeaderBackground}>
            <Header
              backArrow
              headerText={displayName}
              onPressBack={
                // sub navigation fix, if we are on menu details, back should take us to menus. Not profile.
                props.route.name === AllProfileRoutes.MENU_DETAILS.name
                  ? () => navigation.navigate('MENUS')
                  : () => navigation.navigate('PROFILE')
              }
            />
          </SafeAreaView>
        );
      },
    };
};

const styles = StyleSheet.create({
  header: {
    height: 150,
    backgroundColor: 'white',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    shadowColor: '#171717',
    shadowOffset: {width: -2, height: 4},
    shadowOpacity: 0.1,
    position: 'relative',
    shadowRadius: 3,
  },
  HeaderWrapper: {
    width: '100%',
  },
  image: {
    height: 80,
    width: 80,
  },
  notificationIconContainer: {
    width: 50,
    height: 50,
    position: 'absolute',
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
    width: '50%',
    padding: 0,
  },
  button: {},
});
