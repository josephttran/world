import React, { ChangeEventHandler, FunctionComponent } from 'react';

const SearchInput: FunctionComponent<{ 
    handleSearch: ChangeEventHandler<HTMLInputElement> 
  }> = ({ handleSearch }) => {
  return (
    <input 
      type="text" 
      name="search-input" 
      id="search-input" 
      className="search-input" 
      placeholder="Search for Country" 
      onChange={handleSearch} />
  )
}

export default SearchInput;