import React from 'react';
import Button from '@ui/Button';
import { CartItem } from '@/interface';

type Props = {
  cartItems: CartItem[];
};

const CheckOutButton: React.FC<Props> = ({ cartItems }) => {
  return (
    <Button variant="secondary" size="lg" disabled={cartItems.length == 0}>
      Check Out
    </Button>
  );
};

export default CheckOutButton;
