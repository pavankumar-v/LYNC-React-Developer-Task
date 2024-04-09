import React from 'react';
import Button from '@ui/Button';
import { NavLink } from 'react-router-dom';
import useAuth from '@/hooks/useAuth';

const NavItems: React.FC = () => {
  const { loginWithRedirect, isAuthenticated } = useAuth();
  return (
    <ul className="flex justify-center items-center gap-2">
      <li className="text">
        <Button variant="default">
          <NavLink
            to={'/books'}
            className={({ isActive }): string => {
              return isActive ? 'text-primary' : '';
            }}
          >
            Books
          </NavLink>
        </Button>
      </li>
      <li>
        <Button variant="default">
          <NavLink
            to={'/bookmarks'}
            className={({ isActive }): string => {
              return isActive ? 'text-primary' : '';
            }}
          >
            Bookmarks
          </NavLink>
        </Button>
      </li>
      {!isAuthenticated && (
        <>
          <Button onClick={() => loginWithRedirect()}>Login</Button>
        </>
      )}
    </ul>
  );
};

export default NavItems;
