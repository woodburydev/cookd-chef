import React, {useContext} from 'react';
import {UserContext} from 'src/context/UserContext';
import {ActivityIndicator} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import {ThemeProvider} from '@rneui/themed';
import {myTheme} from '@config/styles';

import LoginNavigation from './Login/LoginNavigation';
import HomeNavigation from './Home/HomeNavigation';

export default function AppNavigator() {
  const {user} = useContext(UserContext);
  // stack typescript definition is stupid, override with any.
  const Stack: any = createStackNavigator();
  if (user === undefined) {
    return <ActivityIndicator />;
  }

  return (
    <ThemeProvider theme={myTheme}>
      <Stack.Navigator headerShown={false}>
        {user && user.email ? (
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
