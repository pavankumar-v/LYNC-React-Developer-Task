import { BookContext, BookContextType } from '@/contexts/BookContext';
import { Book, type Order } from '@/interface';
import React, { useContext } from 'react';
import { localizedDateFormat } from '@/utils/utils';

const Orders = () => {
  const { orders } = useContext(BookContext) as BookContextType;

  return (
    <div className="container">
      <h1 className="text-3xl mb-4 flex flex-col gap-3">Your Orders</h1>
      {orders.map((order, i) => (
        <OrderCard order={order} key={i} />
      ))}
    </div>
  );
};

const OrderCard: React.FC<{ order: Order }> = ({ order }) => {
  const { books } = useContext(BookContext) as BookContextType;

  const book: Book | undefined = books.find((book) => book.id == order.bookId);

  if (book) {
    return (
      <div className="flex justify-between gap-4 p-3 border bg-card rounded-xl">
        <div className="flex gap-3">
          <img
            src={book?.volumeInfo.imageLinks.thumbnail}
            alt=""
            width={100}
            className="rounded-sm"
          />
          <div className="flex flex-col">
            <h4 className="text-primary text-2xl">{book?.volumeInfo.title}</h4>
            <p className="text-sm text-forground">
              {book?.volumeInfo.subtitle}
            </p>
            <p>Ordered On: {localizedDateFormat(order.createdAt)}</p>
            <h2 className="text-lg text-accent mt-2">
              {book?.saleInfo.listPrice?.amount}{' '}
              {book?.saleInfo.listPrice?.currencyCode}
            </h2>
          </div>
        </div>
      </div>
    );
  }

  return null;
};

export default Orders;
