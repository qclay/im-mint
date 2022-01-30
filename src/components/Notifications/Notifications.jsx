import React, { useState, useEffect } from 'react';
import { useOnlyWhitelistedFF, useOnlyWhitelisted, useOnlyPublicSale } from "../../hooks";
import { useEthers, useNotifications } from '@usedapp/core';
import { getData } from '../../javascript/utils';
import NotificationBlock from './NotificationBlock/NotificationBlock';
import "./notifications.scss"

// Images
import clockIcon from '../../images/clock-icon.png';
import successIcon from '../../images/success-icon.png';
import failIcon from '../../images/fail-icon.png';
import connectedIcon from '../../images/connected-icon.png';

function Notifications(){
    const [config, setConfig] = useState([]);
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
    }, [config, onlyWhitelistedFF, onlyWhitelisted, onlyPublicSale]);

    useEffect(() => {
        getData('./config.json', setConfig);
    }, []);
    
    return (
        <div className="notification">
            {notifications
                .reduce((nArr, el, id) => {
                    return !nArr.find(i => i.type === el.type) 
                        ? [...nArr, el]
                        : nArr;
                }, [])
                .map((nf, id) => (<React.Fragment key={id}>

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
                {nf.type === "transactionFailed" && (
                    <NotificationBlock 
                        title="Transaction Fail"
                        transaction={`https://rinkeby.etherscan.io/tx/${nf.receipt.transactionHash}`}
                        id={nf.receipt.transactionIndex}
                        costs={costs}
                        icon={failIcon}
                    />
                )}

            </React.Fragment>))}
        </div>
    );
}

export default Notifications;