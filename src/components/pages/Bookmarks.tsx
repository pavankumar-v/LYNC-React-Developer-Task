import React, { useContext } from 'react';
import { BookContext } from '@/contexts/BookContext';
import { BookContextType } from '@/types';
import { BooksGrid } from './Books';
import { Book } from '@/interface';

const Bookmarks = () => {
  const { books, bookmarks } = useContext(BookContext) as BookContextType;
  const bookmarkedBooks: Book[] = books.filter((book) =>
    bookmarks.map((bookmark) => bookmark.bookId).includes(book.id)
  );

  return (
    <div className="container">
      <BooksGrid books={bookmarkedBooks} />
    </div>
  );
};

export default Bookmarks;
