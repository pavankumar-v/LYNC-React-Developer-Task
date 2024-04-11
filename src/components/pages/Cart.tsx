import React, { useContext } from 'react';
import { BookContext } from '@/contexts/BookContext';
import { BookContextType } from '@/types';
import { CartItem } from '@/interface';
import CheckOutButton from '../book/CheckOutButton';
import Button from '../ui/Button';

const Cart: React.FC = () => {
  const { books, cartItems, removeFromCart } = useContext(
    BookContext
  ) as BookContextType;
  const cartBooks: CartItem[] = cartItems.reduce(
    (filteredBooks: CartItem[], cartItem) => {
      const book = books.find((book) => book.id == cartItem.bookId);
      if (book) {
        filteredBooks.push({ ...cartItem, book });
      }
      return filteredBooks;
    },
    []
  );

  const totalPrice: number | undefined = cartBooks
    .map((cart) => cart.book?.saleInfo.listPrice?.amount)
    .reduce((total, bookPrice) => (total || 0) + (bookPrice || 0), 0);

  if (cartBooks.length == 0) {
    return (
      <div className="container flex justify-center items-center">
        <p className="text-lg font-bold p-5 text-center">
          Oops! Nothing in your cart 🛒? <br /> Add Few Books
        </p>
      </div>
    );
  }

  return (
    <>
      <div className="container flex flex-col gap-5 w-full mt-2">
        {cartBooks.map((cart, i) => (
          <div
            className="flex justify-between gap-4 p-3 border bg-card rounded-xl"
            key={i}
          >
            <div className="flex gap-3">
              <img
                src={cart.book?.volumeInfo.imageLinks.thumbnail}
                alt=""
                width={50}
                className="rounded-sm"
              />
              <div className="flex flex-col">
                <h4 className="text-primary text-lg">
                  {cart.book?.volumeInfo.title} {cart.id}
                </h4>
                <p className="text-sm text-forground">
                  {cart.book?.volumeInfo.subtitle}
                </p>
                <h2 className="text-md text-accent mt-2">
                  {cart.book?.saleInfo.listPrice?.amount}{' '}
                  {cart.book?.saleInfo.listPrice?.currencyCode}
                </h2>
              </div>
            </div>
            <Button
              variant="destructive"
              className="self-start"
              onClick={() => {
                removeFromCart(cart.id);
              }}
            >
              Remove
            </Button>
          </div>
        ))}
      </div>
      <div className="fixed w-full z-40 bottom-0 bg-accent p-3">
        <div className="container flex justify-between items-center">
          <h2 className="text-lg font-bold">Total: {totalPrice}</h2>
          <CheckOutButton cartItems={cartBooks} />
        </div>
      </div>
    </>
  );
};

export default Cart;
