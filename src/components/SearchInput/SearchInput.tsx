import React, { ChangeEventHandler, FunctionComponent } from 'react';

const SearchInput: FunctionComponent<{ 
    handleSearch: ChangeEventHandler<HTMLInputElement> 
  }> = ({ handleSearch }) => {
  return (
    <div className="search">
      <input type="text" name="search" id="search" placeholder="Search for Country" onChange={handleSearch} />
    </div>
  )
}

export default SearchInput;