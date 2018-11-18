import React from 'react';
import menu_icon from '../icons/menu_icon.png'

const Header = () => {
  return (
    <header className="app-header">
      <img src={menu_icon} alt="Search Places"/>
      <h1 className="app-header-content">Sights in London</h1>
    </header>
  );
}

export default Header;