import {Text, Image} from '@rneui/themed';
import React from 'react';
import {View, StyleSheet, ActivityIndicator} from 'react-native';
import {AppColorPalette, commonStyles} from 'src/config/styles';
import ChefImage from '@assets/resturantimage.png';

export default function Order() {
  return (
    <View style={commonStyles.FlexColCenterStart}>
      <View style={[commonStyles.FlexColCenterCenter, styles.header]}>
        <Text type="header" style={styles.headerText}>
          Manage Orders
        </Text>
      </View>
      <View style={[commonStyles.FlexColCenterStart, styles.contentContainer]}>
        <Image
          source={ChefImage}
          style={styles.logoContainer}
          PlaceholderContent={<ActivityIndicator />}
        />
        <Text type="label" centerText style={styles.text}>
          No Orders Yet
        </Text>
        <Text type="description" centerText style={styles.text}>
          Experience fine dining with friends and family from the comfort of
          your own home.
        </Text>
        <Text
          type="description"
          centerText
          style={[styles.text, styles.linkText]}>
          Find A Chef
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  contentContainer: {
    width: '70%',
    marginTop: 75,
  },
  header: {
    flex: 0,
    height: '20%',
    backgroundColor: 'white',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    shadowColor: '#171717',
    shadowOffset: {width: -2, height: 4},
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  headerText: {
    marginTop: '12.5%',
  },
  logoContainer: {
    height: 150,
    marginBottom: 50,
    width: 250,
  },
  text: {
    marginTop: 10,
    marginBottom: 10,
  },
  linkText: {
    textDecorationLine: 'underline',
    color: AppColorPalette.orange,
  },
});
