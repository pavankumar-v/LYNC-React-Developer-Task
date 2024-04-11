import React, { useContext } from 'react';
import Button from '@ui/Button';
import { CartItem } from '@/interface';
import { BookContext } from '@/contexts/BookContext';
import { BookContextType } from '@/types';
import { useNavigate } from 'react-router-dom';

type Props = {
  cartItems: CartItem[];
};

const CheckOutButton: React.FC<Props> = ({ cartItems }) => {
  const { createOrder } = useContext(BookContext) as BookContextType;
  const navigate = useNavigate();
  function handleOrders() {
    createOrder();
    navigate('/orders');
  }
  return (
    <Button
      variant="secondary"
      size="lg"
      disabled={cartItems.length == 0}
      onClick={handleOrders}
    >
      Check Out
    </Button>
  );
};

export default CheckOutButton;
