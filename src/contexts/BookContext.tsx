import { CartItem, Order, Book, User, Bookmark } from '@/interface';
import { getBooks, searchBookApi } from '@/services/bookService';
import React, { createContext, useContext, useEffect, useReducer } from 'react';
import { AuthContext } from './AuthContext';
import { AuthContextType, BookContextType, Query } from '@/types';

import {
  bookReducer,
  bookmarkReducer,
  cartReducer,
  orderReducer,
} from '@/reducers/bookReducers';
import useToggle from '@/hooks/useToggle';

export const BookContext = createContext<BookContextType | null>(null);

type Props = {
  children: JSX.Element | JSX.Element[];
};

const BookContextProvider: React.FC<Props> = ({ children }) => {
  const { user } = useContext(AuthContext) as AuthContextType;
  const [cartItems, cartDispatch] = useReducer(cartReducer, []);
  const [orders, orderDispatch] = useReducer(orderReducer, []);
  const [bookmarks, bookmarkDispatch] = useReducer(bookmarkReducer, []);
  const [books, bookDispatch] = useReducer(bookReducer, []);
  const [isLoading, toogleLoading] = useToggle(false);

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
    bookDispatch({ type: 'add', payload: books });
  }

  function loadOrder() {
    const ordersJsonData = localStorage.getItem('orders');

    if (ordersJsonData) {
      let ordersData: Order[] = JSON.parse(ordersJsonData);
      ordersData = ordersData.filter((order) => order.userId == user?.id);
      orderDispatch({ type: 'add', payload: ordersData });
    }
  }

  async function searchBook(
    searchTerm: string,
    q?: {
      [key in Query]?: string;
    }
  ) {
    toogleLoading();
    const books: Book[] = await searchBookApi(searchTerm, q);
    bookDispatch({ type: 'add', payload: books });
    toogleLoading();
  }

  function searchBookmarks(searchTerm: string) {
    if (searchTerm) {
      const searchedBookMarks = bookmarks.filter((bookmark) => {
        const book: Book | undefined = books.find(
          (book) => book.id == bookmark.bookId
        );
        if (book) {
          if (book.volumeInfo.title.toLowerCase().includes(searchTerm)) {
            return true;
          }

          if (book.volumeInfo.subtitle.includes(searchTerm)) {
            return true;
          }
        }
        return false;
      });

      bookmarkDispatch({ type: 'add', payload: searchedBookMarks });
    } else {
      loadBookmarks();
    }
  }

  function searchOrders(searchTerm: string) {
    if (searchTerm) {
      const searchedOrders = orders.filter((order) => {
        const book: Book | undefined = books.find(
          (book) => book.id == order.bookId
        );
        if (book) {
          if (book.volumeInfo.title.toLowerCase().includes(searchTerm)) {
            return true;
          }

          if (book.volumeInfo.subtitle?.toLowerCase().includes(searchTerm)) {
            return true;
          }
        }
        return false;
      });

      orderDispatch({ type: 'add', payload: searchedOrders });
    } else {
      loadOrder();
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
        searchBook,
        searchBookmarks,
        searchOrders,
        isLoading,
      }}
    >
      {children}
    </BookContext.Provider>
  );
};

export default BookContextProvider;
