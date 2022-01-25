import React from 'react';
import { hideWallet } from '../../javascript/utils';
import { useEtherBalance, useEthers } from '@usedapp/core';
import { useTokenBalance } from '../../hooks';
import { formatEther } from 'ethers/lib/utils';
import "./mintwallet.scss";

// Images
import metamaskIcon from '../../images/metamask-logo.svg';
import classNames from 'classnames';

export default function(){
    const {account, activateBrowserWallet, deactivate} = useEthers();
    const etherBalance  = useEtherBalance(account);
    const countOfNft    = useTokenBalance(account);

    const connectHandler = () => {
        activateBrowserWallet();
    };

    const disconnectHandler = () => {
        deactivate();
    };

    return (
        <div className="mintwallet">
            <div className={classNames("mintwallet__wrapper", {"disconnect": !account})}>
                {account ? (<>
                    <div className="mintwallet__balance">
                        <span>
                            {etherBalance && parseFloat(formatEther(etherBalance)).toFixed(3)} ETH | {countOfNft ? countOfNft.toNumber() : 0} IM
                        </span>
                    </div>
                    <div className="mintwallet__wallet" onClick={disconnectHandler}>
                        <span>{hideWallet(account)}</span>
                    </div>
                </>) : (<>
                    <button className="mintwallet__connect" onClick={connectHandler}>
                        <img src={metamaskIcon} alt="metamask-logo" />
                        <span>Connect to MetaMask</span>
                    </button>
                </>)}
            </div>
        </div>
    );
}