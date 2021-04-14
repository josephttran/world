import React, { ChangeEventHandler, FunctionComponent, ReactNode } from 'react';
import './Layout.css';
import Header from '../Header/Header';
import SearchInput from '../SearchInput/SearchInput';

const Layout: FunctionComponent<{ 
    handleSearch: ChangeEventHandler<HTMLInputElement>, 
    children: ReactNode 
  }> = ({ handleSearch, children }) => {
  return (
    <div className='container'>
      <Header title='World App'/>
      <SearchInput handleSearch={handleSearch} />
      <main className="main">{children}</main>
      <footer className="footer">World</footer>
    </div>
  )
}

export default Layout;