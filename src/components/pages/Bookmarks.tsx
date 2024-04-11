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

  if (bookmarkedBooks.length == 0) {
    return (
      <div className="container p-10 flex justify-center items-center">
        <p>You have Not Bookmarked Any Books 🔖</p>
      </div>
    );
  }

  return (
    <div className="container">
      <BooksGrid books={bookmarkedBooks} />
    </div>
  );
};

export default Bookmarks;
