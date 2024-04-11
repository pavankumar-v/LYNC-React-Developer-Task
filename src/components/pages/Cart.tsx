import React, { useContext } from 'react';
import { BookContext, BookContextType } from '@/contexts/BookContext';
import { Book } from '@/interface';
import CheckOutButton from '../book/CheckOutButton';

const Cart: React.FC = () => {
  const { books, cartItems } = useContext(BookContext) as BookContextType;
  const cartBooks: Book[] = books.filter((book) =>
    cartItems.map((cartItem) => cartItem.bookId).includes(book.id)
  );

  const totalPrice: number | undefined = cartBooks
    .map((book) => book.saleInfo.listPrice?.amount)
    .reduce((a, b) => (a || 0) + (b || 0), 0);

  return (
    <>
      <div className="container flex flex-col gap-5 w-full mt-2">
        {cartBooks.map((book, i) => (
          <div
            className="w-full flex gap-4 p-3 border bg-card rounded-xl"
            key={i}
          >
            <img
              src={book.volumeInfo.imageLinks.thumbnail}
              alt=""
              width={50}
              className="rounded-sm"
            />
            <div className="flex flex-col">
              <h4 className="text-primary text-lg">{book.volumeInfo.title}</h4>
              <p className="text-sm text-forground">
                {book.volumeInfo.subtitle}
              </p>
              <h2 className="text-md text-accent mt-2">
                {book.saleInfo.listPrice?.amount}{' '}
                {book.saleInfo.listPrice?.currencyCode}
              </h2>
            </div>
          </div>
        ))}
      </div>
      <div className="fixed w-full z-40 bottom-0 bg-accent p-3">
        <div className="container flex justify-between items-center">
          <h2 className="text-lg font-bold">Total: {totalPrice}</h2>
          <CheckOutButton cartBooks={cartBooks} />
        </div>
      </div>
    </>
  );
};

export default Cart;
