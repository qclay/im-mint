import React, { useEffect, useState, useContext } from 'react';
import classNames from 'classnames';
import { Context } from '../../Context';
import { useEthers, useTransactions, useEtherBalance } from '@usedapp/core';
import { useTokenBalance } from '../../hooks';
import { formatEther } from 'ethers/lib/utils';
import "./modalaccount.scss";

// Images
import rhombus from '../../images/rhombus.png';
import corner from '../../images/corner.png';
import closeIcon from '../../images/close-icon.png';
import borderImage from '../../images/border.png';
import linkIcon from '../../images/link-icon.png';
import tickIcon from '../../images/tick-icon.png';

export default function({ isActive, delay }){
    const [ctx, setCtx]                     = useContext(Context);
    const [visibleModal, setVisibleModal]   = useState(isActive);
    const [openClass, setOpenClass]         = useState(isActive);
    const {account, deactivate}             = useEthers();
    const etherBalance                      = useEtherBalance(account);
    const countOfNft                        = useTokenBalance(account);
    const {transactions}                    = useTransactions();

    console.log(transactions)

    const closeModal = () => {
        setCtx({
            ...ctx, 
            showAccountInfoModal: false
        });
    };

    const clickOutTheWindow = (event) => {
        if(event.currentTarget === event.target){
            closeModal();
        }
    };

    const disconnectButtonHandler = () => {
        deactivate();
        closeModal();
    }

    useEffect(() => {
        if(!visibleModal && isActive){
            setVisibleModal(true);

            setTimeout(() => {
                setOpenClass(true);
            }, 10)
        } else if(visibleModal && !isActive){
            setOpenClass(false);

            setTimeout(() => {
                setVisibleModal(false);
            }, delay);
        }
    }, [isActive]);

    return visibleModal ? (
        <div 
            className={classNames('modalaccount', {visible: openClass})}
            onClick={clickOutTheWindow}
        >
            <div className="modalaccount__container">
                {Array.from({length: 4}).map((_, id) => (
                    <img src={rhombus} alt="rhombus" className={`modalaccount__rhombus modalaccount__rhombus_${id+1}`} />
                ))}
                <div className="modalaccount__wrapper">
                    {Array.from({length: 4}).map((_, id) => (
                        <img src={corner} alt="corner" className={`modalaccount__corner modalaccount__corner_${id+1}`} />
                    ))}
                    <div className="modalaccount__content">
                        <div className="modalaccount__main">
                            <div className="modalaccount__header">
                                <h2>Account</h2>
                                <button onClick={closeModal}>
                                    <img src={closeIcon} alt="cross" />
                                </button>
                            </div>
                            <div className="modalaccount__body">
                                <img 
                                    src={borderImage} 
                                    alt="border" 
                                    className="modalaccount__borderimg" 
                                />
                                <div className="modalaccount__connection">
                                    <span>Connected with Metamask</span>
                                    <button onClick={disconnectButtonHandler}>Disconnect</button>
                                </div>
                                <a 
                                    className="modalaccount__wallet"
                                    href={`https://etherscan.io/address/${account}`} 
                                    target="_blank" 
                                >
                                    <span>{account}</span>
                                    <img src={linkIcon} alt="link-icon" />
                                </a>
                                <ul className="modalaccount__info">
                                    {etherBalance && <li>{parseFloat(formatEther(etherBalance)).toFixed(3)} ETH (Ethereum)</li>}
                                    <li>{countOfNft ? countOfNft.toNumber() : 0} IM (Internet Made NFT)</li>
                                </ul>
                            </div>
                        </div>
                        <div className="modalaccount-transactions">
                            <h2 className="modalaccount-transactions__title">Transactions History</h2>
                            <div className="modalaccount-transactions__list"> 
                                {transactions.length > 0 ? (
                                    <React.Fragment>
                                        {transactions.map(tns => (
                                            <div className="modalaccount-transactions__item">
                                                <div className="mt-icon">
                                                    <img src={tickIcon} alt="tick-cross" />
                                                </div>
                                                <a 
                                                    className="mt-link"
                                                    href={`https://rinkeby.etherscan.io/tx/${tns.receipt.transactionHash}`} 
                                                    // in production delete "rinkeby" from href-attribute
                                                    target="_blank"
                                                >
                                                    <span>View on Etherscan</span>
                                                    <img src={linkIcon} alt="link-icon" />
                                                </a>
                                                <span className="mt-date">

                                                </span>
                                            </div>
                                        ))}
                                    </React.Fragment>
                                ) : (
                                    <p className="modalaccount-transactions__no-transactions">
                                        No transactions yet.
                                    </p>
                                )}
                            </div>  
                        </div>
                    </div>
                </div>
            </div>
        </div>
    ) : null;
}