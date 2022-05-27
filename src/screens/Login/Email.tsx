import {RouteProp, useNavigation, useRoute} from '@react-navigation/core';
import {Button, Icon, Input, Text} from '@rneui/themed';
import axios from 'axios';
import React, {useCallback, useState} from 'react';
import {
  View,
  StyleSheet,
  ActivityIndicator,
  KeyboardAvoidingView,
  Dimensions,
} from 'react-native';
import {endpoint} from 'src/config/api';
import {WINDOW_HEIGHT} from 'src/config/constants';
import {commonStyles} from 'src/config/styles';
import {LoginRoutes} from 'src/navigation/Login/routes';
import {
  LoginNavigationRoutes,
  LoginRoutesNames,
} from 'src/navigation/NavigationTypes';

export default function Email() {
  const [emailErrorText, setEmailErrorText] = useState('');
  const [email, setEmail] = useState('');
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const route =
    useRoute<RouteProp<LoginNavigationRoutes, LoginRoutesNames['EMAIL']>>();

  const fullName = route.params.fullName;
  const submit = () => {
    setLoading(true);
    const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
    if (!emailRegex.test(email)) {
      setEmailErrorText('Please enter a valid email');
      setLoading(false);
    } else {
      confirmDetails();
    }
  };

  const confirmDetails = useCallback(async () => {
    setLoading(true);
    await axios
      .post(`${endpoint}/user/canCreate`, {
        email: email,
      })
      .then(res => {
        if (res.data.status) {
          navigation.navigate(
            LoginRoutes.SET_PASSWORD.name as LoginRoutesNames['SET_PASSWORD'],
            {fullName, email},
          );
        } else {
          const reason = res.data.reason;
          if (reason === 'invalid-email') {
            setEmailErrorText('This email is already in use');
            setLoading(false);
          }
          if (reason === 'not-in-db') {
            navigation.navigate(
              LoginRoutes.ADDRESS.name as LoginRoutesNames['ADDRESS'],
            );
          }
        }
        setLoading(false);
      })
      .catch(err => {
        console.log(err);
        setEmail('Please enter a valid email');
        setLoading(false);
      });
  }, [email, navigation, fullName]);

  return (
    <View style={commonStyles.FlexColCenterCenter}>
      <View style={[commonStyles.FlexColCenterCenter, styles.ContentContainer]}>
        <View style={styles.SectionStyle}>
          <Text type="header" style={styles.labelText}>
            Whats your email?
          </Text>
          <Input
            shake={() => {}}
            maxLength={40}
            onChangeText={UserEmail => {
              setEmail(UserEmail);
              setEmailErrorText('');
            }}
            errorStyle={{
              marginTop: 10,
              marginBottom: 15,
            }}
            autoFocus={true}
            autoCapitalize="none"
            keyboardType="email-address"
            returnKeyType="next"
            onSubmitEditing={() => submit()}
            blurOnSubmit={false}
            errorMessage={emailErrorText}
          />
        </View>
        <Button
          onPress={() => (loading ? undefined : submit())}
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
  iconStyle: {
    color: 'white',
  },
  inputContainer: {
    bottom: '15%',
  },
  labelText: {
    marginLeft: 10,
    marginBottom: 20,
  },
  ContentContainer: {
    bottom: WINDOW_HEIGHT < 750 ? 60 : 100,
  },
});
