import React, { useContext } from 'react';
import classNames from 'classnames';
import { hideWallet } from '../../javascript/utils';
import { useEtherBalance, useEthers } from '@usedapp/core';
import { useTokenBalance } from '../../hooks';
import { formatEther } from 'ethers/lib/utils';
import { Context } from '../../Context';
import "./mintwallet.scss";

// Images
import metamaskIcon from '../../images/metamask-logo.svg';

function MintWallet(){
    const [ctx, setCtx] = useContext(Context);
    const {account, activateBrowserWallet} = useEthers();
    const etherBalance  = useEtherBalance(account);
    const countOfNft    = useTokenBalance(account);

    const connectHandler = () => {
        activateBrowserWallet();
    };

    const walletClickHandler = () => {
        setCtx({
            ...ctx,
            showAccountInfoModal: true
        });
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
                    <button className="mintwallet__wallet" onClick={walletClickHandler}>
                        <span>{hideWallet(account)}</span>
                    </button>
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

export default MintWallet;