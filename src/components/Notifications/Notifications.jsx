import React, { useState, useEffect } from 'react';
import { useOnlyWhitelistedFF, useOnlyWhitelisted, useOnlyPublicSale } from "../../hooks";
import { useContext } from 'react';
import { Context } from '../../Context';
import { useEthers } from '@usedapp/core';
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
    const [costs, setCosts] = useState(0);
    const {account} = useEthers();

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
            {ctx[typeTransaction].status === "Mining" && (
                <NotificationBlock 
                    title="Transaction Started"
                    transaction={`https://rinkeby.etherscan.io/tx/${ctx[typeTransaction].transaction.hash}`}
                    id={null}
                    costs={}
                    icon={clockIcon}
                />
            )}
            {ctx[typeTransaction].status === "Success" && (
                <NotificationBlock 
                    title="Transaction Succeeded"
                    transaction={`https://rinkeby.etherscan.io/tx/${ctx[typeTransaction].receipt.transactionHash}`}
                    id={ctx[typeTransaction].receipt.transactionIndex}
                    costs={}
                    icon={successIcon}
                />
            )}
            {ctx[typeTransaction].status === "Exception" && ctx[typeTransaction].transaction && (
                <NotificationBlock 
                    title="Transaction Failed"
                    id={null}
                    costs={costs}
                    transaction={ctx[typeTransaction].transaction.hash}
                    icon={failIcon}
                />
            )}
        </div>
    ) : null;
}