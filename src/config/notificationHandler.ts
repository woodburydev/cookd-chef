import messaging from '@react-native-firebase/messaging';
import {Alert, Platform} from 'react-native';
import PushNotification from 'react-native-push-notification';
import uuid from 'uuidv4';

export async function notificationListener() {
  messaging().onNotificationOpenedApp((message: any) => {
    console.log('Notification caused app to open: ', message);
  });

  messaging()
    .requestPermission()
    .then(res => {
      console.log('Allowed: ', res);
    })
    .catch(err => {
      console.log('Error with Permissions: ', err);
    });

  messaging()
    .registerDeviceForRemoteMessages()
    .then(res => {
      console.log('Registered for remote: ', res);
    })
    .catch(err => {
      console.log('Failed to register for remote: ', err);
    });
  messaging()
    .getInitialNotification()
    .then(message => {
      console.log('Notification caused app to open from quit state', message);
    });

  messaging().setBackgroundMessageHandler(async (remoteMessage: any) => {
    Alert.alert(
      remoteMessage.notification.title,
      remoteMessage.notification.body,
    );
  });

  messaging().onMessage(async (remoteMessage: any) => {
    // Creating Local notification
    let localNotification: any = {
      default: uuid(),
      title: remoteMessage.notification.title, // (optional)
      message: remoteMessage.notification.body, // (required)
      data: remoteMessage.data,
    };

    if (Platform.OS === 'android') {
      localNotification = {
        ...localNotification,
        channelId: 'test-channel', // (required) channelId, if the channel doesn't exist, notification will not trigger.
      };
    }
    PushNotification.localNotification(localNotification);
  });
}

export async function requestUserPermission() {
  const authStatus = await messaging().requestPermission();
  const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL;

  if (enabled) {
    console.log('Authorization status:', authStatus);
  }
}

export async function getToken() {
  await messaging()
    .getToken()
    .then(res => {
      console.log('Token: ', res);
    })
    .catch(err => {
      console.log('Token Error: ', err);
    });
}

export const createLocalPushNotificationChannel = () => {
  PushNotification.createChannel(
    {
      channelId: 'test-channel',
      channelName: 'Test Channel',
    },
    () => console.log('Created'),
  );
};

export const registerLocalPushNotifications = () => {
  PushNotification.configure({
    onRegister: () => {
      console.log('Registered Push Notifications');
    },
    onRegistrationError: function (err) {
      console.error('Push Notifiations Registration Error: ', err);
    },
    // IOS ONLY (optional): default: all - Permissions to register.
    permissions: {
      alert: true,
      badge: true,
      sound: true,
    },

    // Should the initial notification be popped automatically
    // default: true
    popInitialNotification: true,

    onNotification: notification => {
      console.log('Local Notification: ', notification);
    },
    requestPermissions: Platform.OS === 'ios',
  });
};

export const testNotification = () => {
  PushNotification.localNotification({
    channelId: 'test-channel',
    title: 'Local Test Notification',
    message: 'Seems everything with local notifications is working properly!',
  });
};
