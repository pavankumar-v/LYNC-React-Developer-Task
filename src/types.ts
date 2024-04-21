import { Book, CartItem, Order, Bookmark, User } from '@/interface';

export type BookContextType = {
  books: Book[];
  cartItems: CartItem[];
  orders: Order[];
  bookmarks: Bookmark[];
  addToCart: (book: Book, user: User) => void;
  removeFromCart: (cartId: string) => void;
  createOrder: () => void;
  addToBookMarks: (book: Book, user: User) => void;
  searchBook: (searchTerm: string, q?: QueriesType) => void;
  searchBookmarks: (searchTerm: string) => void;
  searchOrders: (searchTerm: string) => void;
  isLoading: boolean;
};

export type CartActionType = {
  type: 'add' | 'remove';
  payload?: CartItem[];
};

export type OrderActionType = {
  type: 'add' | 'remove';
  payload?: Order[];
};

export type BookmarkActionType = {
  type: 'add' | 'remove';
  payload?: Bookmark[];
};

export type BookActions = 'add';

export type BookActionType = {
  type: BookActions;
  payload?: Book[];
};

export type AuthContextType = {
  user: User | null;
  isAuthenticated: boolean;
  isLoadingUser: boolean;
  loginWithRedirect: () => void;
  logOutUser: () => void;
  loginUser: (user: User) => void;
};

export type UserAction = {
  type: 'setUser' | 'removeUser';
  payload?: User;
};

export type OptionType = { value: string; label: string };

export enum Query {
  category = 'category',
  language = 'language',
}

export type QueriesType = { [key in Query]?: string };
