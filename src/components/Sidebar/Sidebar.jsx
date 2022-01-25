import React from 'react';
import "./sidebar.scss";

// Images
import logo from '../../images/logo.png';

export default function({ className }){
    return (
        <div className={className}>
            <div className="sidebar__wrapper">
                <div className="sidebar">
                    <img src={logo} alt="logo" className="sidebar__logo" />
                    <nav className="sidebar__nav">
                        <a className="sidebar__link" href="/#faq">Faq</a>
                        <a className="sidebar__link" href="/#team">Team</a>
                        <a className="sidebar__link" href="/#lookbook">Lookbook</a>
                        <a className="sidebar__link" href="/#roadmap">Roadmap</a>
                        <a className="sidebar__link" href="/#collection">Initial Collection</a>
                        <a className="sidebar__link" href="/#xoxo">Vision</a>
                    </nav>
                </div>    
                <div className="extra-sidebar">
                    <a href="#howitstarted">How It Started</a>
                </div>
            </div>        
        </div>
    );
}