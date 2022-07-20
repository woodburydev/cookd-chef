import {Button, Text} from '@rneui/themed';
import React, {useContext, useState} from 'react';
import {ActivityIndicator, Dimensions, StyleSheet, View} from 'react-native';
import {commonStyles} from 'src/config/styles';

import ChefImage from '@assets/GetStartedImages/Chef1.png';
import {Image} from '@rneui/themed/dist/Image';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import {LoginNavigationRoutes, LoginRoutesNames} from 'src/navigation/NavigationTypes';
import axios from 'axios';
import {endpoint} from 'src/config/api';
import auth from '@react-native-firebase/auth';
import {UserContext} from 'src/context/UserContext';
import {WINDOW_HEIGHT} from 'src/config/constants';

export default function CreateProfile() {
  const route = useRoute<RouteProp<LoginNavigationRoutes, LoginRoutesNames['FINAL']>>();
  const navigation = useNavigation();
  const {address, foundOut} = route.params;
  const {getUser} = useContext(UserContext);
  const [loading, setLoading] = useState(false);
  const submit = () => {
    navigation.navigate('COOK', {address, foundOut});
  };
  const submitToDB = () => {
    const user = auth().currentUser!;
    axios
      .post(`${endpoint}/cook`, {
        displayname: user!.displayName,
        fbuuid: user!.uid,
        email: user!.email,
        phone: user!.phoneNumber,
        address,
        foundOut,
      })
      .then(() => {
        getUser!(user);
      })
      .catch((err) => {
        console.log('Error saving user in database: ', JSON.stringify(err));
        setLoading(false);
      });
  };
  return (
    <View style={commonStyles.FlexColCenterCenter}>
      <View style={[styles.SectionStyle]}>
        <Text type="large-header" centerText>
          Grow Your Career With Cookd For Chefs
        </Text>
        <Image
          source={ChefImage}
          style={styles.logoContainer}
          PlaceholderContent={<ActivityIndicator />}
        />
        <View style={[styles.TextContainer, commonStyles.mb20]}>
          <Text type="large-header" centerText>
            Step 1:
          </Text>
          <Text style={commonStyles.mb20} type="large-header" centerText>
            Create Profile
          </Text>
          <Text type="description" centerText>
            Once your account is made, you’ll need to create a bio, menus and dishes to offer your
            Cookd Clients.{' '}
          </Text>
        </View>
        <Button
          onPress={submit}
          style={styles.Button}
          title={loading ? <ActivityIndicator /> : 'Next'}
        />
        <Text style={styles.LinkText} onPress={submitToDB}>
          skip
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  SectionStyle: {
    width: '90%',
    marginTop: '15%',
    top: WINDOW_HEIGHT < 750 ? 30 : 0,
    justifyContent: 'space-between',
    height: WINDOW_HEIGHT < 750 ? '75%' : '65%',
    alignItems: 'center',
    padding: 20,
  },
  TextContainer: {
    width: '80%',
  },
  logoContainer: {
    height: WINDOW_HEIGHT < 750 ? 150 : 200,
    alignSelf: 'center',
    width: WINDOW_HEIGHT < 750 ? 150 : 200,
  },
  Button: {
    alignSelf: 'center',
  },
  LinkText: {
    textDecorationLine: 'underline',
    top: 10,
  },
});
