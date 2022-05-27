import {FirebaseAuthTypes} from '@react-native-firebase/auth';

export type LoginNavigationRoutes = {
  GET_STARTED: undefined;
  SIGN_UP: undefined;
  EMAIL: {fullName: string};
  PHONE_NUMBER: undefined;
  ENTER_OTP: {
    confirm: FirebaseAuthTypes.ConfirmationResult;
    sign_up?: {
      notInDB: boolean;
      userInformation: {
        fullName: string;
        email: string;
        phone: string;
      };
    };
  };
  SET_PASSWORD: {email: string; fullName: string};
  ADDRESS: undefined;
  FOUND_OUT: {address: string};
  FINAL: {address: string; foundOut: string[]};
  CREATE_PROFILE: {address: string; foundOut: string[]};
  COOK: {address: string; foundOut: string[]};
  CUSTOMER_MANAGEMENT: {address: string; foundOut: string[]};
  GROW: {address: string; foundOut: string[]};
};

export type LoginRoutesNames = {
  GET_STARTED: 'GET_STARTED';
  SIGN_UP: 'SIGN_UP';
  EMAIL: 'EMAIL';
  PHONE_NUMBER: 'PHONE_NUMBER';
  ENTER_OTP: 'ENTER_OTP';
  SET_PASSWORD: 'SET_PASSWORD';
  ADDRESS: 'ADDRESS';
  FOUND_OUT: 'FOUND_OUT';
  FINAL: 'FINAL';
  CREATE_PROFILE: 'CREATE_PROFILE';
  COOK: 'COOK';
  CUSTOMER_MANAGEMENT: 'CUSTOMER_MANAGEMENT';
  GROW: 'GROW';
};

export type HomeRouteNames = {
  HOME: 'HOME';
  MESSAGE: 'MESSAGE';
  ORDER: 'ORDER';
  PROFILE: 'PROFILE';
  PAYMENTS: 'PAYMENTS';
  VERIFICATION: 'VERIFICATION';
};

export type HomeNavigationRoutes = {
  HOME: undefined;
  MESSAGE: undefined;
  ORDER: undefined;
  PROFILE: undefined;
  PAYMENTS: undefined;
  VERIFICATION: undefined;
};

export type ProfileNavigationRoutes = {
  REWARDS: undefined;
  REVIEWS: undefined;
  MENUS: undefined;
  MENU_DETAILS: {menuId: number};
  BIO: undefined;
  FAVORITE_CUISINES: undefined;
  CONTACT_INFO: undefined;
  BANKING_INFO: undefined;
  INVITE_CHEF: undefined;
  PRIVACY_POLICY: undefined;
  TERMS_OF_SERVICE: undefined;
  FEEDBACK: undefined;
};

export type ProfileRouteNames = {
  REWARDS: 'REWARDS';
  REVIEWS: 'REVIEWS';
  MENUS: 'MENUS';
  MENU_DETAILS: 'MENU_DETAILS';
  BIO: 'BIO';
  FAVORITE_CUISINES: 'FAVORITE_CUISINES';
  CONTACT_INFO: 'CONTACT_INFO';
  BANKING_INFO: 'BANKING_INFO';
  INVITE_CHEF: 'INVITE_CHEF';
  PRIVACY_POLICY: 'PRIVACY_POLICY';
  TERMS_OF_SERVICE: 'TERMS_OF_SERVICE';
  FEEDBACK: 'FEEDBACK';
};

export type MessageRouteNames = {
  MESSAGE: 'MESSAGE';
  MESSAGE_DETAIL: 'MESSAGE_DETAIL';
};

export type MessageNavigationRoutes = {
  MESSAGE: undefined;
  MESSAGE_DETAIL: {recipientDisplayName: string};
};
