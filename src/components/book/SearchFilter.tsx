import React, { useContext } from 'react';
import Button from '../ui/Button';
import { BookContext, BookContextType } from '@/contexts/BookContext';
import { debounce } from '@/utils/utils';

const SearchFilter: React.FC = () => {
  const { searchBook } = useContext(BookContext) as BookContextType;

  const handleSearch = debounce((searchTerm: string) => {
    searchBook(searchTerm);
  }, 400);

  return (
    <div className="flex justify-center items-center gap-2">
      <input
        type="text"
        placeholder="search books"
        className="border-foreground/30"
        onChange={(e) => {
          handleSearch(e.target.value);
        }}
      />
      <Button size="lg">search</Button>
    </div>
  );
};

export default SearchFilter;
