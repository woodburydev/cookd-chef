/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './src/main/App';
import {name as appName} from './app.json';
import {
  registerLocalPushNotifications,
  createLocalPushNotificationChannel,
} from './src/config/notificationHandler';

registerLocalPushNotifications();
createLocalPushNotificationChannel();

AppRegistry.registerComponent(appName, () => App);
