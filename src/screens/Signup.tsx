import React, {useContext, useRef, useState} from 'react';
import {
  ActivityIndicator,
  Button,
  Keyboard,
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {ScrollView, TextInput} from 'react-native-gesture-handler';
import auth, {firebase} from '@react-native-firebase/auth';

import {GoogleSignin} from '@react-native-google-signin/google-signin';
import axios from 'axios';
import {myContext} from '../context/Context';
import {endpoint} from '../config/api';

GoogleSignin.configure({
  webClientId:
    '118418741458-9t1i99978bf503q4jldbmq9nr8sdj46p.apps.googleusercontent.com',
});

export default function Signup({navigation}: any) {
  const userContext: any = useContext(myContext);
  // const [otpSent, setOtpSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  // const [userOTP, setUserOTP] = useState<any>();
  const [userPhoneNumber, setUserPhoneNumber] = useState<any>();
  // const [confirm, setConfirm] = useState<any>(null);

  const [errortext, setErrortext] = useState('');

  const lastNameRef: any = useRef<HTMLDivElement>(null);
  const emailRef: any = useRef<HTMLDivElement>(null);
  const phoneRef: any = useRef<HTMLDivElement>(null);
  const passwordRef: any = useRef<HTMLDivElement>(null);

  const countrycode = '+1';

  // const sentOTP = async () => {
  //   const confirmation = await auth().signInWithPhoneNumber(
  //     countryCode + userPhoneNumber,
  //   );
  //   setConfirm(confirmation);
  //   setOtpSent(true);
  // };

  const emailPasswordLogin = async () => {
    // need to await this to be sure
    await userContext.setOverrideGet(true);
    setLoading(true);
    // we want to override the get function of user, until we have "created" this user.
    auth()
      .createUserWithEmailAndPassword(email, password)
      .then(async () => {
        // remove ! and try catch it
        const fbuuid = firebase.auth().currentUser!.uid;
        await axios
          .post(`${endpoint}/cook`, {
            firstname: firstName,
            lastname: lastName,
            email: email,
            fbuuid,
            countrycode,
            phone: userPhoneNumber,
          })
          .then(async res => {
            // success, ensured that the respose says we have successfully created a user
            if (res.data.status === 'success') {
              userContext.setOverrideGet(false);
            } else {
              // delete user from firebase and give error
              await firebase.auth().currentUser?.delete();
              setErrortext('Failed to save user to database!');
              setLoading(false);
            }
          })
          .catch(async err => {
            console.log(JSON.stringify(err));
            await firebase.auth().currentUser?.delete();
            setErrortext('Oops, something went wrong. Please try again later');
            setLoading(false);
          });
      })
      .catch(error => {
        setLoading(false);
        if (error.code === 'auth/email-already-in-use') {
          setErrortext('That email address is already in use!');
        }

        if (error.code === 'auth/invalid-email') {
          setErrortext('That email address is invalid!');
        }

        console.error(error);
      });
  };

  // const login = async () => {
  //   try {
  //     await confirm.confirm(userOTP);
  //   } catch (error) {
  //     console.log('Invalid code.');
  //   }
  // };

  async function onGoogleButtonPress() {
    // Get the users ID token
    const {idToken} = await GoogleSignin.signIn();

    // Create a Google credential with the token
    const googleCredential = auth.GoogleAuthProvider.credential(idToken);

    // Sign-in the user with the credential
    return auth().signInWithCredential(googleCredential);
  }
  return (
    <View style={styles.mainBody}>
      <ScrollView
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{
          flex: 1,
          justifyContent: 'center',
          alignContent: 'center',
        }}>
        <Button
          title="Google Sign-In"
          onPress={() =>
            onGoogleButtonPress().then(() =>
              console.log('Signed in with Google!'),
            )
          }
        />
        <View>
          <KeyboardAvoidingView enabled>
            <View style={styles.SectionStyle}>
              <TextInput
                style={styles.inputStyle}
                onChangeText={name => setFirstName(name)}
                placeholder="First Name" //dummy@abc.com
                placeholderTextColor="#8b9cb5"
                autoCapitalize="words"
                returnKeyType="next"
                onSubmitEditing={() =>
                  lastNameRef.current && lastNameRef.current.focus()
                }
                underlineColorAndroid="#f000"
                blurOnSubmit={false}
              />
            </View>
            <View style={styles.SectionStyle}>
              <TextInput
                style={styles.inputStyle}
                onChangeText={name => setLastName(name)}
                placeholder="Last Name" //dummy@abc.com
                placeholderTextColor="#8b9cb5"
                autoCapitalize="words"
                ref={lastNameRef}
                returnKeyType="next"
                onSubmitEditing={() =>
                  emailRef.current && emailRef.current.focus()
                }
                underlineColorAndroid="#f000"
                blurOnSubmit={false}
              />
            </View>
            <View style={styles.SectionStyle}>
              <TextInput
                style={styles.inputStyle}
                ref={emailRef}
                onChangeText={UserEmail => setEmail(UserEmail)}
                placeholder="Email" //dummy@abc.com
                placeholderTextColor="#8b9cb5"
                autoCapitalize="none"
                keyboardType="email-address"
                returnKeyType="next"
                onSubmitEditing={() =>
                  phoneRef.current && phoneRef.current.focus()
                }
                underlineColorAndroid="#f000"
                blurOnSubmit={false}
              />
            </View>
            <View style={styles.SectionStyle}>
              <TextInput
                style={styles.inputStyle}
                ref={phoneRef}
                onChangeText={phone => setUserPhoneNumber(phone)}
                placeholder="Phone" //dummy@abc.com
                placeholderTextColor="#8b9cb5"
                autoCapitalize="none"
                keyboardType="phone-pad"
                returnKeyType="next"
                onSubmitEditing={() =>
                  passwordRef.current && passwordRef.current.focus()
                }
                underlineColorAndroid="#f000"
                blurOnSubmit={false}
              />
            </View>
            <View style={styles.SectionStyle}>
              <TextInput
                style={styles.inputStyle}
                onChangeText={UserPassword => setPassword(UserPassword)}
                placeholder="Password" //12345
                placeholderTextColor="#8b9cb5"
                keyboardType="default"
                ref={passwordRef}
                onSubmitEditing={Keyboard.dismiss}
                blurOnSubmit={false}
                secureTextEntry={true}
                underlineColorAndroid="#f000"
                returnKeyType="next"
              />
            </View>
            {errortext != '' ? (
              <Text style={styles.errorTextStyle}>{errortext}</Text>
            ) : null}
            <TouchableOpacity
              style={styles.buttonStyle}
              activeOpacity={0.5}
              onPress={emailPasswordLogin}>
              {loading ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <Text style={styles.buttonTextStyle}>Submit</Text>
              )}
            </TouchableOpacity>
            <Text
              style={styles.registerTextStyle}
              onPress={() => navigation.navigate('Login')}>
              Already have an account?
            </Text>
          </KeyboardAvoidingView>
        </View>
      </ScrollView>
    </View>
  );
}
const styles = StyleSheet.create({
  mainBody: {
    flex: 1,
    justifyContent: 'center',
    alignContent: 'center',
  },
  SectionStyle: {
    flexDirection: 'row',
    height: 40,
    marginTop: 20,
    marginLeft: 35,
    marginRight: 35,
    margin: 10,
  },
  buttonStyle: {
    backgroundColor: '#f87f4f',
    borderWidth: 0,
    color: '#FFFFFF',
    borderColor: '#f55549',
    height: 40,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30,
    marginLeft: 35,
    marginRight: 35,
    marginTop: 20,
    marginBottom: 25,
  },
  buttonTextStyle: {
    color: '#FFFFFF',
    paddingVertical: 10,
    fontSize: 16,
  },
  inputStyle: {
    flex: 1,
    color: 'black',
    paddingLeft: 15,
    paddingRight: 15,
    borderBottomWidth: 1,
    borderColor: '#c8c8d3',
  },
  registerTextStyle: {
    textAlign: 'center',
    fontSize: 14,
    alignSelf: 'center',
    padding: 10,
  },
  errorTextStyle: {
    padding: 15,
    paddingTop: 25,
    color: 'red',
    textAlign: 'center',
    fontSize: 14,
  },
});
