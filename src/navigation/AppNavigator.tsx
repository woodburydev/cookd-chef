import React, {useEffect} from 'react';
import {UserContext} from 'src/context/UserContext';
import {ActivityIndicator} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import {ThemeProvider} from '@rneui/themed';
import {myTheme} from '@config/styles';
import auth from '@react-native-firebase/auth';
import LoginNavigation from './Login/LoginNavigation';
import {useGetUserQuery} from 'src/redux/store';
import HomeNavigation from './Home/HomeNavigation';
import { useSelector } from 'react-redux';

export default function AppNavigator() {
  const {data: userInfo, error, isFetching, refetch} = useGetUserQuery();
  const updateUserRefetching = useSelector(
    state => state.mainReducer.updateUserRefetch,
  );
  // stack typescript definition is stupid, override with any.
  const Stack: any = createStackNavigator();
  useEffect(() => {
    const subscriber = auth().onAuthStateChanged((user) => {
      refetch();
    });

    return subscriber; // unsubscribe on unmount
  }, []);

  if (isFetching && !updateUserRefetching) {
    return <ActivityIndicator />;
  }

  return (
    <ThemeProvider theme={myTheme}>
      <Stack.Navigator headerShown={false}>
        {userInfo && userInfo.email && !error ? (
          <>
            <Stack.Screen name="HOME" component={HomeNavigation} options={{headerShown: false}} />
          </>
        ) : (
          <Stack.Screen name="LOGIN" component={LoginNavigation} options={{headerShown: false}} />
        )}
      </Stack.Navigator>
    </ThemeProvider>
  );
}
