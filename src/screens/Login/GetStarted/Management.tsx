import {Button, Image, Text} from '@rneui/themed';
import React, {useContext, useState} from 'react';
import {ActivityIndicator, Dimensions, StyleSheet, View} from 'react-native';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import {LoginNavigationRoutes, LoginRoutesNames} from 'src/navigation/NavigationTypes';
import {commonStyles} from 'src/config/styles';
import ChefImage from '@assets/GetStartedImages/Chef3.png';
import {UserContext} from 'src/context/UserContext';
import axios from 'axios';
import {endpoint} from 'src/config/api';
import auth from '@react-native-firebase/auth';
import {WINDOW_HEIGHT} from 'src/config/constants';
import { useAddUserMutation, useGetUserQuery } from 'src/redux/store';

export default function Management() {
  const route = useRoute<RouteProp<LoginNavigationRoutes, LoginRoutesNames['FINAL']>>();
  const navigation = useNavigation();
  const {address, foundOut} = route.params;
  const [loading, setLoading] = useState(false);
  const { refetch } = useGetUserQuery();
  const [addUserMutation] = useAddUserMutation();
  const submit = () => {
    navigation.navigate('GROW', {address, foundOut});
  };
  const submitToDB = () => {
    setLoading(true);
    const user = auth().currentUser!;
    const sendObj = { 
      displayname: user!.displayName,
      fbuuid: user!.uid,
      email: user!.email,
      phone: user!.phoneNumber,
      address,
      foundOut,
    }
    addUserMutation(sendObj);
    refetch()
  };

  return (
    <View style={commonStyles.FlexColCenterCenter}>
      <View style={[styles.SectionStyle]}>
        <Image
          source={ChefImage}
          style={styles.logoContainer}
          PlaceholderContent={<ActivityIndicator />}
        />
        <View style={[styles.TextContainer, commonStyles.mb20]}>
          <Text type="large-header" style={[commonStyles.mb20, commonStyles.mt10]} centerText>
            Step 3: Customer Management
          </Text>
          <Text type="description" centerText>
            Cookd allows you to reach out to past clients once a month in order to get more
            bookings.
          </Text>
          <Text type="description" centerText style={commonStyles.mt10}>
            Offer unique experiences for Cookd Clients so that they come back to you.
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
    marginTop: '5%',
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
  },
});
