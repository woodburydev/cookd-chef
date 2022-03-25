/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React from 'react';
import Context from './src/context/Context';
import {NavigationContainer} from '@react-navigation/native';
import 'react-native-gesture-handler';
import AppNavigator from './AppNavigator';

const App = () => {
  return (
    <NavigationContainer>
      <Context>
        <AppNavigator />
      </Context>
    </NavigationContainer>
  );
};

export default App;
