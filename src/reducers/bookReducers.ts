import { CartItem, Order, Book, Bookmark } from '@/interface';

import {
  CartActionType,
  OrderActionType,
  BookmarkActionType,
  BookActionType,
} from '@/types';

export function cartReducer(
  state: CartItem[],
  action: CartActionType
): CartItem[] {
  switch (action.type) {
    case 'add':
      if (action.payload) {
        return action.payload;
      }
      return [];
    case 'remove':
      if (action.payload) {
        return action.payload;
      }
      return [];
    default:
      return [];
  }
}

export function orderReducer(state: Order[], action: OrderActionType): Order[] {
  switch (action.type) {
    case 'add':
      if (action.payload) {
        return action.payload;
      }
      return [];
    default:
      return [];
  }
}

export function bookmarkReducer(
  state: Bookmark[],
  action: BookmarkActionType
): Bookmark[] {
  switch (action.type) {
    case 'add':
      if (action.payload) {
        return [...action.payload];
      }

      return [];
    case 'remove':
      return [];
    default:
      return [];
  }
}

export function bookReducer(state: Book[], action: BookActionType): Book[] {
  switch (action.type) {
    case 'add':
      return action.payload || [];
    default:
      return [];
  }
}
