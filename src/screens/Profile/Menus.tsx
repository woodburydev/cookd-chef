import {Button, ButtonGroup, Image, Text} from '@rneui/themed';
import React, {useEffect} from 'react';
import {View, StyleSheet, ActivityIndicator, DeviceEventEmitter} from 'react-native';
import {AppColorPalette, commonStyles} from 'src/config/styles';
import Tacos from '@assets/tacos.jpg';
import Ravioli from '@assets/pasta.jpg';
import {ScrollView, TouchableOpacity} from 'react-native-gesture-handler';
import {useNavigation} from '@react-navigation/core';
import {Icon} from '@rneui/base';
import {
  useGetMenuImageQuery,
  useGetMenusFromUserQuery,
  useGetUserQuery,
  useLazyGetUserQuery,
} from 'src/redux/store';
import auth from '@react-native-firebase/auth';

const data = [
  {
    title: 'Gormet Mexican Food',
    menuId: 1,
    description:
      'Wide range of traditional Mexican food, from tacos to enchaladas, my personal favorites learned from Mexico.',
    costPerGuest: 75,
    image: Tacos,
  },
  {
    title: 'Specialty Italian',
    menuId: 2,
    description:
      'Fantastic Ravioli with garlic herb butter (can be substituted if needed), with a glass of wine on the side. Garlic bread sticks included',
    costPerGuest: 80,
    image: Ravioli,
  },
];

export default function Menus() {
  const navigation = useNavigation();
  const fbuuid = auth().currentUser?.uid;
  const {data: userInfo} = useGetUserQuery();
  const {data: menus, isFetching} = useGetMenusFromUserQuery(userInfo.fbuuid);

  useEffect(() => {
    DeviceEventEmitter.emit('event.isLoading', isFetching);
  }, [isFetching]);

  if (isFetching) {
    return <ActivityIndicator />;
  }

  return (
    <ScrollView contentContainerStyle={styles.pageContainer}>
      <View style={[commonStyles.FlexColStartStart, {flex: 1}]}>
        <View style={[styles.HeaderTextSection]}>
          <Text type="large-header" style={[commonStyles.mx20]}>
            Your Menu's
          </Text>
        </View>
        {menus.length > 0
          ? menus.map(item => (
              <TouchableOpacity
                onPress={() => navigation.navigate('MENU_DETAILS', {menuId: item.id, new: false})}
                style={[styles.ContainerStyle]}>
                <View style={styles.MenuItemTextContainer}>
                  <Text
                    type="label"
                    style={[commonStyles.mt10, commonStyles.mb20, styles.orangeLabelText]}>
                    {item.title}
                  </Text>
                  <Text numberOfLines={5} style={{marginRight: 15, height: 90}}>
                    {item.description}
                  </Text>
                  <Text style={[commonStyles.mx20, styles.orangeLabelText]}>
                    ${item.cost_per_person}/guest
                  </Text>
                </View>
                <View style={styles.ImageWrapper}>
                  <Image
                    source={item.filename.length > 0 ? {uri: JSON.parse(item.filename)} : {uri: ''}}
                    style={styles.ImageContainer}
                  />
                </View>
              </TouchableOpacity>
            ))
          : data.map(item => (
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate('MENU_DETAILS', {menuId: item.menuId, new: false})
                }
                style={[styles.ContainerStyle]}>
                <View style={styles.MenuItemTextContainer}>
                  <Text
                    type="label"
                    style={[commonStyles.mt10, commonStyles.mb20, styles.orangeLabelText]}>
                    {item.title}
                  </Text>
                  <Text numberOfLines={5} style={{marginRight: 15, height: 90}}>
                    {item.description}
                  </Text>
                  <Text style={[commonStyles.mx20, styles.orangeLabelText]}>
                    ${item.costPerGuest}/guest
                  </Text>
                </View>
                <View style={styles.ImageWrapper}>
                  <Image
                    source={item.image}
                    style={styles.ImageContainer}
                    // PlaceholderContent={<ActivityIndicator />}
                  />
                  <View style={styles.imageIconContainerView}>
                    <Icon
                      size={20}
                      color={AppColorPalette.orange}
                      style={styles.notificationIcon}
                      containerStyle={[styles.notificationIconContainer, {right: 10, top: 5}]}
                      type="material"
                      name="edit"
                    />
                  </View>
                </View>
              </TouchableOpacity>
            ))}
      </View>
      <Button
        onPress={() => navigation.navigate('MENU_DETAILS', {new: true})}
        style={{alignSelf: 'center', marginTop: 20, marginBottom: 30}}
        title="Add New Menu"
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  HeaderTextSection: {
    marginLeft: 20,
    marginTop: 20,
  },
  imageIconContainerView: {
    height: 30,
    width: 30,
    left: 22,
    bottom: 40,
    backgroundColor: 'white',
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
  },
  notificationIconContainer: {
    width: 25,
    alignItems: 'center',
    left: 3,
    justifyContent: 'center',
    height: 25,
    position: 'absolute',
  },
  notificationIcon: {
    color: 'orange',
  },
  pageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '90%',
  },
  ImageContainer: {
    height: '100%',
    width: '90%',
    left: '10%',
  },
  ImageWrapper: {
    width: '40%',
    flex: 1,
  },
  MenuItemTextContainer: {
    width: '50%',
    marginLeft: 20,
  },
  HeaderTextSectionContent: {
    width: '90%',
  },
  orangeLabelText: {
    color: AppColorPalette.orange,
    fontWeight: '600',
  },
  ContainerStyle: {
    ...commonStyles.mb20,
    backgroundColor: 'white',
    height: 200,
    flexDirection: 'row',
    width: '100%',
    marginBottom: 20,
  },
});
