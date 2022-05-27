import {RouteProp, useNavigation, useRoute} from '@react-navigation/core';
import {Button, Icon, Input, Text} from '@rneui/themed';
import axios from 'axios';
import React, {createRef, useCallback, useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  ActivityIndicator,
  KeyboardAvoidingView,
  Keyboard,
  Dimensions,
} from 'react-native';
import {
  ScrollView,
  TouchableWithoutFeedback,
} from 'react-native-gesture-handler';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import {endpoint} from 'src/config/api';
import {WINDOW_HEIGHT} from 'src/config/constants';
import {commonStyles} from 'src/config/styles';
import {LoginRoutes} from 'src/navigation/Login/routes';
import {
  LoginNavigationRoutes,
  LoginRoutesNames,
} from 'src/navigation/NavigationTypes';

export default function Address() {
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
    const address = googleMapsComponent.current.getAddressText();
    if (address.length > 5) {
      navigation.navigate('FOUND_OUT', {address});
    } else {
    }
    setLoading(false);
  };

  const confirmDetails = useCallback(async () => {}, []);

  return (
    <ScrollView
      contentContainerStyle={[commonStyles.FlexColCenterCenter]}
      keyboardShouldPersistTaps="handled"
      scrollEnabled={false}>
      <View style={[styles.SectionStyle]}>
        <View />
        <View style={styles.inputContainer}>
          <Text type="info" style={styles.labelText}>
            Make sure to use your Legal Primary Residence, no P.O. Boxes
          </Text>
          <Text type="header" style={styles.labelText}>
            Home Address
          </Text>
          <GooglePlacesAutocomplete
            placeholder="Search"
            onPress={data => {
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
                maxHeight:
                  WINDOW_HEIGHT < 750 ? 100 : WINDOW_HEIGHT < 850 ? 150 : 200,
                padding: 0,
                position: 'absolute',
                backgroundColor: 'white',
              },

              listView: {
                top: 50,
                maxHeight:
                  WINDOW_HEIGHT < 750 ? 100 : WINDOW_HEIGHT < 850 ? 150 : 200,
                position: 'absolute',
                backgroundColor: 'white',
              },
            }}
            onFail={error => console.error(error)}
            query={{
              key: 'AIzaSyACTEgEnnRrAp8pJfKYPmpOTsxF1Fm6uPo',
              language: 'en',
              components: 'country:us',
            }}
          />
          {/* <Text style={styles.labelText} type="info">Make sure to use your Legal Primary Residence, no P.O. Boxes</Text> */}
        </View>
        <View style={[styles.buttonView]}>
          <Button
            onPress={() => (loading ? undefined : submit())}
            icon={loading ? <ActivityIndicator color="white" /> : undefined}
            title={loading ? '' : 'Next'}
          />
        </View>
      </View>
    </ScrollView>
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
  },
  buttonView: {
    alignSelf: 'center',
    top: '5%',
  },
  inputContainer: {
    bottom: '20%',
  },
  labelText: {
    marginBottom: 20,
  },
});
