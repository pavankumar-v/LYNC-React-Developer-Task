import { CartItem, Order, Book, User, Bookmark } from '@/interface';
import { getBooks } from '@/services/bookService';
import React, { createContext, useContext, useEffect, useReducer } from 'react';
import { AuthContext, AuthContextType } from './AuthContext';

export type BookContextType = {
  books: Book[];
  cartItems: CartItem[];
  orders: Order[];
  bookmarks: Bookmark[];
  addToCart: (book: Book, user: User) => void;
  removeFromCart: (cartId: string) => void;
  createOrder: () => void;
  addToBookMarks: (book: Book, user: User) => void;
  removeFromBookmarks: (bookmarkId: string) => void;
};

type CartActionType = {
  type: 'add' | 'remove';
  payload?: CartItem[];
};

type OrderActionType = {
  type: 'add' | 'remove';
  payload?: Order[];
};

type BookmarkActionType = {
  type: 'add' | 'remove';
  payload?: Bookmark[];
};

export const BookContext = createContext<BookContextType | null>(null);

function cartReducer(state: CartItem[], action: CartActionType): CartItem[] {
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

function orderReducer(state: Order[], action: OrderActionType): Order[] {
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

function bookmarkReducer(
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

export type BookActions = 'fetch';

type BookActionType = {
  type: BookActions;
  payload?: Book[];
};

function bookReducer(state: Book[], action: BookActionType): Book[] {
  switch (action.type) {
    case 'fetch':
      return action.payload || [];
    default:
      return [];
  }
}

const BookContextProvider: React.FC<{
  children: JSX.Element | JSX.Element[];
}> = ({ children }) => {
  const { user } = useContext(AuthContext) as AuthContextType;
  const [cartItems, cartDispatch] = useReducer(cartReducer, []);
  const [orders, orderDispatch] = useReducer(orderReducer, []);
  const [bookmarks, bookmarkDispatch] = useReducer(bookmarkReducer, []);
  const [books, bookDispatch] = useReducer(bookReducer, []);

  function addToCart(book: Book, user: User) {
    const cartItem: CartItem = {
      id: Math.random().toString(),
      bookId: book.id,
      userId: user.id,
    };

    cartItems.push(cartItem);
    localStorage.setItem('cartItems', JSON.stringify(cartItems));

    cartDispatch({ type: 'add', payload: [...cartItems] });
  }

  function removeFromCart(cartId: string) {
    const updatedCart = cartItems.filter((cartItem) => cartItem.id !== cartId);
    localStorage.setItem('cartItems', JSON.stringify(updatedCart));

    cartDispatch({ type: 'remove', payload: [...updatedCart] });
  }

  function createOrder() {
    let newOrders: Order[] = cartItems.map((cart) => ({
      id: Math.random().toString(),
      bookId: books.find((book) => book.id == cart.bookId)?.id || '',
      userId: cart.userId,
      createdAt: new Date(),
    }));
    console.log(newOrders);

    newOrders = [...orders, ...newOrders];
    localStorage.setItem('orders', JSON.stringify(newOrders));

    orderDispatch({ type: 'add', payload: newOrders });

    localStorage.setItem('cartItems', '');
    cartDispatch({ type: 'add', payload: [] });
  }

  function addToBookMarks(book: Book, user: User) {
    const bookmark: Bookmark = {
      id: Math.random().toString(),
      bookId: book.id,
      userId: user.id,
    };

    bookmarks.push(bookmark);
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));

    bookmarkDispatch({ type: 'add', payload: bookmarks });
  }

  function removeFromBookmarks(bookmarkId: string) {
    const bookmark: Bookmark | undefined = bookmarks.find(
      (bookmark) => bookmark.id == bookmarkId
    );

    if (bookmark) {
      // cartDispatch({ type: 'remove', payload: bookmark });
    }
  }

  function loadBookmarks() {
    if (user) {
      const bookMarkData = localStorage.getItem('bookmarks');

      if (bookMarkData) {
        let bookmarks: Bookmark[] = JSON.parse(bookMarkData);
        bookmarks = bookmarks.filter((bookmark) => bookmark.userId == user.id);

        bookmarkDispatch({ type: 'add', payload: [...bookmarks] });
      }
    }
  }

  function loadCartItems() {
    if (user) {
      const cartData = localStorage.getItem('cartItems');

      if (cartData) {
        let cartItems: CartItem[] = JSON.parse(cartData);
        cartItems = cartItems.filter((cartItem) => cartItem.userId == user.id);

        cartDispatch({ type: 'add', payload: [...cartItems] });
      }
    }
  }

  async function loadBooks(): Promise<void> {
    const books: Book[] = await getBooks();
    bookDispatch({ type: 'fetch', payload: books });
  }

  function loadOrder() {
    const ordersJsonData = localStorage.getItem('orders');
    console.log(ordersJsonData);
    if (ordersJsonData) {
      let ordersData: Order[] = JSON.parse(ordersJsonData);
      ordersData = ordersData.filter((order) => order.userId == user?.id);
      orderDispatch({ type: 'add', payload: ordersData });
    }
  }

  useEffect(() => {
    loadBooks();
    loadBookmarks();
    loadCartItems();
    loadOrder();
  }, [user]);

  return (
    <BookContext.Provider
      value={{
        books,
        cartItems,
        orders,
        bookmarks,
        addToCart,
        removeFromCart,
        createOrder,
        addToBookMarks,
        removeFromBookmarks,
      }}
    >
      {children}
    </BookContext.Provider>
  );
};

export default BookContextProvider;
