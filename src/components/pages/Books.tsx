import React, { useContext } from 'react';
import { Book } from '@/interface';
import BookInfo from '@components/book/BookInfo';
import { BookContext, BookContextType } from '@/contexts/BookContext';

const Books: React.FC = () => {
  const { books } = useContext(BookContext) as BookContextType;
  return (
    <div className="container">
      <BooksGrid books={books} />
    </div>
  );
};

export const BooksGrid: React.FC<{ books: Book[] }> = ({ books }) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 py-5">
      {books.map((book: Book, i: number) => (
        <BookInfo book={book} key={i} />
      ))}
    </div>
  );
};
export default Books;
