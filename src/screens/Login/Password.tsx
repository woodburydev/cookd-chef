import {Icon} from '@rneui/base';
import {Button, Input, Text} from '@rneui/themed';
import React, {useRef, useState} from 'react';
import {
  View,
  KeyboardAvoidingView,
  StyleSheet,
  ActivityIndicator,
  Dimensions,
} from 'react-native';
import {commonStyles} from '@config/styles';
import {LoginRoutes} from '@navigation/Login/routes';
import auth from '@react-native-firebase/auth';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/core';
import {
  LoginNavigationRoutes,
  LoginRoutesNames,
} from 'src/navigation/NavigationTypes';
import {WINDOW_HEIGHT} from 'src/config/constants';

export default function SetPassword() {
  const [errorText, setErrorText] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState('');
  const confirmPasswordRef: any = useRef<HTMLDivElement>(null);
  const navigation = useNavigation();
  const route =
    useRoute<
      RouteProp<LoginNavigationRoutes, LoginRoutesNames['SET_PASSWORD']>
    >();

  const updateName = async () => {
    await auth().currentUser?.updateProfile({
      displayName: fullName,
    });
  };

  const email = route.params?.email;
  const fullName = route.params?.fullName;
  const submitPassword = async () => {
    setLoading(true);
    if (password !== confirmPassword) {
      setErrorText('Password’s don’t match!');
      setLoading(false);
    } else {
      // validate password
      const credential = auth.EmailAuthProvider.credential(email, password);
      // do handling, so that if a user cannot link a credential because it is already linked, this is ok!
      try {
        auth()
          .currentUser!.linkWithCredential(credential)
          .then(async () => {
            await updateName();
            navigation.navigate(
              LoginRoutes.ADDRESS.name as LoginRoutesNames['ADDRESS'],
            );
          })
          .catch(err => {
            console.log(err);
            if (err.code === 'auth/weak-password') {
              setErrorText('Please choose a stronger password.');
            } else if (err.code === 'auth/requires-recent-login') {
              setErrorText('Please re-authenticate.');
              navigation.navigate(
                LoginRoutes.PHONE_NUMBER
                  .name as LoginRoutesNames['PHONE_NUMBER'],
              );
            } else {
              setErrorText('Oops, there was a problem');
            }
            setLoading(false);
          });
      } catch (err) {
        console.log(err);
        setLoading(false);
      }
    }
  };
  return (
    <View style={[commonStyles.FlexColCenterCenter]}>
      <View style={[commonStyles.FlexColCenterCenter, styles.ContentContainer]}>
        <View style={styles.SectionStyle}>
          <Text type="label" style={styles.labelText}>
            Set A Password
          </Text>
          <Input
            autoFocus={true}
            shake={() => {}}
            onChangeText={name => {
              setPassword(name);
            }}
            autoComplete="name-given"
            placeholder="John"
            autoCapitalize="words"
            secureTextEntry
            maxLength={20}
            returnKeyType="next"
            errorStyle={{
              marginBottom: WINDOW_HEIGHT < 850 ? 0 : 15,
              marginTop: WINDOW_HEIGHT < 850 ? 0 : 0,
            }}
            onSubmitEditing={() => {
              confirmPasswordRef.current && confirmPasswordRef.current.focus();
            }}
            blurOnSubmit={false}
          />
          <Text type="label" style={styles.labelText}>
            Confirm Password
          </Text>
          <Input
            autoComplete="name-family"
            shake={() => {}}
            ref={confirmPasswordRef}
            onChangeText={name => {
              setConfirmPassword(name);
            }}
            errorStyle={{
              marginTop: 10,
              marginBottom: 15,
            }}
            secureTextEntry
            placeholder="Smith"
            autoCapitalize="words"
            maxLength={20}
            errorMessage={errorText}
            returnKeyType="next"
            onSubmitEditing={submitPassword}
            blurOnSubmit={false}
          />
        </View>

        <Button
          onPress={() => (loading ? undefined : submitPassword())}
          icon={loading ? <ActivityIndicator color="white" /> : undefined}
          title={loading ? '' : 'Next'}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  SectionStyle: {
    justifyContent: 'center',
    width: '80%',
  },
  labelText: {
    alignSelf: 'flex-start',
    marginLeft: 10,
    marginBottom: 10,
  },
  ContentContainer: {
    bottom: WINDOW_HEIGHT < 750 ? 60 : 100,
  },
});
