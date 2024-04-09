import React from 'react';
import { Book } from '@/interface';

type Props = {
  book: Book;
};

const BookInfo: React.FC<Props> = ({ book }) => {
  console.log(book);
  return (
    <div className="!bg-card p-4 border border-primary/20 rounded-lg">
      {book.volumeInfo.imageLinks?.thumbnail && (
        <img src={book.volumeInfo.imageLinks.thumbnail} alt="" width={100} />
      )}
      <div className="mt-2">
        <h2>{book.volumeInfo.title}</h2>
        <p className="text-secondary-foreground/50 text-sm font-light max-h-9 truncate">
          {book.volumeInfo.subtitle}
        </p>
        <p>
          {book.volumeInfo.authors.map((author: string, i: number) => (
            <p key={i} className="text-xs text-secondary/90">
              {author}
            </p>
          ))}
        </p>
      </div>
    </div>
  );
};

export default BookInfo;
