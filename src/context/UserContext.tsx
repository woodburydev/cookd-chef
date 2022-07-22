import React, { createContext, PropsWithChildren, useContext, useEffect, useState } from 'react';
import axios from 'axios';
import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';
import { endpoint } from '@config/api';
import { UserContextType } from './ContextTypes';

export const UserContext = createContext<Partial<UserContextType>>({});
export default function Context(props: PropsWithChildren<any>) {
  const [user, setUser] = useState<any>(undefined);
  const [databaseFetchError, setDatabaseFetchError] = useState(false);
  const [loadingUserContext, setLoadingUserContext] = useState<boolean>(false);
  const [linkToProfilePicture, setLinkToProfilePicture] = useState<string>('');
  const [forceUpdateOfProfilePicture, setForceUpdateOfProfilePicture] = useState(false)

  // helpful for when we dont want to get the user until a process is finished, like in the register screen.
  const [overrideGet, setOverrideGet] = useState(false);
  const getUser = (authUser: FirebaseAuthTypes.User) => {
    const uid = authUser.uid;
    authUser.getIdToken().then((token: string) => {
      axios
        .get(`${endpoint}/cook/${uid}`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => {
          // check for response if its empty by finding id ?
          if (res.data.id) {
            setUser(res.data);
            console.log(res.data);
            setLoadingUserContext(false);
            setDatabaseFetchError(false);
          } else {
            console.error('No response from database getting user');
            setUser(null);
            setDatabaseFetchError(true);
            setLoadingUserContext(false);
          }
        })
        .catch(() => {
          setUser(null);
          setDatabaseFetchError(true);
          setLoadingUserContext(false);
          // maybe get some state for the specific error being returned from server
        });
    });
  };

  useEffect(() => {
    if (user) {
      // if api is broken we get a loading sign because itll return a weird firebase url. fix this in backend
      axios.get(`${endpoint}/cook/profilePicture?user=${user.email}`).then(res => {
        setLinkToProfilePicture(res.data);
      }).catch(() => {
      })
    }
  }, [user, forceUpdateOfProfilePicture])

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged((authUser) => {
      if (authUser && !overrideGet) {
        setLoadingUserContext(true);
        getUser(authUser);
      } else {
        setUser(null);
      }
    });

    return subscriber; // unsubscribe on unmount
  }, [overrideGet]);

  return (
    <UserContext.Provider
      value={{
        user,
        setOverrideGet,
        databaseFetchError,
        getUser,
        loadingUserContext,
        profilePicture: {
          linkToProfilePicture,
          forceUpdateOfProfilePicture,
          setForceUpdateOfProfilePicture
        },

      }}
    >
      {props.children}
    </UserContext.Provider>
  );
}

export const useGetUser = () => useContext(UserContext);
