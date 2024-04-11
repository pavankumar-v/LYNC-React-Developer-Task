import React from 'react';
import { NavLink } from 'react-router-dom';
import { twMerge } from 'tailwind-merge';
import { btnVariant, defaultStyle } from '../ui/Button';

type Props = {
  to: string;
  children: JSX.Element | JSX.Element[] | string;
};

const NavItem: React.FC<Props> = ({ to, children }) => {
  return (
    <li>
      <NavLink
        to={to}
        className={({ isActive }): string => {
          return twMerge(
            defaultStyle,
            btnVariant.default,
            isActive ? 'text-primary' : ''
          );
        }}
      >
        {children}
      </NavLink>
    </li>
  );
};

export default NavItem;
