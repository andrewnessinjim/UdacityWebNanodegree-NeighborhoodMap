import React from 'react';
import menu_icon from '../icons/menu_icon.png'
import back_icon from '../icons/back_icon.png'

const Header = (props) => {
  return (
    <header className="app-header">
      <img
        src={props.listVisible? back_icon : menu_icon}
        alt="Search Places"
        className="ham_menu"
        onClick={props.onHamClick} />
      <h1 className="app-header-content">Sights in London</h1>
    </header>
  );
}

export default Header;