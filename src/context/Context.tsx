import React, {createContext, useEffect, useState} from 'react';
import axios from 'axios';
import auth from '@react-native-firebase/auth';
import {endpoint} from '../config/api';

export const myContext = createContext({});
export default function Context(props: any) {
  const [user, setUser] = useState<any>();
  const [databaseFetchError, setDatabaseFetchError] = useState(false);
  // helpful for when we dont want to get the user until a process is finished, like in the register screen.
  const [overrideGet, setOverrideGet] = useState(false);

  const autoGetUser = (authUser: any) => {
    const uid = authUser.uid;
    authUser.getIdToken().then((token: string) => {
      axios
        .get(`${endpoint}/cook/${uid}`, {
          headers: {Authorization: `Bearer ${token}`},
        })
        .then(res => {
          // check for response if its empty by finding id ?
          if (res.data.id) {
            console.log(res.data);
            setUser(res.data);
            setDatabaseFetchError(false);
          } else {
            console.error('No response from database getting user');
            setDatabaseFetchError(true);
          }
        })
        .catch(error => {
          console.log(JSON.stringify(error));
          setUser(null);
          setDatabaseFetchError(true);
          // maybe get some state for the specific error being returned from server
        });
    });
  };
  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(authUser => {
      if (authUser && !overrideGet) {
        console.log('getting user');
        autoGetUser(authUser);
      } else {
        console.log('setting user');
        setUser(null);
      }
    });

    return subscriber; // unsubscribe on unmount
  }, [overrideGet]);

  return (
    <myContext.Provider value={{user, setOverrideGet, databaseFetchError}}>
      {props.children}
    </myContext.Provider>
  );
}
