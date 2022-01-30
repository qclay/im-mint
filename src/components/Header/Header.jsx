import React from 'react';
import "./header.scss"

// Images
import logo from '../../images/logo.png';

function Header(){
    return (
        <header className="header">
            <a href="/" className="header__logo">
                <img src={logo} alt="logo" />
            </a>
        </header>
    );
}

export default Header;