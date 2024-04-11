import React, { useContext } from 'react';
import Button from '../ui/Button';
import { BookContext, BookContextType } from '@/contexts/BookContext';

const SearchFilter: React.FC = () => {
  const { searchBook } = useContext(BookContext) as BookContextType;

  function handleSearch(e: React.FormEvent<HTMLInputElement>) {
    searchBook(e.currentTarget.value);
  }

  return (
    <div className="flex justify-center items-center gap-2">
      <input
        type="text"
        placeholder="search books"
        className="border-foreground/30"
        onChange={handleSearch}
      />
      <Button size="lg">search</Button>
    </div>
  );
};

export default SearchFilter;
