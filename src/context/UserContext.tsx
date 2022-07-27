import React, { createContext, PropsWithChildren, useContext, useEffect, useState } from 'react';
import { UserContextType } from './ContextTypes';

// export const UserContext = createContext<Partial<UserContextType>>({});
export const UserContext = createContext<{}>({});
export default function Context(props: PropsWithChildren<any>) {

  return (
    <UserContext.Provider
      value={{}}
    >
      {props.children}
    </UserContext.Provider>
  );
}

export const useGetUser = () => useContext(UserContext);
