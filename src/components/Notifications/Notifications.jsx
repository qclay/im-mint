import React, { useState, useEffect } from 'react';
import { useOnlyWhitelistedFF, useOnlyWhitelisted, useOnlyPublicSale } from "../../hooks";
import { useContext } from 'react';
import { Context } from '../../Context';
import { useEthers, useNotifications, getStoredTransactionState, useTransactions } from '@usedapp/core';
import { getData } from '../../javascript/utils';
import NotificationBlock from './NotificationBlock/NotificationBlock';
import "./notifications.scss"

// Images
import clockIcon from '../../images/clock-icon.png';
import successIcon from '../../images/success-icon.png';
import failIcon from '../../images/fail-icon.png';

export default function(){
    const [ctx, setCtx] = useContext(Context);
    const [config, setConfig] = useState([]);
    const [typeTransaction, setTypeTransaction] = useState(null);
    const {account} = useEthers();
    const {transactions} = useTransactions();

    transactions.map(tns => {
        console.log(getStoredTransactionState(tns))
    });

    const onlyWhitelistedFF = useOnlyWhitelistedFF(account);
    const onlyWhitelisted = useOnlyWhitelisted(account);
    const onlyPublicSale = useOnlyPublicSale(account);

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
            {ctx[typeTransaction].status === "Mining" && (
                <NotificationBlock 
                    title="Transaction Started"
                    transaction={`https://rinkeby.etherscan.io/tx/${ctx[typeTransaction].transaction.hash}`}
                    id={null}
                    costs="0.15"
                    icon={clockIcon}
                />
            )}
            {ctx[typeTransaction].status === "Success" && (
                <NotificationBlock 
                    title="Transaction Succeeded"
                    transaction={`https://rinkeby.etherscan.io/tx/${ctx[typeTransaction].receipt.transactionHash}`}
                    id={ctx[typeTransaction].receipt.transactionIndex}
                    costs="0.15"
                    icon={successIcon}
                />
            )}
            {ctx[typeTransaction].status === "Exception" && (
                <NotificationBlock 
                    title="Transaction Failed"
                    transaction={`https://rinkeby.etherscan.io/address/${account}`}
                    icon={failIcon}
                />
            )}
        </div>
    ) : null;
}