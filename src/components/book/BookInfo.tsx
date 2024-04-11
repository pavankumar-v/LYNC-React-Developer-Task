import React from 'react';
import { Book } from '@/interface';
import BookmarkButton from '@components/book/BookmarkButton';
import { useNavigate } from 'react-router-dom';
import AddToCartButton from './AddToCartButton';

type Props = {
  book: Book;
};

const BookInfo: React.FC<Props> = ({ book }) => {
  const navigate = useNavigate();

  function handleBookInfo() {
    navigate(`/books/${book.id}`);
  }

  return (
    <div
      className="!bg-card border border-primary/20 rounded-lg overflow-hidden cursor-pointer"
      onClick={handleBookInfo}
    >
      {book.volumeInfo.imageLinks?.thumbnail && (
        <img
          src={book.volumeInfo.imageLinks.thumbnail}
          alt="thumbnail"
          width={100}
          className="w-full h-[15rem] object-cover"
        />
      )}
      <div className="px-4 pb-4 pt-2 flex flex-col h-full">
        <div>
          <h2 className="line-clamp-3 h-14 text-lg">{book.volumeInfo.title}</h2>
          <p className="text-secondary-foreground/60 text-sm font-light max-h-20 line-clamp-2 mt-2 h-16">
            {book.volumeInfo.subtitle}
          </p>
        </div>
        <div className="">
          <p className="text-foreground font-light text-sm mt-2">Authors</p>
          {book.volumeInfo.authors.map((author: string, i: number) => (
            <p key={i} className="text-xs text-foreground/40 font-light">
              {author}
            </p>
          ))}
          <div className="mt-3 flex justify-between items-center w-full">
            <AddToCartButton book={book} />
            <BookmarkButton book={book} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookInfo;
