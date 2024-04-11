import React, { createContext, useEffect, useReducer } from 'react';
import useToggle from '@/hooks/useToggle';
import { User } from '@/interface';
import { useNavigate } from 'react-router-dom';

export const AuthContext = createContext<AuthContextType | null>(null);

type UserAction = {
  type: 'setUser' | 'removeUser';
  payload?: User;
};

function userReducer(state: User | null, action: UserAction): User | null {
  switch (action.type) {
    case 'setUser':
      if (action.payload) {
        return action.payload;
      }
      return null;

    case 'removeUser':
      return null;

    default:
      return null;
  }
}

export type AuthContextType = {
  user: User | null;
  isAuthenticated: boolean;
  loginWithRedirect: () => void;
  logOutUser: () => void;
  loginUser: (user: User) => void;
  isLoading: boolean;
};

const AuthContextProvider: React.FC<{
  children: JSX.Element | JSX.Element[];
}> = ({ children }) => {
  const [user, userDispatch] = useReducer(userReducer, null);
  const [isLoading, toogleLoading] = useToggle(true);
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

    toogleLoading();
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
        isLoading,
        loginWithRedirect,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
