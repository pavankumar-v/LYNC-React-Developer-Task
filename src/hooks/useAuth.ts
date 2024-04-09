import { useReducer } from 'react';
import { User } from '@/interface';
import { useNavigate } from 'react-router-dom';

type UserAction = {
  type: 'login';
  payload?: User;
};

function userReducer(state: User | null, action: UserAction): User | null {
  switch (action.type) {
    case 'login':
      if (action.payload) {
        const user = { ...action.payload, id: 'dsdf' };
        localStorage.setItem('user', JSON.stringify(user));
        return user;
      }

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
};

export default function useAuth(): UseAuthHook {
  const [user, userDispatch] = useReducer(userReducer, null);
  const navigate = useNavigate();

  const isAuthenticated = user ? true : false;

  function loginWithRedirect() {
    if (user) {
      return navigate('/books');
    }

    navigate('/auth/login');
  }

  return {
    user,
    userDispatch,
    isAuthenticated,
    loginWithRedirect,
  };
}
