import useAuth, { UseAuthHook } from '@/hooks/useAuth';
import React, { createContext } from 'react';

export const AuthContext = createContext<UseAuthHook>({} as UseAuthHook);

const AuthContextProvider: React.FC<{
  children: JSX.Element | JSX.Element[];
}> = ({ children }) => {
  const auth = useAuth();
  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
};

export default AuthContextProvider;
