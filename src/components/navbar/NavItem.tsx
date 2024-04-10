import React from 'react';
import { NavLink } from 'react-router-dom';
import Button from '@ui/Button';

type Props = {
  to: string;
  children: JSX.Element | JSX.Element[] | string;
};

const NavItem: React.FC<Props> = ({ to, children }) => {
  return (
    <li>
      <Button variant="default">
        <NavLink
          to={to}
          className={({ isActive }): string => {
            return isActive ? 'text-primary' : '';
          }}
        >
          {children}
        </NavLink>
      </Button>
    </li>
  );
};

export default NavItem;
