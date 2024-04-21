import React, { useContext } from 'react';
import Button from '@ui/Button';
import { AuthContext } from '@/contexts/AuthContext';
import { AuthContextType } from '@/types';
import LogOutButton from '../auth/LogOutButton';
import NavItem from './NavItem';
import Spinner from '../ui/Spinner';

const NavItems: React.FC = () => {
  return (
    <ul className="flex justify-center items-center gap-2">
      <NavItem to={'/books'}>Books</NavItem>
      <NavItem to={'/bookmarks'}>Bookmarks</NavItem>
      <NavItem to={'/cart'}>Cart</NavItem>
      <NavItem to={'/orders'}>Orders</NavItem>
      <AuthActions />
    </ul>
  );
};

const AuthActions: React.FC = () => {
  const { loginWithRedirect, isAuthenticated, isLoadingUser } = useContext(
    AuthContext
  ) as AuthContextType;

  if (isLoadingUser) {
    return <Spinner />;
  }

  if (isAuthenticated) {
    return <LogOutButton />;
  }

  return <Button onClick={() => loginWithRedirect()}>Login</Button>;
};

export default NavItems;
