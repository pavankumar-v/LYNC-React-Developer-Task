import React, { RefObject, createRef } from 'react';
import { debounce } from '@/utils/utils';

type Props = {
  searchCallback: (searchTerm: string) => void;
};
const StaticSearchFilter: React.FC<Props> = ({ searchCallback }) => {
  const searchInputRef: RefObject<HTMLInputElement> = createRef();

  const handleSearch = debounce((searchTerm: string) => {
    searchCallback(searchTerm);
  }, 400);

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
    </div>
  );
};

export default StaticSearchFilter;
