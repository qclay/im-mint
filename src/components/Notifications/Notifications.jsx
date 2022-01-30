import React, { useState, useEffect } from 'react';
import { useOnlyWhitelistedFF, useOnlyWhitelisted, useOnlyPublicSale } from "../../hooks";
import { useContext } from 'react';
import { Context } from '../../Context';
import { useEthers, useNotifications } from '@usedapp/core';
import { getData } from '../../javascript/utils';
import NotificationBlock from './NotificationBlock/NotificationBlock';
import "./notifications.scss"

// Images
import clockIcon from '../../images/clock-icon.png';
import successIcon from '../../images/success-icon.png';
import failIcon from '../../images/fail-icon.png';
import connectedIcon from '../../images/connected-icon.png';

export default function(){
    const [ctx, setCtx] = useContext(Context);
    const [config, setConfig] = useState([]);
    const [typeTransaction, setTypeTransaction] = useState(null);
    const [costs, setCosts] = useState(0);
    const {account} = useEthers();
    const {notifications} = useNotifications();

    const onlyWhitelistedFF = useOnlyWhitelistedFF(account);
    const onlyWhitelisted = useOnlyWhitelisted(account);
    const onlyPublicSale = useOnlyPublicSale(account);

    useEffect(() => {
        if(onlyWhitelistedFF){
            setCosts(config.presaleFFTokenPrice);
        } else if(onlyWhitelisted){
            setCosts(config.presaleTokenPrice);
        } else {
            setCosts(config.tokenPrice);
        }
    }, [typeTransaction, config]);

    useEffect(() => {
        setTypeTransaction(
            onlyWhitelistedFF 
                ? "whitelistedFF"
                : (onlyWhitelisted ? "whitelisted" : "publicSale")
        );
    }, [onlyWhitelistedFF, onlyWhitelisted, onlyPublicSale]);

    useEffect(getData.bind(null, './config.json', setConfig), []);
    
    return typeTransaction ? (
        <div className="notification">
            {notifications.map(nf => (<>

                {nf.type === 'walletConnected' && (
                    <NotificationBlock
                        icon={connectedIcon}
                        className="nf__connect"
                    >
                        <h3 className="nf__title">Success</h3>
                        <p className="nf__p">Wallet connected</p>
                    </NotificationBlock>
                )}
                {nf.type === "transactionStarted" && (
                    <NotificationBlock 
                        title="Transaction Started"
                        transaction={`https://rinkeby.etherscan.io/tx/${nf.transaction.hash}`}
                        id={null}
                        costs={costs}
                        icon={clockIcon}
                    />
                )}
                {nf.type === "transactionSucceed" && (
                    <NotificationBlock 
                        title="Transaction Succeeded"
                        transaction={`https://rinkeby.etherscan.io/tx/${nf.receipt.transactionHash}`}
                        id={nf.receipt.transactionIndex}
                        costs={costs}
                        icon={successIcon}
                    />
                )}

            </>))}
        </div>
    ) : null;
}