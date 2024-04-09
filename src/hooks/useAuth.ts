import { useReducer } from 'react';
import { User } from '@/interface';
import { useNavigate } from 'react-router-dom';

type UserAction = {
  type: 'authenticate';
  payload?: object;
};

function userReducer(state: User | null, action: UserAction): User | null {
  switch (action.type) {
    case 'authenticate':
      return { id: '23243', email: 'example@example.com' };

    default:
      return null;
  }
}

export default function useAuth() {
  const [user, setUser] = useReducer(userReducer, null);
  const navigate = useNavigate();

  function loginWithRedirect() {
    if (user) {
      return navigate('/books');
    }

    navigate('/auth/login');
  }

  return { user, setUser, isAuthenticated: user || false, loginWithRedirect };
}
