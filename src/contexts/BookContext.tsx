import React, { createContext } from 'react';

export const BookContext = createContext<null>(null);

const BookContextProvider: React.FC<{
  children: JSX.Element | JSX.Element[];
}> = ({ children }) => {
  return <BookContext.Provider value={null}>{children}</BookContext.Provider>;
};

export default BookContextProvider;
