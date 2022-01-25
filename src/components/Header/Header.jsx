import React, {useContext} from 'react';
import MintButton from '../MintButton/MintButton';
import "./header.scss"
import { Context } from '../../Context';

export default function(){
    const [ctx, setCtx] = useContext(Context);

    return (
        <header className="header">
            <button className="header__burgermenu" onClick={setCtx.bind(null, {...ctx, openMenu: true})}>
                <span></span><span></span><span></span>
            </button>
            <MintButton className="hero__mint hero__mint_mobile" />
        </header>
    );
}