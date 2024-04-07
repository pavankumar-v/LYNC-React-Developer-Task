import React from 'react';
import Button from '@ui/Button';
import { Link } from 'react-router-dom';

const NavItems: React.FC = () => {
  return (
    <ul className="flex justify-center items-center gap-2">
      <li className="text">
        <Button variant="default">
          <Link to={'/books'}>Books</Link>
        </Button>
      </li>
      <li>
        <Button variant="default">
          <Link to={'/bookmarks'}>Bookmarks</Link>
        </Button>
      </li>
      <Button>Login</Button>
    </ul>
  );
};

export default NavItems;
