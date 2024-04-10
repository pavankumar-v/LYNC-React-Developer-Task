import React, { useContext } from 'react';
import Button from '@ui/Button';
import { NavLink } from 'react-router-dom';
import { AuthContext } from '@/contexts/AuthContext';
import LogOutButton from '../auth/LogOutButton';

const NavItems: React.FC = () => {
  const { loginWithRedirect, isAuthenticated } = useContext(AuthContext);

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
      {isAuthenticated ? (
        <>
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
