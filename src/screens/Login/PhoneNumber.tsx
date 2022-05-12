import {useNavigation} from '@react-navigation/core';
import {Button, Icon, Input, Text} from '@rneui/themed';
import React, {useCallback, useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  KeyboardAvoidingView,
  ActivityIndicator,
} from 'react-native';
import {commonStyles} from 'src/config/styles';
import {LoginRoutes} from 'src/navigation/Login/routes';
import auth, {FirebaseAuthTypes} from '@react-native-firebase/auth';
import {LoginRoutesNames} from 'src/navigation/NavigationTypes';

const countryCode = '+1';

export default function PhoneNumber() {
  const navigation = useNavigation();
  const [userPhoneNumber, setUserPhoneNumber] = useState('');

  const [loading, setLoading] = useState(false);
  const [confirm, setConfirm] =
    useState<FirebaseAuthTypes.ConfirmationResult>();
  const [phoneErrorText, setPhoneErrorText] = useState('');

  const submit = () => {
    setLoading(true);
    if (userPhoneNumber.length !== 14) {
      setPhoneErrorText('Please enter a valid phone number');
      setLoading(false);
    } else {
      confirmDetails();
    }
  };

  const sentOTP = useCallback(async () => {
    await auth()
      .signInWithPhoneNumber(countryCode + userPhoneNumber)
      .then(res => {
        setConfirm(res);
      })
      .catch(err => {
        console.log(err);
        if (err.code === 'auth/invalid-phone-number') {
          setPhoneErrorText('Please enter a valid phone number');
        }
        setLoading(false);
      });
  }, [userPhoneNumber]);

  const confirmDetails = useCallback(async () => {
    sentOTP();
  }, [sentOTP]);

  useEffect(() => {
    if (confirm) {
      setLoading(false);
      navigation.navigate(
        LoginRoutes.ENTER_OTP.name as LoginRoutesNames['ENTER_OTP'],
        {
          confirm,
        },
      );
    }
  }, [confirm, confirmDetails, navigation, userPhoneNumber]);

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
    return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(
      3,
      6,
    )}-${phoneNumber.slice(6, 10)}`;
  }

  return (
    <View style={commonStyles.FlexColCenterCenter}>
      <View style={commonStyles.FlexColCenterCenter}>
        <View style={styles.SectionStyle}>
          <View />
          <View style={styles.inputContainer}>
            <Text type="label" style={styles.labelText}>
              Whats your number?
            </Text>
            <Input
              autoFocus={true}
              shake={() => {}}
              placeholder="(555) 555-5555"
              onSubmitEditing={() => submit()}
              textContentType="telephoneNumber"
              value={formatPhoneNumber(userPhoneNumber)}
              onChangeText={number => {
                setUserPhoneNumber(number);
                setPhoneErrorText('');
              }}
              maxLength={14}
              keyboardType="number-pad"
              errorMessage={phoneErrorText}
            />
          </View>

          <KeyboardAvoidingView
            style={[styles.buttonView]}
            keyboardVerticalOffset={50}
            behavior="position">
            <Button
              onPress={() => (loading ? undefined : submit())}
              circle={true}
              icon={
                loading ? (
                  <ActivityIndicator color="white" />
                ) : (
                  <Icon
                    type="material-icons"
                    name="arrow-forward"
                    iconStyle={styles.iconStyle}
                    size={25}
                  />
                )
              }
              style={styles.Button}
            />
          </KeyboardAvoidingView>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  SectionStyle: {
    width: '80%',
    height: '100%',
    marginTop: '15%',
    justifyContent: 'space-around',
  },
  inputContainer: {
    bottom: '10%',
  },
  Button: {
    alignSelf: 'flex-end',
  },
  buttonView: {
    top: '4%',
  },
  inputStyle: {
    color: 'black',
  },
  labelText: {
    marginLeft: 10,
    marginBottom: 20,
  },
  iconStyle: {
    color: 'white',
  },
});
