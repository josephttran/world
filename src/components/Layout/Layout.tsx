import React, { FunctionComponent, ReactNode } from 'react';
import './Layout.css';
import Header from '../Header/Header';

const Layout: FunctionComponent<{children: ReactNode }> = ({ children }) => {
  return (
    <div className='container'>
      <Header title='World App'/>
      <main className="main">{children}</main>
      <footer className="footer">World</footer>
    </div>
  )
}

export default Layout;