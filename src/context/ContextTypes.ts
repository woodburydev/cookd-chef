import {FirebaseAuthTypes} from '@react-native-firebase/auth';
import {Dispatch, SetStateAction} from 'react';

export interface UserContextType {
  user: User;
  setOverrideGet: Dispatch<SetStateAction<boolean>>;
  databaseFetchError: boolean;
  getUser: (authUser: FirebaseAuthTypes.User) => void;
  loadingUserContext: boolean;
}

export interface User {
  allergies: string[];
  cuisines: string[];
  displayname: string;
  email: string;
  fbuuid: string;
  id: number;
  phone: string;
}
