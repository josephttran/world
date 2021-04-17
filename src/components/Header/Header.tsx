import React, { FunctionComponent, useState } from 'react';
import { useHistory } from 'react-router';
import './Header.css';

interface props {
  title: string;
}

const Header: FunctionComponent<props> = ({ title }) => {
  const history = useHistory();
  const [themeSwitcherText, setThemeSwitcherText] = useState('Dark Mode');
  const [theme, setTheme] = useState('light');
  
  const switchTheme = () => {
    if (theme === 'light') {
      document.documentElement.setAttribute('data-theme', 'dark');
      setTheme('dark');
      setThemeSwitcherText('Light Mode');
    } else {
      document.documentElement.setAttribute('data-theme', 'light');
      setTheme('light');
      setThemeSwitcherText('Dark Mode');
    }
  }

  const GoToCountriesPage = () => {
    history.push('/world');
  }

  return (
    <header className="header">
      <h1 className="header__title" onClick={GoToCountriesPage}>{ title }</h1>
      <button className="themeSwitcher" onClick={switchTheme}>{themeSwitcherText}</button>
    </header>
  )
}

export default Header;

