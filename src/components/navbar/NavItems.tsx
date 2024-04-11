import React, { useContext } from 'react';
import Button from '@ui/Button';
import { AuthContext } from '@/contexts/AuthContext';
import { AuthContextType } from '@/types';
import LogOutButton from '../auth/LogOutButton';
import NavItem from './NavItem';

const NavItems: React.FC = () => {
  const { loginWithRedirect, isAuthenticated } = useContext(
    AuthContext
  ) as AuthContextType;

  return (
    <ul className="flex justify-center items-center gap-2">
      <NavItem to={'/books'}>Books</NavItem>

      {isAuthenticated ? (
        <>
          <NavItem to={'/bookmarks'}>Bookmarks</NavItem>
          <NavItem to={'/cart'}>Cart</NavItem>
          <NavItem to={'/orders'}>Orders</NavItem>
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
