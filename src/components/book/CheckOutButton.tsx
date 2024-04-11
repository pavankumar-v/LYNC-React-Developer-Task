import React from 'react';
import Button from '@ui/Button';
import { Book } from '@/interface';

type Props = {
  cartBooks: Book[];
};

const CheckOutButton: React.FC<Props> = ({ cartBooks }) => {
  return (
    <Button variant="secondary" size="lg" disabled={cartBooks.length == 0}>
      Check Out
    </Button>
  );
};

export default CheckOutButton;
