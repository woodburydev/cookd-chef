import { useNavigation } from '@react-navigation/core';
import { Icon, Text } from '@rneui/themed';
import React, { useEffect, useState } from 'react';
import { View, StyleSheet, ActivityIndicator } from 'react-native';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { commonStyles } from 'src/config/styles';
import { ProfileRoutes } from 'src/navigation/Profile/routes';
import auth from '@react-native-firebase/auth';
import uuidv4 from 'uuidv4';
import { getKeyValue } from 'src/util/helperFunctions';
import axios from 'axios';

export default function Profile() {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);

  if (loading) {
    return (
      <View style={commonStyles.FlexColCenterCenter}>
        <ActivityIndicator />
      </View>
    );
  }

  return (
    <>
      <View style={styles.BackgroundColor} />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[commonStyles.FlexColCenterStart, styles.scrollView]}
      >
        <View style={[commonStyles.FlexColCenterStart, styles.contentContainer]}>
          <View style={styles.LinksContainer}>
            {Object.keys(ProfileRoutes).map((key) => {
              const { name, iconType, iconName, displayName } = getKeyValue(key)(ProfileRoutes);
              return (
                <>
                  {name === 'REVIEWS' && (
                    <Text type="header" style={styles.firstLabelText} key={uuidv4()}>
                      Your Cookd
                    </Text>
                  )}
                  {name === 'BANKING_INFO' && (
                    <Text type="header" style={styles.labelText} key={uuidv4()}>
                      General
                    </Text>
                  )}
                  <TouchableOpacity
                    style={[commonStyles.FlexRowCenterBetween, styles.LinkContainer]}
                    key={uuidv4()}
                    onPress={() => {
                      navigation.navigate(name);
                    }}
                  >
                    <Icon type={iconType} key={uuidv4()} name={iconName} size={20} />

                    <Text key={uuidv4()} style={styles.LinkText} type="info">
                      {displayName}
                    </Text>
                    <Icon type="material-community" key={uuidv4()} name="chevron-right" size={20} />
                  </TouchableOpacity>
                </>
              );
            })}
            <Text
              type="description"
              centerText
              style={[styles.linkText]}
              onPress={() => {
                setLoading(true);
                auth().signOut();
              }}
            >
              Sign Out
            </Text>
          </View>
        </View>
      </ScrollView>
    </>
  );
}
const styles = StyleSheet.create({
  header: {
    height: 100,
    backgroundColor: 'white',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    shadowColor: '#171717',
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  headerText: {
    marginTop: '13%',
  },
  logoContainer: {
    height: 150,
    marginBottom: 50,
    width: 250,
  },
  contentContainer: {
    width: '100%',
    marginTop: 20,
  },
  labelText: {
    alignSelf: 'flex-start',
    marginTop: 50,
    marginBottom: 10,
    marginLeft: 20,
  },
  firstLabelText: {
    alignSelf: 'flex-start',
    marginTop: 15,
    marginBottom: 10,
    marginLeft: 20,
  },
  LinksContainer: {
    width: '100%',
  },
  LinkContainer: {
    paddingLeft: 20,
    paddingRight: 20,
    marginTop: 5,
    backgroundColor: 'white',
    paddingTop: 10,
    paddingBottom: 10,
  },
  BackgroundColor: {
    color: '#fff',
    position: 'absolute',
    top: 0,
    left: 0,
    width: 500,
    height: 500,
  },
  image: {
    height: 70,
    width: 70,
    borderRadius: 50,
  },
  imageContainer: {
    marginLeft: 10,
    marginRight: 10,
    marginTop: '12%',
  },
  LinkText: {
    marginRight: 'auto',
    marginLeft: '5%',
    alignSelf: 'flex-start',
    marginTop: 2,
  },
  linkText: {
    textDecorationLine: 'underline',
    marginTop: 30,
  },
  scrollView: {
    paddingBottom: 50,
  },
});
