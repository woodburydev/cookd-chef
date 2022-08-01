import {Button, Image, Input, Text} from '@rneui/themed';
import React, {useCallback, useEffect, useState} from 'react';
import {View, StyleSheet, Dimensions, Platform, KeyboardAvoidingView} from 'react-native';
import {AppColorPalette, commonStyles} from 'src/config/styles';
import {ScrollView} from 'react-native-gesture-handler';
import {Icon} from '@rneui/base';
import ProfilePicture from '@assets/profilePicture.png';
import * as ImagePicker from 'react-native-image-picker';
import auth from '@react-native-firebase/auth';
import {
  updateUserRefetchAction,
  useAddProfilePictureMutation,
  useGetProfilePictureQuery,
  useGetUserQuery,
  useUpdateUserMutation,
} from 'src/redux/store';
import {useDispatch, useSelector} from 'react-redux';
import axios from 'axios';

const screenWidth = Dimensions.get('window').width;
const deviceHeight = Dimensions.get('window').height;
const fbuuid = auth().currentUser?.uid;
export default function ContactInfo() {
  const {data: userInfo, isFetching: isFetchingUserInformation} = useGetUserQuery();
  const [fullName, setFullName] = useState<string>();
  const [phoneNumber, setPhoneNumber] = useState<string>();
  const [email, setEmail] = useState<string>();
  const [emailError, setEmailError] = useState('');
  const [phoneNumberError, setPhoneNumberError] = useState('');
  const dispatch = useDispatch();
  const {data: profilePictureUri, isFetching: loadingProfilePicture} = useGetProfilePictureQuery();
  const [
    updateProfilePicture, // This is the mutation trigger
    {isLoading: isUpdating, error}, // This is the destructured mutation result
  ] = useAddProfilePictureMutation();
  const [
    updateUser,
    // This is the mutation trigger
    {data: updateUserResponse}, // This is the destructured mutation result
  ] = useUpdateUserMutation();

  const onImageLibraryPress = useCallback(() => {
    const options = {
      title: 'Select Image',
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
      includeExtra: true,
      selectionLimit: 1,
      mediaType: 'photo',
      includeBase64: false,
    };

    ImagePicker.launchImageLibrary(options, response => {
      if (response && response.assets && response.assets[0]) {
        const photo = response.assets[0];

        // initilizing form data
        const formData = new FormData();

        formData.append('file', {
          uri: Platform.OS === 'android' ? photo.uri : photo.uri!.replace('file://', ''),
          type: photo.type,
          name: photo.fileName,
        });
        formData.append('fbuuid', userInfo.fbuuid);

        updateProfilePicture(formData);
      }
    });
  }, [userInfo]);

  useEffect(() => {
    dispatch(updateUserRefetchAction(true));
    return () => {
      dispatch(updateUserRefetchAction(false));
    };
  }, []);

  const updateProfileInformation = () => {
    // not updating these yet because it requires verification. but here for when it is available.
    if (phoneNumber && phoneNumber.length !== 14) {
      setPhoneNumberError(true);
    }

    updateUser({
      displayname: fullName,
      email,
      phone: phoneNumber,
      fbuuid,
    }).then(res => {
      const error = res.error;
      if (error) {
        const message = Array.isArray(error.data.message)
          ? error.data.message[0]
          : error.data.message;
        if (message === 'email must be an email') {
          setEmailError('Please enter a valid email');
        } else if (message === 'email already in-use') {
          setEmailError('Email is already in use');
        } else {
          setEmailError(message);
        }
      }
    });
  };

  function formatPhoneNumber(value: string) {
    if (!value) {
      return value;
    }
    const phoneNumber = value.replace(/[^\d]/g, '');
    const phoneNumberLength = phoneNumber.length;
    if (phoneNumberLength < 4) {
      return phoneNumber;
    }
    if (phoneNumberLength < 7) {
      return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3)}`;
    }
    return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3, 6)}-${phoneNumber.slice(6, 10)}`;
  }
  return (
    <ScrollView
      contentContainerStyle={{
        minHeight: deviceHeight > 750 ? '100%' : '110%',
        flexDirection: 'column',
        justifyContent: 'center',
      }}>
      <KeyboardAvoidingView
        style={{}}
        behavior={'position'}
        keyboardVerticalOffset={deviceHeight > 850 ? 0 : 30}
        contentContainerStyle={{
          width: screenWidth,
          alignItems: 'center',
        }}>
        <View style={styles.imageContainerView}>
          <Image
            source={
              !isUpdating && !loadingProfilePicture && !profilePictureUri
                ? ProfilePicture
                : {uri: profilePictureUri}
            }
            style={styles.image}
            containerStyle={styles.imageContainer}
          />
          <View style={styles.imageIconContainerView}>
            <Icon
              size={windowHeight < 750 ? 15 : 18}
              onPress={onImageLibraryPress}
              color={AppColorPalette.orange}
              type="material"
              name="edit"
            />
          </View>
        </View>
        <View style={[styles.whiteBackgroundView, {marginTop: 0}]}>
          <View style={styles.whiteBackgroundText}>
            <View style={styles.insideTextContainer}>
              <Text type="label">Full Name:</Text>
              <Input
                shake={() => null}
                defaultValue={userInfo.displayname}
                onChangeText={setFullName}
                containerStyle={[
                  {
                    width: '100%',
                    height: 30,
                  },
                  commonStyles.FlexColCenterStart,
                ]}
                inputStyle={{
                  fontSize: 15,
                }}
                inputContainerStyle={{
                  padding: 0,
                  right: 2,
                  width: '110%',
                  height: 30,
                }}
              />
            </View>
            <Icon
              size={18}
              color={AppColorPalette.orange}
              style={styles.notificationIcon}
              containerStyle={[styles.notificationIconContainer, {right: 10, top: 5}]}
              type="material"
              name="edit"
            />
          </View>
        </View>
        <View style={[styles.whiteBackgroundView, emailError.length > 0 && {paddingBottom: 30}]}>
          <View style={styles.whiteBackgroundText}>
            <View style={styles.insideTextContainer}>
              <Text type="label">Email:</Text>
              <Input
                errorMessage={emailError}
                errorStyle={{
                  alignSelf: 'flex-start',
                  position: 'relative',
                  right: 10,
                }}
                shake={() => null}
                defaultValue={userInfo.email}
                onChangeText={setEmail}
                containerStyle={[
                  {
                    width: '100%',
                    height: 30,
                  },
                  commonStyles.FlexColCenterStart,
                ]}
                inputStyle={{
                  fontSize: 15,
                }}
                inputContainerStyle={{
                  padding: 0,
                  right: 2,
                  width: '110%',
                  height: 30,
                }}
              />
            </View>
            <Icon
              size={18}
              color={AppColorPalette.orange}
              style={styles.notificationIcon}
              containerStyle={[styles.notificationIconContainer, {right: 10, top: 5}]}
              type="material"
              name="edit"
            />
          </View>
        </View>
        <View
          style={[styles.whiteBackgroundView, phoneNumberError.length > 0 && {paddingBottom: 30}]}>
          <View style={styles.whiteBackgroundText}>
            <View style={styles.insideTextContainer}>
              <Text type="label">Phone Number:</Text>
              <Input
                disabled={true}
                disabledInputStyle={{opacity: 1}}
                value={formatPhoneNumber(userInfo.phone)}
                keyboardType="number-pad"
                errorMessage={phoneNumberError}
                errorStyle={{
                  alignSelf: 'flex-start',
                  position: 'relative',
                  right: 10,
                }}
                shake={() => null}
                onChangeText={setPhoneNumber}
                containerStyle={[
                  {
                    width: '100%',
                    height: 30,
                  },
                  commonStyles.FlexColCenterStart,
                ]}
                inputStyle={{
                  fontSize: 15,
                }}
                inputContainerStyle={{
                  padding: 0,
                  right: 2,
                  width: '110%',
                  height: 30,
                }}
              />
            </View>
          </View>
        </View>
        <View
          style={[styles.whiteBackgroundView, phoneNumberError.length > 0 && {paddingBottom: 30}]}>
          <View style={styles.whiteBackgroundText}>
            <View style={styles.insideTextContainer}>
              <Text type="label">Address:</Text>
              <Input
                disabled={true}
                disabledInputStyle={{opacity: 1}}
                value={userInfo.address}
                errorMessage={phoneNumberError}
                errorStyle={{
                  alignSelf: 'flex-start',
                  position: 'relative',
                  right: 10,
                }}
                shake={() => null}
                onChangeText={setPhoneNumber}
                containerStyle={[
                  {
                    width: '100%',
                    height: 30,
                  },
                  commonStyles.FlexColCenterStart,
                ]}
                inputStyle={{
                  fontSize: 15,
                }}
                inputContainerStyle={{
                  padding: 0,
                  right: 3,
                  width: '110%',
                  height: 30,
                }}
              />
            </View>
            {/* <Icon
              size={18}
              color={AppColorPalette.orange}
              style={styles.notificationIcon}
              containerStyle={[
                styles.notificationIconContainer,
                {right: 10, top: 5},
              ]}
              type="material"
              name="edit"
            /> */}
          </View>
        </View>
        <View style={{marginBottom: 25}}>
          <Button
            onPress={updateProfileInformation}
            title="Update"
            containerStyle={{marginTop: 25}}
          />
        </View>

        {/* <View style={styles.whiteBackgroundView}>
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
            containerStyle={[
              styles.notificationIconContainer,
              {right: 10, top: 5},
            ]}
            type="material"
            name="edit"
          />
        </View>
      </View> */}
      </KeyboardAvoidingView>
    </ScrollView>
  );
}

const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
  image: {
    borderRadius: 100,
    height: windowHeight / 6,
    width: windowHeight / 6,
  },
  imageIconContainerView: {
    height: windowHeight < 750 ? 30 : 40,
    width: windowHeight < 750 ? 30 : 40,
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
    minHeight: '100%',
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
    marginTop: deviceHeight < 750 ? 20 : 30,
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
