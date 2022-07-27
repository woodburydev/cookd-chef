import {View, StyleSheet, ActivityIndicator, Dimensions} from 'react-native';
import React, {useContext, useState} from 'react';
import auth from '@react-native-firebase/auth';
import {LoginNavigationRoutes, LoginRoutesNames} from 'src/navigation/NavigationTypes';
import {RouteProp, useRoute} from '@react-navigation/core';
import {commonStyles} from 'src/config/styles';
import ChefImage from '@assets/GetStartedImages/Chef4.png';
import {Button, Image, Text} from '@rneui/themed';
import {WINDOW_HEIGHT} from 'src/config/constants';
import { useAddUserMutation, useGetUserQuery } from 'src/redux/store';

export default function Grow() {
  const route = useRoute<RouteProp<LoginNavigationRoutes, LoginRoutesNames['FINAL']>>();
  const {address, foundOut} = route.params;
  const { refetch } = useGetUserQuery();
const [addUserMutation] = useAddUserMutation();
  const [loading, setLoading] = useState(false);

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
          <Text type="large-header" style={[commonStyles.mb20]} centerText>
            Step 4: Grow
          </Text>
          <Text type="description" centerText>
            Cookd provides you with tools to grow your business.{' '}
          </Text>
          <Text type="description" centerText style={commonStyles.mt10}>
            View your profile statstics and track trends.{' '}
          </Text>
          <Text type="description" centerText style={commonStyles.mt10}>
            Read our Cookd Chef Guide for educational blogs to ensure your success!
          </Text>
        </View>
        <Button
          onPress={submitToDB}
          style={styles.Button}
          title={loading ? <ActivityIndicator color="white" /> : 'Finish'}
        />
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
