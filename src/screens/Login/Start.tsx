import {Button, Image} from '@rneui/themed';
import React from 'react';
import {View, StyleSheet, ActivityIndicator, Dimensions} from 'react-native';
import {commonStyles} from '@config/styles';
import CookingImage from '@assets/cookingimage.jpeg';
import CookdLogo from '@assets/cookdlogolabel.png';
import {LoginRoutes} from 'src/navigation/Login/routes';
import {useNavigation} from '@react-navigation/core';
import {LoginRoutesNames} from 'src/navigation/NavigationTypes';

export default function GetStarted() {
  const navigation = useNavigation();

  return (
    <View style={[commonStyles.FlexColCenterStart, styles.PageContainer]}>
      <Image
        source={CookingImage}
        style={styles.imageContainer}
        PlaceholderContent={<ActivityIndicator />}
      />
      <View
        style={[commonStyles.FlexColCenterCenter, styles.mainBodyContainer]}>
        <Image
          source={CookdLogo}
          style={styles.logoContainer}
          PlaceholderContent={<ActivityIndicator />}
        />

        <Button
          onPress={() =>
            navigation.navigate(
              LoginRoutes.PHONE_NUMBER.name as LoginRoutesNames['PHONE_NUMBER'],
            )
          }
          title="GET STARTED"
          style={styles.button}
        />
      </View>
    </View>
  );
}

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
  imageContainer: {
    height: windowHeight / 2,
    width: windowWidth,
    resizeMode: 'cover',
    zIndex: -1,
  },
  PageContainer: {
    flex: 1,
  },
  mainBodyContainer: {
    height: '60%',
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    zIndex: 1,
    position: 'absolute',
    backgroundColor: 'white',
    bottom: 0,
  },
  logoContainer: {
    padding: 0,
    height: 120,
    width: 150,
  },
  mainText: {
    fontSize: 28,
    fontWeight: '600',
    textAlign: 'center',
  },
  subText: {
    textAlign: 'center',
  },
  textDivider: {
    marginTop: 20,
    width: '60%',
  },
  button: {
    marginTop: 50,
  },
  linkStyle: {
    marginTop: 20,
    textDecorationLine: 'underline',
  },
});
