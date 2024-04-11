import { Book, BookSaleAbility } from '@/interface';
import { getBook } from '@/services/bookService';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Button from '@ui/Button';
import BookmarkButton from '../book/BookmarkButton';

const BookInfo: React.FC = () => {
  const [book, setBook] = useState<Book | null>(null);
  const { id } = useParams();
  const isBookForSale = book?.saleInfo.saleability == BookSaleAbility.FOR_SALE;

  useEffect(() => {
    getBook(id || '').then((book) => {
      setBook(book);
    });
  }, []);

  if (book) {
    return (
      <div className="h-full container mt-6">
        <div className="flex gap-5">
          <img
            src={book.volumeInfo.imageLinks.thumbnail}
            alt="thumbnail"
            width={200}
            className="rounded-xl"
          />
          <div className="flex flex-col justify-between">
            <div>
              <h2 className="text-5xl font-bold max-w-2/4 text-primary">
                {book.volumeInfo.title}
              </h2>
              <p className="text-foreground/80 text-lg mt-2">
                {book.volumeInfo.subtitle}
              </p>
              <a
                href={book.volumeInfo.previewLink}
                target="_blank"
                rel="noreferrer"
                className="link"
              >
                Preview
              </a>
            </div>

            <div className="">
              <p className="text-xl">
                Total Pages: {book.volumeInfo.pageCount}
              </p>
              {!isBookForSale ? (
                <p className="text-destructive text-lg">Not For Sale</p>
              ) : (
                <>
                  <p className="font-bolder text-3xl text-accent">
                    {book.saleInfo.listPrice?.amount}{' '}
                    {book.saleInfo.listPrice?.currencyCode}
                  </p>
                  <div className="flex gap-2 mt-3">
                    <Button size="lg">Buy Now</Button>
                  </div>
                </>
              )}
              <BookmarkButton book={book} />
            </div>
          </div>
        </div>
        <div className="mt-5">
          <div className="">
            <h4 className="text-xl text-primary">Description</h4>
            <p
              className="mt-3 text-xl"
              dangerouslySetInnerHTML={{ __html: book.volumeInfo.description }}
            />
          </div>
        </div>
      </div>
    );
  }

  return <h2>Book Not Found</h2>;
};

export default BookInfo;
