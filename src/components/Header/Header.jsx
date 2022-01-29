import React, {useContext} from 'react';
import "./header.scss"
import { Context } from '../../Context';

// Images
import logo from '../../images/logo.png';

export default function(){
    const [ctx, setCtx] = useContext(Context);

    return (
        <header className="header">
            <a href="/" className="header__logo">
                <img src={logo} alt="logo" />
            </a>
        </header>
    );
}