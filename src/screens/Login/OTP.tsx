import {Button, Text} from '@rneui/themed';
import React, {useCallback, useContext, useEffect, useState} from 'react';
import {ActivityIndicator, Dimensions, KeyboardAvoidingView, StyleSheet, View} from 'react-native';
import auth from '@react-native-firebase/auth';

import {commonStyles} from '@config/styles';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/core';
import {LoginNavigationRoutes, LoginRoutesNames} from 'src/navigation/NavigationTypes';
import {LoginRoutes} from 'src/navigation/Login/routes';
import {UserContext} from 'src/context/UserContext';
import {CodeField, useBlurOnFulfill} from 'react-native-confirmation-code-field';
import {WINDOW_HEIGHT} from 'src/config/constants';
import t from 'tailwind';

const CELL_COUNT = 6;

export default function EnterOTP() {
  const navigation = useNavigation();
  const [value, setValue] = useState('');
  const ref = useBlurOnFulfill({value, cellCount: CELL_COUNT});
  const {loadingUserContext} = useContext(UserContext);
  const [readyToMove, setReadyToMove] = useState(false);

  const route = useRoute<RouteProp<LoginNavigationRoutes, LoginRoutesNames['ENTER_OTP']>>();

  const {confirm} = route.params;

  const [loading, setLoading] = useState(false);
  const [errorText, setErrorText] = useState('');

  const login = useCallback(() => {
    return new Promise(async (resolve, reject) => {
      confirm
        .confirm(value)
        .then((res) => {
          resolve(res);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }, [confirm, value]);

  useEffect(() => {
    if (value.length === 6 && !errorText && !loading) {
      setLoading(true);
      login()
        .then(() => {
          setReadyToMove(true);
        })
        .catch((err) => {
          console.log(err.code);
          if (err?.code === 'auth/invalid-verification-code') {
            setErrorText('Invalid Code');
          } else if (err.code === 'auth/missing-verification-code') {
            setErrorText('Missing Verification Code');
          } else if (err.code === 'auth/code-expired') {
            setErrorText('Code Expired, Please Resend Text');
          } else {
            setErrorText('Oops, something went wrong.');
          }
          setLoading(false);
        });
    }
  }, [loadingUserContext, value, login, navigation, loading, errorText]);

  useEffect(() => {
    // "ready to move" is a silly trick used to fix react error
    if (readyToMove) {
      if (!loadingUserContext) {
        const email = auth().currentUser?.email;
        if (email) {
          navigation.navigate(LoginRoutes.ADDRESS.name as LoginRoutesNames['ADDRESS']);
        } else {
          navigation.navigate(LoginRoutes.SIGN_UP.name as LoginRoutesNames['SIGN_UP']);
        }
      }
    }
  }, [readyToMove, loadingUserContext, navigation]);

  return (
    <View style={commonStyles.FlexColCenterCenter}>
      <KeyboardAvoidingView behavior="position" style={t`w-full`} keyboardVerticalOffset={40}>
        <View style={t`items-start self-center w-10/12`}>
          <View style={t`row-center-start`}>
            <Text style={t`ml-2`} type="header">
              What's the code?
            </Text>
            {loading ? <ActivityIndicator style={t`left-5 bottom-0`} color="black" /> : null}
          </View>

          <CodeField
            ref={ref}
            autoFocus={true}
            value={value}
            onChangeText={(text) => {
              setValue(text);
              setErrorText('');
            }}
            cellCount={CELL_COUNT}
            rootStyle={t`mt-5`}
            keyboardType="number-pad"
            textContentType="oneTimeCode"
            renderCell={({index, symbol}) => (
              <View
                key={index}
                style={[commonStyles.FlexColCenterCenter, t`w-10 h-15 text-2xl border-b ml-2`]}
              >
                <Text style={t`text-3xl font-bold`}>{symbol}</Text>
              </View>
            )}
          />
          {errorText.length > 0 && (
            <Text type="error" style={t`mt-6 ml-2 mb-1`}>
              {errorText}
            </Text>
          )}
          <Text style={t`mt-8 ml-2`} type="info">
            You’ll recieve a text with a code within a couple minutes.
          </Text>
          {WINDOW_HEIGHT > 850 ? (
            <Text style={t`mt-8 ml-2`} type="info">
              Check your phone number, or click resend text if you didn’t recieve it.
            </Text>
          ) : null}

          <Button mode="warning" onPress={() => login()} title="Resend Text" style={t`mt-8 ml-2`} />
        </View>
      </KeyboardAvoidingView>
    </View>
  );
}
