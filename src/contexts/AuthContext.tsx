import React, { createContext, useEffect, useReducer } from 'react';
import { User } from '@/interface';
import { useNavigate } from 'react-router-dom';
import { AuthContextType } from '@/types';
import { userReducer } from '@/reducers/authReducers';
import useToggle from '@/hooks/useToggle';
import { debounce } from '@/utils/utils';

export const AuthContext = createContext<AuthContextType | null>(null);

type Props = {
  children: JSX.Element | JSX.Element[];
};

const AuthContextProvider: React.FC<Props> = ({ children }) => {
  const [user, userDispatch] = useReducer(userReducer, null);
  const [isLoadingUser, toggleLoading] = useToggle(true);
  const navigate = useNavigate();

  useEffect(() => {
    debounce(loadUser, 700)();
  }, []);

  const isAuthenticated = user ? true : false;

  function loginWithRedirect() {
    if (user) {
      return navigate('/books');
    }

    navigate('/auth/login');
  }

  async function loadUser() {
    const userJson = localStorage.getItem('user');
    if (userJson) {
      const user: User = JSON.parse(userJson);
      if (user) {
        userDispatch({ type: 'setUser', payload: user });
      }
    }

    toggleLoading(false);
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
        isLoadingUser,
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
