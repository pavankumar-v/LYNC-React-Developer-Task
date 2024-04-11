import { User } from '@/interface';
import { UserAction } from '@/types';

export function userReducer(
  state: User | null,
  action: UserAction
): User | null {
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
