/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React, {useEffect} from 'react';
import Context from 'src/context/UserContext';
import {NavigationContainer} from '@react-navigation/native';
import 'react-native-gesture-handler';
import AppNavigator from '../navigation/AppNavigator';
import {Provider} from 'react-redux';
import PushNotificationIOS from '@react-native-community/push-notification-ios';
import {notificationListener, requestUserPermission} from '@config/notificationHandler';
import {TailwindProvider} from 'tailwind-rn/dist';
import utilities from '../../tailwind.json';
import {store} from 'src/redux/store';

const App = () => {
  useEffect(() => {
    // notification handlers
    requestUserPermission();
    notificationListener();
    PushNotificationIOS.addEventListener('registrationError', console.log);
  }, []);

  return (
    <TailwindProvider utilities={utilities}>
      <Provider store={store}>
        <NavigationContainer>
          <AppNavigator />
        </NavigationContainer>
      </Provider>
    </TailwindProvider>
  );
};

export default App;
