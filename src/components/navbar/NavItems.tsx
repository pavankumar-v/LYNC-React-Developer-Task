import React, { useContext } from 'react';
import Button from '@ui/Button';
import { AuthContext } from '@/contexts/AuthContext';
import LogOutButton from '../auth/LogOutButton';
import NavItem from './NavItem';

const NavItems: React.FC = () => {
  const { loginWithRedirect, isAuthenticated } = useContext(AuthContext);

  return (
    <ul className="flex justify-center items-center gap-2">
      <NavItem to={'/books'}>Books</NavItem>

      {isAuthenticated ? (
        <>
          <NavItem to={'/bookmarks'}>Bookmarks</NavItem>
          <NavItem to={'/cart'}>cart</NavItem>
          <NavItem to={'/orders'}>orders</NavItem>
          <LogOutButton />
        </>
      ) : (
        <>
          <Button onClick={() => loginWithRedirect()}>Login</Button>
        </>
      )}
    </ul>
  );
};

export default NavItems;
