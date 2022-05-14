import { Icon } from '@rneui/base';
import { Button, Input, Text } from '@rneui/themed';
import React, { useRef, useState } from 'react';
import {
  View,
  KeyboardAvoidingView,
  StyleSheet,
  ActivityIndicator,
  Dimensions,
} from 'react-native';
import { commonStyles } from '@config/styles';
import { LoginRoutes } from '@navigation/Login/routes';
import auth from '@react-native-firebase/auth';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/core';
import {
  LoginNavigationRoutes,
  LoginRoutesNames,
} from 'src/navigation/NavigationTypes';

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
          <Text style={styles.labelText} type="label">
            Lets make a password!
            </Text>
          <Input
            shake={() => { }}
            textContentType="newPassword"
            secureTextEntry
            autoFocus={true}
            errorStyle={{ marginBottom: windowHeight < 850 ? 0 : 15, marginTop: windowHeight < 850 ? 0 : 0 }}
            maxLength={40}
            onChangeText={input => {
              setPassword(input);
              setErrorText('');
            }}
            onSubmitEditing={() =>
              confirmPasswordRef.current && confirmPasswordRef.current.focus()
            }
            blurOnSubmit={false}
          />
        </View>
        <View style={styles.SectionStyle}>
          <Text style={styles.labelText} type="label">
            Re-enter password
            </Text>
          <Input
            shake={() => { }}
            ref={confirmPasswordRef}
            textContentType="newPassword"
            secureTextEntry
            maxLength={40}
            onChangeText={input => {
              setConfirmPassword(input);
              setErrorText('');
            }}
            errorStyle={{
              marginTop: 10,
              marginBottom: 15
            }}
            placeholderTextColor="#8b9cb5"
            errorMessage={errorText}
            onSubmitEditing={() => submitPassword()}
            blurOnSubmit={false}
          />
        </View>
        <Button onPress={() => (loading ? undefined : submitPassword())}
          icon={
            loading ? (
              <ActivityIndicator color="white" />
            ) : undefined
          } title={loading ? "" : "Next"} />
      </View>
    </View>
  );
}

const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
  SectionStyle: {
    justifyContent: 'center',
    width: '80%',
  },
  ContentContainer: {
    bottom: windowHeight < 750 ? 60 : 70
  },
  labelText: {
    alignSelf: 'flex-start',
    marginLeft: 10,
    marginBottom: 5,
  },
  iconStyle: {
    color: 'white',
  },
});
