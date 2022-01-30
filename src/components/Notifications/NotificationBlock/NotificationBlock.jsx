import React from 'react';
import { useEthers } from '@usedapp/core';
import { hideWallet } from '../../../javascript/utils';
import "./notificationblock.scss";

// Images
import linkIcon from '../../../images/link-icon-white.png';

export default function({ icon, title, transaction, id, costs }){
    const {account} = useEthers();

    return (
        <div className="notificationblock">
            <div className="notificationblock__img">
                <img src={icon} alt="clock" />
            </div>
            <div className="notificationblock__detail">
                <h4 className="notificationblock__title">{title}</h4>
                <a 
                    href={transaction} 
                    target="_blank" 
                    className="notificationblock__link"
                >
                    <span>View on Etherscan</span>
                    <img src={linkIcon} alt="link-icon" />
                </a>
                <div className="notificationblock__info">
                    <span className='ntb-wallet'>{hideWallet(account, {left: 6, right: 4})}</span>
                    {id && <span className='ntb-id'>#{id}</span>}
                    {costs && <span className='ntb-eth'>(-0.15 ETH )</span>}
                </div>
            </div>
        </div>
    );
}