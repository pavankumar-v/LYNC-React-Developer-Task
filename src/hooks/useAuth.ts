import { useEffect, useReducer } from 'react';
import { User } from '@/interface';
import { useNavigate } from 'react-router-dom';
import useToggle from './useToggle';

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

export type UseAuthHook = {
  user: User | null;
  userDispatch: React.Dispatch<UserAction>;
  isAuthenticated: boolean;
  loginWithRedirect: () => void;
  logOutUser: () => void;
  loginUser: (user: User) => void;
  isLoading: boolean;
};

export default function useAuth(): UseAuthHook {
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

  return {
    user,
    userDispatch,
    isAuthenticated,
    loginWithRedirect,
    logOutUser,
    loginUser,
    isLoading,
  };
}
