import React, { useContext } from 'react';
import Button from '@ui/Button';
import { BookContext } from '@/contexts/BookContext';
import { BookContextType } from '@/types';
import { AuthContext } from '@/contexts/AuthContext';
import { AuthContextType } from '@/types';
import { Book, BookSaleAbility } from '@/interface';
import { useNavigate } from 'react-router-dom';

type Props = {
  book: Book;
};

const AddToCartButton: React.FC<Props> = ({ book }) => {
  const { addToCart, cartItems } = useContext(BookContext) as BookContextType;
  const { user } = useContext(AuthContext) as AuthContextType;
  const navigate = useNavigate();

  const isBookInCart = cartItems.find((cartItem) => {
    return cartItem.bookId == book.id && cartItem.userId == user?.id;
  })
    ? true
    : false;

  const isBookForSale = book.saleInfo.saleability == BookSaleAbility.FOR_SALE;

  function handleAddBookmark(
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) {
    e.stopPropagation();

    if (isBookInCart) {
      return navigate('/cart');
    }

    if (user) {
      addToCart(book, user);
    }
  }

  if (!isBookForSale) {
    return <p className="text-destructive">Not For Sale</p>;
  }

  if (user) {
    return (
      <Button onClick={handleAddBookmark}>
        {isBookInCart ? 'Go to Cart' : 'Buy Now'}
      </Button>
    );
  }

  return null;
};

export default AddToCartButton;
