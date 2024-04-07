import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../ui/Button';

const Navbar: React.FC = () => {
  return (
    <nav className="sticky top-0 z-50 text-foreground py-3">
      <div className="container flex justify-between items-center">
        <div>
          <Link to={'/books'} className="text-xl text-primary">
            Book Store
          </Link>
        </div>
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
      </div>
    </nav>
  );
};

export default Navbar;
