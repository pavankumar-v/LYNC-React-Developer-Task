import React, { useContext } from 'react';
import { Book } from '@/interface';
import BookInfo from '@components/book/BookInfo';
import { BookContext } from '@/contexts/BookContext';
import { BookContextType } from '@/types';
import SearchFilter from '@components/book/SearchFilter';
import Spinner from '../ui/Spinner';

const Books: React.FC = () => {
  const { books, isLoading } = useContext(BookContext) as BookContextType;
  return (
    <div className="container mt-4">
      <SearchFilter />
      {isLoading ? (
        <Spinner>Loading books...</Spinner>
      ) : (
        <BooksGrid books={books} />
      )}
    </div>
  );
};

export const BooksGrid: React.FC<{ books: Book[] }> = ({ books }) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 py-5">
      {books.map((book: Book, i: number) => (
        <BookInfo book={book} key={i} />
      ))}
    </div>
  );
};
export default Books;
