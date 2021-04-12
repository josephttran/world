import React, { FunctionComponent } from 'react';
import './Header.css';

interface props {
  title: string;
}

const Header: FunctionComponent<props> = ({ title }) => {
  return (
    <header className="header">
      <h1 className="header__title">{ title }</h1>
      <button className="themeSwitcher">Dark Mode</button>
    </header>
  )
}

export default Header;

