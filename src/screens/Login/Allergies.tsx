import { RouteProp, useNavigation, useRoute } from '@react-navigation/core';
import { Button, Icon, Input, Text } from '@rneui/themed';
import axios from 'axios';
import React, { createRef, useCallback, useEffect, useState } from 'react';
import {
  View,
  StyleSheet,
  ActivityIndicator,
  KeyboardAvoidingView,
  Keyboard,
} from 'react-native';
import { ScrollView, TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { endpoint } from 'src/config/api';
import { commonStyles } from 'src/config/styles';
import { LoginRoutes } from 'src/navigation/Login/routes';
import {
  LoginNavigationRoutes,
  LoginRoutesNames,
} from 'src/navigation/NavigationTypes';

export default function Allergies() {
  const [emailErrorText, setEmailErrorText] = useState('');
  const [email, setEmail] = useState('');
  const navigation = useNavigation();
  const googleMapsComponent: any = createRef();
  const [loading, setLoading] = useState(false);
  const [buttonVisible, setButtonVisible] = useState(true);
  const route =
    useRoute<RouteProp<LoginNavigationRoutes, LoginRoutesNames['EMAIL']>>();

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

  }, []);

  return (
    <TouchableWithoutFeedback style={[commonStyles.FlexColCenterCenter]} onPress={Keyboard.dismiss}>
      <View style={[styles.SectionStyle]}>
        <View />
        <View style={styles.inputContainer}>
          <Text type="info" style={styles.labelText}>Make sure to use your Legal Primary Residence, no P.O. Boxes</Text>
          <Text type="label" style={styles.labelText}>
            Home Address
          </Text>
          <GooglePlacesAutocomplete
            placeholder='Search'
            onPress={(data) => {
              Keyboard.dismiss();
              // 'details' is provided when fetchDetails = true
              console.log(data);
            }}
            enableHighAccuracyLocation={true}
            ref={googleMapsComponent}
            isRowScrollable={false}
            enablePoweredByContainer={false}
            styles={{
              container: {
                marginTop: 90,
                width: '100%',
                margin: 0,
                zIndex: 1000,
                padding: 0,
                position: 'absolute',
                backgroundColor: 'white'
              },

              listView: {
                top: 50,
                zIndex: 1000,
                position: 'absolute',
                backgroundColor: "white",
              },
            }}
            onFail={(error) => console.error(error)}
            query={{
              key: 'AIzaSyACTEgEnnRrAp8pJfKYPmpOTsxF1Fm6uPo',
              language: 'en',
              components: 'country:us',
            }}
          />
          {/* <Text style={styles.labelText} type="info">Make sure to use your Legal Primary Residence, no P.O. Boxes</Text> */}
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
            containerStyle={{ opacity: buttonVisible ? 1 : 0 }}
            style={styles.Button}
          />
        </KeyboardAvoidingView>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  SectionStyle: {
    justifyContent: 'space-around',
    width: '80%',
    height: '100%',
    marginTop: '15%',
  },
  iconStyle: {
    color: 'white',
  },
  ScrollView: {
    width: '100%',
    height: 100,
  },
  Button: {
    alignSelf: 'flex-end',
    zIndex: -100,
  },
  buttonView: {
    top: '4%',
    zIndex: -10,
  },
  inputContainer: {
    bottom: '20%',
  },
  labelText: {
    marginBottom: 20,
  },
});
