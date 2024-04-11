import { BookContext } from '@/contexts/BookContext';
import { BookContextType } from '@/types';
import { Book, type Order } from '@/interface';
import React, { useContext, useState } from 'react';
import { localizedDateFormat } from '@/utils/utils';
import StaticSearchFilter from '../book/StaticSearchFilter';

const Orders = () => {
  const { orders, searchOrders } = useContext(BookContext) as BookContextType;
  const [searchTerm, setSearchTerm] = useState('');

  function handleBookmarksSearch(searchText: string) {
    setSearchTerm(searchText);
    searchOrders(searchText);
  }

  if (orders.length == 0 && !searchTerm) {
    return (
      <div className="container p-4">
        <p className="text-lg font-bold text-center">No Orders Found 🥺</p>
      </div>
    );
  }

  return (
    <div className="container">
      <h1 className="text-3xl mb-4 ">Your Orders</h1>
      <div className="my-4">
        <StaticSearchFilter searchCallback={handleBookmarksSearch} />
      </div>
      <div className="flex flex-col gap-3 mb-4">
        {orders.map((order, i) => (
          <OrderCard order={order} key={i} />
        ))}
      </div>
    </div>
  );
};

const OrderCard: React.FC<{ order: Order }> = ({ order }) => {
  const { books } = useContext(BookContext) as BookContextType;

  const book: Book | undefined = books.find((book) => book.id == order.bookId);

  if (book) {
    return (
      <div className="flex justify-between gap-4 p-3 border border-primary/40 bg-card rounded-[1.2rem]">
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
