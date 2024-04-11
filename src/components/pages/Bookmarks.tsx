import React, { useContext, useState } from 'react';
import { BookContext } from '@/contexts/BookContext';
import { BookContextType } from '@/types';
import { BooksGrid } from './Books';
import { Book } from '@/interface';
import StaticSearchFilter from '@components/book/StaticSearchFilter';

const Bookmarks = () => {
  const { books, bookmarks, searchBookmarks } = useContext(
    BookContext
  ) as BookContextType;
  const [searchTerm, setSearchTerm] = useState('');

  const bookmarkedBooks: Book[] = books.filter((book) =>
    bookmarks.map((bookmark) => bookmark.bookId).includes(book.id)
  );

  function handleBookmarksSearch(searchText: string) {
    setSearchTerm(searchText);
    searchBookmarks(searchText);
  }

  if (bookmarkedBooks.length == 0 && !searchTerm) {
    return (
      <div className="container p-10 flex justify-center items-center">
        <p>You have Not Bookmarked Any Books 🔖</p>
      </div>
    );
  }

  return (
    <div className="container mt-4">
      <StaticSearchFilter searchCallback={handleBookmarksSearch} />
      <BooksGrid books={bookmarkedBooks} />
    </div>
  );
};

export default Bookmarks;
