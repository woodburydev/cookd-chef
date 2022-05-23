import { View, StyleSheet, ActivityIndicator, Dimensions } from 'react-native'
import React, { useContext, useState } from 'react'
import auth from '@react-native-firebase/auth';
import axios from 'axios';
import { endpoint } from 'src/config/api';
import { LoginNavigationRoutes, LoginRoutesNames } from 'src/navigation/NavigationTypes';
import { RouteProp, useRoute } from '@react-navigation/core';
import { UserContext } from 'src/context/UserContext';
import { commonStyles } from 'src/config/styles';
import ChefImage from '@assets/GetStartedImages/Chef4.png';
import { Button, Image, Text } from '@rneui/themed';

export default function Grow() {
  const route =
    useRoute<RouteProp<LoginNavigationRoutes, LoginRoutesNames['FINAL']>>();
  const { address, foundOut } = route.params;
  const { getUser } = useContext(UserContext);
  const [loading, setLoading] = useState(false);
  
  const submit = () => {
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
      .catch(err => {
        console.log('Error saving user in database: ', JSON.stringify(err));
        setLoading(false);
      });
  }

  return (
    <View style={commonStyles.FlexColCenterCenter}>
      <View style={[styles.SectionStyle]}>
        <Image
          source={ChefImage}
          style={styles.logoContainer}
          PlaceholderContent={<ActivityIndicator />}
        />
        <View style={[styles.TextContainer, commonStyles.mb20]}>
          <Text type="large-header" style={[commonStyles.mb20]}centerText>Step 4: Grow</Text>
          <Text type="description" centerText>Cookd provides you with tools to grow your business. </Text>
          <Text type="description" centerText style={commonStyles.mt10}>View your profile statstics and track trends. </Text>
          <Text type="description" centerText style={commonStyles.mt10}>Read our Cookd Chef Guide for educational blogs to ensure your success!</Text>
        </View>
        <Button
          onPress={submit}
          style={styles.Button}
          title={
            loading ? <ActivityIndicator color="white" /> : 'Finish'
          }
        />
      </View>
    </View>
  )
}

const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
  SectionStyle: {
    width: '90%',
    marginTop: "5%",
    top: windowHeight < 750 ? 30 : 0,
    justifyContent: 'space-between',
    height: windowHeight < 750 ? "75%" : '65%',
    alignItems: 'center',
    padding: 20,
  },
  TextContainer: {
    width: '80%',
  },
  logoContainer: {
    height: windowHeight < 750 ? 150 : 200,
    alignSelf: 'center',
    width: windowHeight < 750 ? 150 : 200,
  },
  Button: {
    alignSelf: 'center',
  },
  LinkText: {
    textDecorationLine: 'underline',
  }
});