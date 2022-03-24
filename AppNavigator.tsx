import React, {useContext} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Home from './src/screens/Home';
import Login from './src/screens/Login';
import Signup from './src/screens/Signup';
import {myContext} from './Context';
import {ActivityIndicator} from 'react-native';

export default function AppNavigator() {
  const Stack = createNativeStackNavigator();
  // fix later, should not be any.
  const userContext: any = useContext(myContext);
  // undefined == loading, since its the default context state
  if (userContext.user === undefined) {
    // design loading page
    return <ActivityIndicator color="#9c9797" />;
  }
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      {userContext.user?.email ? (
        <Stack.Screen name="Home" component={Home} />
      ) : (
        <>
          <Stack.Screen name="Signup" component={Signup} />
          <Stack.Screen name="Login" component={Login} />
        </>
      )}
    </Stack.Navigator>
  );
}
