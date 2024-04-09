import React from 'react';
import { Link } from 'react-router-dom';
import NavItems from './NavItems';

const Navbar: React.FC = () => {
  return (
    <nav className="sticky top-0 z-50 text-foreground py-3 bg-card">
      <div className="container flex justify-between items-center">
        <div>
          <Link to={'/books'} className="text-xl">
            Book Store
          </Link>
        </div>
        <NavItems />
      </div>
    </nav>
  );
};

export default Navbar;
