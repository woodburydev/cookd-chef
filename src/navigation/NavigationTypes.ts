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
  ALLERGIES: undefined;
  CUISINES: {allergies: string[]};
};

export type LoginRoutesNames = {
  GET_STARTED: 'GET_STARTED';
  SIGN_UP: 'SIGN_UP';
  EMAIL: 'EMAIL';
  PHONE_NUMBER: 'PHONE_NUMBER';
  ENTER_OTP: 'ENTER_OTP';
  SET_PASSWORD: 'SET_PASSWORD';
  ALLERGIES: 'ALLERGIES';
  CUISINES: 'CUISINES';
};

export type HomeRouteNames = {
  HOME: 'HOME';
  MESSAGE: 'MESSAGE';
  ORDER: 'ORDER';
  PROFILE: 'PROFILE';
  SEARCH: 'SEARCH';
};

export type ProfileNavigationRoutes = {
  ALLERGIES: undefined;
  CONTACT_INFO: undefined;
  FAVORITE_CHEFS: undefined;
  FAVORITE_CUISINES: undefined;
  FEEDBACK: undefined;
  INVITE_FRIEND: undefined;
  PRIVACY_POLICY: undefined;
  REWARDS: undefined;
  TERMS_OF_SERVICE: undefined;
};

export type ProfileRouteNames = {
  ALLERGIES: 'ALLERGIES';
  CONTACT_INFO: 'CONTACT_INFO';
  FAVORITE_CHEFS: 'FAVORITE_CHEFS';
  FAVORITE_CUISINES: 'FAVORITE_CUISINES';
  FEEDBACK: 'FEEDBACK';
  INVITE_FRIEND: 'INVITE_FRIEND';
  PRIVACY_POLICY: 'PRIVACY_POLICY';
  REWARDS: 'REWARDS';
  TERMS_OF_SERVICE: 'TERMS_OF_SERVICE';
};
