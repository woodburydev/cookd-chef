import Start from '@screens/Login/Start';
import OTP from '@screens/Login/OTP';
import Password from '@screens/Login/Password';
import Signup from '@screens/Login/Signup';
import FoundOut from 'src/screens/Login/FoundOut';
import PhoneNumber from 'src/screens/Login/PhoneNumber';
import Email from 'src/screens/Login/Email';
import Address from 'src/screens/Login/Address';
import Final from 'src/screens/Login/Final';
import CreateProfile from 'src/screens/Login/GetStarted/CreateProfile';
import Cook from 'src/screens/Login/GetStarted/Cook';
import Management from 'src/screens/Login/GetStarted/Management';
import Grow from 'src/screens/Login/GetStarted/Grow';

export const SignUpRoutes = {
  SIGN_UP: {
    name: 'SIGN_UP',
    component: Signup,
  },
  EMAIL: {
    name: 'EMAIL',
    component: Email,
  },
  SET_PASSWORD: {
    name: 'SET_PASSWORD',
    component: Password,
  },
  ADDRESS: {
    name: 'ADDRESS',
    component: Address,
  },
  FOUND_OUT: {
    name: 'FOUND_OUT',
    component: FoundOut,
  },
};

export const GetStartedRoutes = {
  CREATE_PROFILE: {
    name: 'CREATE_PROFILE',
    component: CreateProfile,
  },
  COOK: {
    name: 'COOK',
    component: Cook,
  },
  CUSTOMER_MANAGEMENT: {
    name: 'CUSTOMER_MANAGEMENT',
    component: Management,
  },
  GROW: {
    name: 'GROW',
    component: Grow,
  },
};

export const LoginRoutes = {
  GET_STARTED: {
    name: 'GET_STARTED',
    component: Start,
  },
  PHONE_NUMBER: {
    name: 'PHONE_NUMBER',
    component: PhoneNumber,
  },
  SIGN_UP: {
    name: 'SIGN_UP',
    component: Signup,
  },
  EMAIL: {
    name: 'EMAIL',
    component: Email,
  },
  ENTER_OTP: {
    name: 'ENTER_OTP',
    component: OTP,
  },
  SET_PASSWORD: {
    name: 'SET_PASSWORD',
    component: Password,
  },
  ADDRESS: {
    name: 'ADDRESS',
    component: Address,
  },
  FOUND_OUT: {
    name: 'FOUND_OUT',
    component: FoundOut,
  },
  FINAL: {
    name: 'FINAL',
    component: Final,
  },
  ...GetStartedRoutes,
};
