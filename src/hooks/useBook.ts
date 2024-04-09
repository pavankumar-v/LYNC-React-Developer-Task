import { useReducer, useEffect } from 'react';
import { Book } from '@/interface';
import { getBooks } from '@/services/bookService';

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

export default function useBook() {
  const [books, bookDispatch] = useReducer(bookReducer, []);

  useEffect(() => {
    loadBooks();
  }, []);

  async function loadBooks(): Promise<void> {
    const books: Book[] = await getBooks();
    bookDispatch({ type: 'fetch', payload: books });
  }

  return { books, bookDispatch };
}
