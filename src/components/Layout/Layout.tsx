import React, { ChangeEventHandler, FunctionComponent, ReactNode } from 'react';
import './Layout.css';
import Header from '../Header/Header';
import SearchInput from '../SearchInput/SearchInput';
import FilterRegion from '../FilterRegion/FilterRegion';

const Layout: FunctionComponent<{ 
    children: ReactNode,
    handleFilterRegion: ChangeEventHandler<HTMLSelectElement>,
    handleSearch: ChangeEventHandler<HTMLInputElement>,
    selected: string
  }> = ({ children, handleSearch, handleFilterRegion, selected }) => {
  return (
    <div className='container'>
      <Header title='World App'/>
      <div className='filter-container'>
        <div className='search'>
          <SearchInput handleSearch={handleSearch} />
        </div>
        <div className='filter'>
          <FilterRegion handleFilterRegion={handleFilterRegion} selected={selected}/>
        </div>
      </div>
      <main className="main">{children}</main>
      <footer className="footer">World</footer>
    </div>
  )
}

export default Layout;