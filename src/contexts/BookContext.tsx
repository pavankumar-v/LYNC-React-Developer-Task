import { CartItem, Order, Book, User, Bookmark } from '@/interface';
import { getBooks } from '@/services/bookService';
import React, { createContext, useEffect, useReducer } from 'react';

export type BookContextType = {
  books: Book[];
  cartItems: CartItem[];
  orders: Order[];
  bookmarks: Bookmark[];
  addToCart: (book: Book, user: User) => void;
  removeFromCart: (cartId: string) => void;
  createOrder: (book: Book, user: User) => void;
  addToBookMarks: (book: Book, user: User) => void;
  removeFromBookmarks: (bookmarkId: string) => void;
};

type CartActionType = {
  type: 'add' | 'remove';
  payload?: CartItem;
};

type OrderActionType = {
  type: 'add' | 'remove';
  payload?: Order;
};

type BookmarkActionType = {
  type: 'add' | 'remove';
  payload?: Bookmark[];
};

export const BookContext = createContext<BookContextType | null>(null);

function cartReducer(state: CartItem[], action: CartActionType): CartItem[] {
  switch (action.type) {
    case 'add':
      return [];
    case 'remove':
      return [];
    default:
      return [];
  }
}

function orderReducer(state: Order[], action: OrderActionType): Order[] {
  switch (action.type) {
    case 'add':
      return [];
    case 'remove':
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
  const [cartItems, cartDispatch] = useReducer(cartReducer, []);
  const [orders, orderDispatch] = useReducer(orderReducer, []);
  const [bookmarks, bookmarkDispatch] = useReducer(bookmarkReducer, []);
  const [books, bookDispatch] = useReducer(bookReducer, []);

  function addToCart(book: Book, user: User) {
    const cart: CartItem = {
      id: Math.random().toString(),
      bookId: book.id,
      userId: user.id,
    };

    cartDispatch({ type: 'add', payload: cart });
  }

  function removeFromCart(cartId: string) {
    const cart: CartItem | undefined = cartItems.find(
      (cartItem) => cartItem.id == cartId
    );

    if (cart) {
      cartDispatch({ type: 'remove', payload: cart });
    }
  }

  function createOrder(book: Book, user: User) {
    const order: Order = {
      id: Math.random().toString(),
      bookId: book.id,
      userId: user.id,
    };

    orderDispatch({ type: 'add', payload: order });
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
      cartDispatch({ type: 'remove', payload: bookmark });
    }
  }

  function loadBookmarks() {
    const bookMarkData = localStorage.getItem('bookmarks');
    console.log(bookMarkData);

    if (bookMarkData) {
      const bookmarks: Bookmark[] = JSON.parse(bookMarkData);
      bookmarkDispatch({ type: 'add', payload: [...bookmarks] });
    }
  }

  async function loadBooks(): Promise<void> {
    const books: Book[] = await getBooks();
    bookDispatch({ type: 'fetch', payload: books });
  }

  useEffect(() => {
    loadBookmarks();
    loadBooks();
  }, []);

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
