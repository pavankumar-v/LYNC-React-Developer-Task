import React, { createContext, useEffect, useReducer } from 'react';
import { User } from '@/interface';
import { useNavigate } from 'react-router-dom';
import { AuthContextType } from '@/types';
import { userReducer } from '@/reducers/authReducers';

export const AuthContext = createContext<AuthContextType | null>(null);

type Props = {
  children: JSX.Element | JSX.Element[];
};

const AuthContextProvider: React.FC<Props> = ({ children }) => {
  const [user, userDispatch] = useReducer(userReducer, null);
  const navigate = useNavigate();

  useEffect(() => {
    loadUser();
  }, []);

  const isAuthenticated = user ? true : false;

  function loginWithRedirect() {
    if (user) {
      return navigate('/books');
    }

    navigate('/auth/login');
  }

  function loadUser() {
    const userJson = localStorage.getItem('user');
    if (userJson) {
      const user: User = JSON.parse(userJson);
      if (user) {
        userDispatch({ type: 'setUser', payload: user });
      }
    }
  }

  function loginUser(user: User) {
    localStorage.setItem('user', JSON.stringify(user));
    userDispatch({ type: 'setUser', payload: user });
  }

  function logOutUser() {
    localStorage.removeItem('user');
    userDispatch({ type: 'removeUser' });
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        loginUser,
        logOutUser,
        loginWithRedirect,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
