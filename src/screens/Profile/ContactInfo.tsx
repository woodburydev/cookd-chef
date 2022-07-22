import { Image, Text } from '@rneui/themed';
import React, { useCallback, useContext, useEffect, useState } from 'react';
import { View, StyleSheet, ImagePickerIOS, Platform } from 'react-native';
import { AppColorPalette } from 'src/config/styles';
import ProfilePicture from '@assets/chefProfilePicture.jpeg';
import { ScrollView } from 'react-native-gesture-handler';
import { Icon } from '@rneui/base';
import { WINDOW_HEIGHT } from 'src/config/constants';
import * as ImagePicker from 'react-native-image-picker';
import Axios from 'axios';
import { endpoint } from 'src/config/api';
import { UserContext } from 'src/context/UserContext';
import axios from 'axios';

export default function ContactInfo() {
  const [photo, setPhoto] = useState<any>();
  const { user, profilePicture } = useContext(UserContext);

  const onImageLibraryPress = useCallback(() => {
    const options = {
      title: "Select Image",
      storageOptions: {
        skipBackup: true,
        path: "images"
      },
      selectionLimit: 1,
      mediaType: 'photo',
      includeBase64: false,
    };
    ImagePicker.launchImageLibrary(options, (response) => {
      if (response && response.assets && response.assets[0]) {
        const photo = response.assets[0]
        // initilizing form data

        let formData = new FormData();

        formData.append('file', {
          uri:
            Platform.OS === 'android'
              ? photo.uri
              : photo.uri!.replace('file://', ''),
          type: photo.type,
          name: photo.fileName,

        });
        formData.append('userEmail', user!.email)
        let res = fetch(
          `${endpoint}/cook/profilePicture`,
          {
            method: 'post',
            body: formData,
            headers: {
              'Content-Type': 'multipart/form-data; ',
            },
          }
        )
          .then(res => {
            profilePicture!.setForceUpdateOfProfilePicture(!profilePicture!.forceUpdateOfProfilePicture)
          })
          .catch(err => console.log(err));
      }
    });
  }, []);

  return (
    <ScrollView contentContainerStyle={styles.pageContainer}>
      <View style={styles.imageContainerView}>
        <Image
          source={{ uri: profilePicture!.linkToProfilePicture }}
          style={styles.image}
          containerStyle={styles.imageContainer}
        />
        <View style={styles.imageIconContainerView}>
          <Icon
            size={WINDOW_HEIGHT < 750 ? 15 : 18}
            onPress={onImageLibraryPress}
            color={AppColorPalette.orange}
            type="material"
            name="edit"
          />
        </View>
      </View>
      <View style={styles.whiteBackgroundView}>
        <View style={styles.whiteBackgroundText}>
          <View style={styles.insideTextContainer}>
            <Text type="label">Address:</Text>
            <Text>123 Main Street</Text>
            <Text>San Francisco, CA 94016</Text>
          </View>
          <Icon
            size={18}
            color={AppColorPalette.orange}
            style={styles.notificationIcon}
            containerStyle={[styles.notificationIconContainer, { right: 10, top: 5 }]}
            type="material"
            name="edit"
          />
        </View>
      </View>
      <View style={styles.whiteBackgroundView}>
        <View style={styles.whiteBackgroundText}>
          <View style={styles.insideTextContainer}>
            <Text type="label">Phone Number:</Text>
            <Text>(916) 352-2765</Text>
          </View>
          <Icon
            size={18}
            color={AppColorPalette.orange}
            style={styles.notificationIcon}
            containerStyle={[styles.notificationIconContainer, { right: 10, top: 5 }]}
            type="material"
            name="edit"
          />
        </View>
      </View>
      <View style={styles.whiteBackgroundView}>
        <View style={styles.whiteBackgroundText}>
          <View style={styles.insideTextContainer}>
            <Text type="label">Email:</Text>
            <Text>NathanielWoodbury@gmail.com</Text>
          </View>
          <Icon
            size={18}
            color={AppColorPalette.orange}
            style={styles.notificationIcon}
            containerStyle={[styles.notificationIconContainer, { right: 10, top: 5 }]}
            type="material"
            name="edit"
          />
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  image: {
    borderRadius: 100,
    height: WINDOW_HEIGHT / 6,
    width: WINDOW_HEIGHT / 6,
  },
  imageIconContainerView: {
    height: WINDOW_HEIGHT < 750 ? 30 : 40,
    width: WINDOW_HEIGHT < 750 ? 30 : 40,
    bottom: 20,
    backgroundColor: 'white',
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
  },
  notificationIconContainer: {
    width: 50,
    height: 50,
    position: 'absolute',
    paddingLeft: 30,
  },
  notificationIcon: {
    top: 5,
    color: 'orange',
  },
  pageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '90%',
  },
  insideTextContainer: {
    width: '90%',
  },
  whiteBackgroundText: {
    width: '90%',
    left: 20,
  },
  imageContainer: {},
  imageContainerView: {
    alignItems: 'center',
    justifyContent: 'center',
    top: 30,
  },
  whiteBackgroundView: {
    backgroundColor: 'white',
    width: '80%',
    marginTop: 20,
    paddingTop: 20,
    paddingBottom: 20,
    borderRadius: 20,
    alignItems: 'flex-start',
  },
});
