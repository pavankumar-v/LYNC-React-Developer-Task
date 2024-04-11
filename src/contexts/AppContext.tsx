import React from 'react';
import AuthContextProvider from './AuthContext';
import BookContextProvider from './BookContext';

const AppContextProvider: React.FC<{
  children: JSX.Element | JSX.Element[];
}> = ({ children }) => {
  return (
    <AuthContextProvider>
      <BookContextProvider>{children}</BookContextProvider>
    </AuthContextProvider>
  );
};

export default AppContextProvider;
