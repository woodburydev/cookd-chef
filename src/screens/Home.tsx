import React, {useContext} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import auth from '@react-native-firebase/auth';
import {myContext} from '../../Context';

export default function Home() {
  const signedInUser: any = useContext(myContext);
  const logout = () => {
    auth()
      .signOut()
      .then(() => {
        // success
      })
      .catch(error => {
        // something happened
        console.log(error);
      });
  };
  return (
    <View style={styles.mainBody}>
      <Text>Hello {signedInUser.user.firstname}</Text>
      <Text style={styles.blueText} onPress={logout}>
        Logout
      </Text>
    </View>
  );
}

export const styles = StyleSheet.create({
  blueText: {
    color: 'blue',
  },
  mainBody: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
