import React, { useContext } from 'react';
import { Context } from '../../Context';
import classNames from 'classnames';
import Socials from '../Socials/Socials';
import MintButton from '../MintButton/MintButton';
import "./menu.scss"

export default function(){
    const [ctx, setCtx] = useContext(Context);

    const closeMenu = () => {
        setCtx({...ctx, openMenu: false});
    };

    return (
        <div className={classNames("menu", {opened: ctx.openMenu})}>
            <div className="menu__wrapper">
                <header className="menu__header">
                    <MintButton className="hero__mint menu__mint" />
                    <button className="menu__cross" onClick={closeMenu}></button>
                </header>
                <div className="menu__body">
                    <span className="menu-title">Menu</span>
                    <nav className="menu__nav">
                        <a onClick={closeMenu} href="/#xoxo">Vision</a>
                        <a onClick={closeMenu} href="/#collection">Initial Collection</a>
                        <a onClick={closeMenu} href="/#lookbook">Lookbook</a>
                        <a onClick={closeMenu} href="/#team">Team</a>
                        <a onClick={closeMenu} href="/#roadmap">Roadmap</a>
                        <a onClick={closeMenu} href="/#faq">F.A.Q.</a>
                        <a onClick={closeMenu} href="/#howitstarted">How it started</a>
                    </nav>
                </div>
                <footer className="menu__footer">
                    <span className="menu-title">Get in touch</span>
                    <Socials className="menu__socials" />
                </footer>
            </div>
        </div>
    );
}