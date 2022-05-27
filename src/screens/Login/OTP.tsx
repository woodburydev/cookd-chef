import {Button, Text} from '@rneui/themed';
import React, {useCallback, useContext, useEffect, useState} from 'react';
import {
  ActivityIndicator,
  Dimensions,
  KeyboardAvoidingView,
  StyleSheet,
  View,
} from 'react-native';
import auth from '@react-native-firebase/auth';

import {commonStyles} from '@config/styles';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/core';
import {
  LoginNavigationRoutes,
  LoginRoutesNames,
} from 'src/navigation/NavigationTypes';
import {LoginRoutes} from 'src/navigation/Login/routes';
import {UserContext} from 'src/context/UserContext';
import {
  CodeField,
  useBlurOnFulfill,
} from 'react-native-confirmation-code-field';
import {WINDOW_HEIGHT} from 'src/config/constants';

const CELL_COUNT = 6;

export default function EnterOTP() {
  const navigation = useNavigation();
  const [value, setValue] = useState('');
  const ref = useBlurOnFulfill({value, cellCount: CELL_COUNT});
  const {loadingUserContext} = useContext(UserContext);
  const [readyToMove, setReadyToMove] = useState(false);

  const route =
    useRoute<RouteProp<LoginNavigationRoutes, LoginRoutesNames['ENTER_OTP']>>();

  const {confirm} = route.params;

  const [loading, setLoading] = useState(false);
  const [errorText, setErrorText] = useState('');

  const login = useCallback(() => {
    return new Promise(async (resolve, reject) => {
      confirm
        .confirm(value)
        .then(res => {
          resolve(res);
        })
        .catch(err => {
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
        .catch(err => {
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
          navigation.navigate(
            LoginRoutes.ADDRESS.name as LoginRoutesNames['ADDRESS'],
          );
        } else {
          navigation.navigate(
            LoginRoutes.SIGN_UP.name as LoginRoutesNames['SIGN_UP'],
          );
        }
      }
    }
  }, [readyToMove, loadingUserContext, navigation]);

  return (
    <View style={commonStyles.FlexColCenterCenter}>
      <KeyboardAvoidingView
        behavior="position"
        style={styles.KeyboardView}
        keyboardVerticalOffset={40}>
        <View style={styles.SectionStyle}>
          <View style={styles.header}>
            <Text style={styles.labelText} type="header">
              What's the code?
            </Text>
            {loading ? (
              <ActivityIndicator style={styles.loader} color="black" />
            ) : null}
          </View>

          <CodeField
            ref={ref}
            autoFocus={true}
            value={value}
            onChangeText={text => {
              setValue(text);
              setErrorText('');
            }}
            cellCount={CELL_COUNT}
            rootStyle={styles.codeFieldRoot}
            keyboardType="number-pad"
            textContentType="oneTimeCode"
            renderCell={({index, symbol}) => (
              <View
                key={index}
                style={[commonStyles.FlexColCenterCenter, styles.cell]}>
                <Text style={styles.inputCodeText}>{symbol}</Text>
              </View>
            )}
          />
          {errorText.length > 0 && (
            <Text type="error" style={styles.errorText}>
              {errorText}
            </Text>
          )}
          <Text style={styles.descriptionText} type="info">
            You’ll recieve a text with a code within a couple minutes.
          </Text>
          {WINDOW_HEIGHT > 850 ? (
            <Text style={styles.descriptionText} type="info">
              Check your phone number, or click resend text if you didn’t
              recieve it.
            </Text>
          ) : null}

          <Button
            mode="warning"
            onPress={() => login()}
            title="Resend Text"
            style={styles.WarningButton}
          />
        </View>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  SectionStyle: {
    alignItems: 'flex-start',
    alignSelf: 'center',
    marginTop: WINDOW_HEIGHT < 750 ? '20%' : '-20%',
    width: '80%',
  },
  header: {
    flexDirection: 'row',
  },
  loadingIconStyle: {
    position: 'absolute',
    right: 0,
  },
  labelText: {
    marginLeft: 10,
  },
  KeyboardView: {
    width: '100%',
    display: 'flex',
  },
  Button: {
    alignSelf: 'center',
    marginTop: 50,
    marginLeft: 10,
  },
  inputCodeText: {
    fontSize: 32,
    fontWeight: '700',
  },
  root: {flex: 1, padding: 20},
  title: {textAlign: 'center', fontSize: 30},
  codeFieldRoot: {marginTop: 20},
  cell: {
    width: 40,
    height: 60,
    fontSize: 24,
    borderBottomWidth: 1,
    borderBottomColor: 'black',
    borderColor: 'black',
    marginLeft: 10,
    textAlign: 'center',
  },
  descriptionText: {
    marginTop: 30,
    marginLeft: 10,
  },
  errorText: {
    marginTop: 25,
    marginLeft: 10,
    marginBottom: 5,
  },
  loader: {
    left: 20,
    bottom: 2,
  },
  WarningButton: {
    marginTop: 30,
    marginLeft: 10,
  },
});
