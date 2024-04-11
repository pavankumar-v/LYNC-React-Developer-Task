import React, { RefObject, createRef, useContext } from 'react';
import { BookContext } from '@/contexts/BookContext';
import { BookContextType, OptionType } from '@/types';
import { debounce, dropDownStyle } from '@/utils/utils';
import Select from 'react-select';
import { SingleValue } from 'react-select';

const SearchFilter: React.FC = () => {
  const { searchBook } = useContext(BookContext) as BookContextType;
  const searchInputRef: RefObject<HTMLInputElement> = createRef();

  const handleSearch = debounce((searchTerm: string) => {
    searchBook(searchTerm);
  }, 400);

  const categoriesOptions: OptionType[] = [
    { value: 'computers', label: 'computers' },
    { value: 'programming', label: 'programming' },
    { value: 'rust', label: 'rust' },
  ];

  const languagesOption: OptionType[] = [
    { value: 'en', label: 'Engilish' },
    { value: 'fr', label: 'French' },
  ];

  const handleOnCategoriesChange = (newValue: SingleValue<OptionType>) => {
    searchBook(searchInputRef.current?.value || '', {
      category: newValue?.value || '',
    });
  };

  const handleOnLanguageChange = (newValue: SingleValue<OptionType>) => {
    searchBook(searchInputRef.current?.value || '', {
      language: newValue?.value || '',
    });
  };

  return (
    <div className="flex justify-center items-center gap-2">
      <input
        ref={searchInputRef}
        type="text"
        placeholder="search books"
        className="border-foreground/30"
        onChange={(e) => {
          handleSearch(e.target.value);
        }}
      />
      <Select
        options={categoriesOptions}
        onChange={handleOnCategoriesChange}
        isSearchable={false}
        isClearable
        className="w-3/4"
        styles={dropDownStyle}
      />

      <Select
        options={languagesOption}
        onChange={handleOnLanguageChange}
        isSearchable={false}
        isClearable
        className="w-3/4"
        styles={dropDownStyle}
      />
    </div>
  );
};

export default SearchFilter;
