import React from 'react';
import { Book } from '@/interface';
import BookInfo from '@components/book/BookInfo';
import useBook from '@/hooks/useBook';

const Books: React.FC = () => {
  const { books } = useBook();
  return (
    <div className="container">
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 py-5">
        {books.map((book: Book, i: number) => (
          <BookInfo book={book} key={i} />
        ))}
      </div>
    </div>
  );
};

export default Books;
