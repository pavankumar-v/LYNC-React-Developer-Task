import React, { RefObject, createRef, useContext } from 'react';
import Button from '../ui/Button';
import { BookContext } from '@/contexts/BookContext';
import { BookContextType, OptionType } from '@/types';
import { debounce } from '@/utils/utils';
import Select from 'react-select';
import { SingleValue } from 'react-select';

const SearchFilter: React.FC = () => {
  const { searchBook, isLoading } = useContext(BookContext) as BookContextType;
  const searchInputRef: RefObject<HTMLInputElement> = createRef();

  const handleSearch = debounce((searchTerm: string) => {
    searchBook(searchTerm);
  }, 400);

  const categoriesOptions: OptionType[] = [
    { value: 'computers', label: 'computers' },
    { value: 'programming', label: 'programming' },
    { value: 'rust', label: 'rust' },
  ];

  console.log(isLoading);

  const handleOnCategoriesChange = (newValue: SingleValue<OptionType>) => {
    searchBook(searchInputRef.current?.value || '', {
      category: newValue?.value || '',
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
        styles={{
          control: (base) => ({
            ...base,
            background: '#09090B',
            borderRadius: '12px',
          }),
          menu: (base) => ({
            ...base,
            borderRadius: '12px',
          }),
          menuList: (base) => ({
            ...base,
            background: '#020817',
            borderRadius: '12px',
          }),
          option: (base, state) => ({
            ...base,
            background: state.isFocused ? '#3B82F6' : '#020817',
            borderRadius: '12px',
          }),
        }}
      />
      <Button size="lg">search</Button>
    </div>
  );
};

export default SearchFilter;
