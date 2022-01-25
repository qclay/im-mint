import React, { useState, useEffect } from 'react';
import {getData} from "../../javascript/utils";
import PlusButton from '../PlusButton/PlusButton';
import classNames from 'classnames';
import Range from '../Range/Range';
import "./mintworkspace.scss";

// Others
import { useEthers } from "@usedapp/core";
import { useContractMethod } from "../../hooks";
import { utils } from "ethers";
import { presaleFFTokenPrice, presaleTokenPrice, tokenPrice } from "../../contracts/config"
import { useOnlyWhitelistedFF, useOnlyWhitelisted, useOnlyPublicSale } from "../../hooks";
import MerkleTree from "merkletreejs";
import keccak256 from "keccak256";
import { whitelistHashedAddresses } from "../../contracts/config";


// Images
import workspaceBackground from '../../images/workspace-background.png';
import workspaceBackgroundMobile from '../../images/workspace-background@mobile.png';

export default function(){
    const [value, setValue] = useState(1);
    const [config, setConfig] = useState({
        min_value: 0,
        max_value: 0,
        init_value: 0,
        publicSale: 0,
        whitelist: 0,
        step: 0,
        picture: null,
        smooth: false
    });

    // Others    
    const { account, chainId, deactivate } = useEthers();
    const { state: mintStateWhitelistedFF, send: mintWhitelistedFF } = useContractMethod("mintWhitelistedFF");
    const { state: mintStateWhitelisted, send: mintWhitelisted } = useContractMethod("mintWhitelisted");
    const { state: mintStatePublicSale, send: mintPublicSale } = useContractMethod("mintPublicSale");

    const onlyWhitelistedFF = useOnlyWhitelistedFF(account);
    const onlyWhitelisted = useOnlyWhitelisted(account);
    const onlyPublicSale = useOnlyPublicSale(account);

    async function handleSetCountMintButtonClick() {
        const _count = parseInt(value);    

        setTimeout(() => {   
            console.log("_count: ", _count);
            console.log("mintStateWhitelistedFF: ", mintStateWhitelistedFF)
            console.log("mintStateWhitelisted: ", mintStateWhitelisted)
            console.log("mintStatePublicSale: ", mintStatePublicSale)
            console.log("onlyWhitelistedFF: ", onlyWhitelistedFF)
            console.log("onlyWhitelisted: ", onlyWhitelisted)
            console.log("onlyPublicSale: ", onlyPublicSale)
        }, 1000)
    
        if (onlyWhitelistedFF) {
          //merkle
          const leafNodes = whitelistHashedAddresses.map((leafJson) => Buffer.from(leafJson, "hex"));
          const merkleTree = new MerkleTree(leafNodes, keccak256, { sortPairs: true });
          const addr = account
          const hexProof = merkleTree.getHexProof(keccak256(addr));
    
          if (_count) {
            mintWhitelistedFF(_count, hexProof, {
              value: utils.parseEther((presaleFFTokenPrice * value).toString()),
            }); //calling the mint here! arguments and a config object at end for value wow read comments here https://dev.to/jacobedawson/send-react-web3-dapp-transactions-via-metamask-2b8n
          }
        }
    
        if (onlyWhitelisted) {
          //merkle
          const leafNodes = whitelistHashedAddresses.map((leafJson) => Buffer.from(leafJson, "hex"));
          const merkleTree = new MerkleTree(leafNodes, keccak256, { sortPairs: true });
          const addr = account
          const hexProof = merkleTree.getHexProof(keccak256(addr));
    
          if (_count) {
            mintWhitelisted(_count, hexProof, {
              value: utils.parseEther((presaleTokenPrice * value).toString()),
            }); //calling the mint here! arguments and a config object at end for value wow read comments here https://dev.to/jacobedawson/send-react-web3-dapp-transactions-via-metamask-2b8n
          }
        }
    
        if (onlyPublicSale) {
          if (_count) {
            mintPublicSale(_count, {
              value: utils.parseEther((tokenPrice * value).toString()),
            }); //calling the mint here! arguments and a config object at end for value wow read comments here https://dev.to/jacobedawson/send-react-web3-dapp-transactions-via-metamask-2b8n
          }
        }
    }

    // End others 

    const strFixed = String(config.step).split(".")[1]?.length || 0;

    const addClickHandler = () => {
        setValue(Number(Math.min(config.max_value, value + config.step).toFixed(strFixed)));
    };

    const minusClickHandler = () => {
        setValue(Number(Math.max(config.min_value, value - config.step).toFixed(strFixed)));
    };

    useEffect(() => {
        
    }, [config]);

    useEffect(async () => {
        const data = await getData("./config.json");
        const max_value = onlyWhitelisted ? data.whitelist : data.publicSale;

        setConfig({
            ...data,
            max_value
        });
    }, []);

    return (
        <div className="mintworkspace">
            <div className="mintworkspace__wrapper">
                <picture>
                    <source srcSet={workspaceBackgroundMobile} media="(max-width: 465px)" type="image/png" />
                    <img src={workspaceBackground} alt="background" className="mintworkspace__background" />
                </picture>
                <div className="mintworkspace__content">
                    <div className="mintworkspace__header">
                        <div className="mintworkspace__display">
                            <i></i><i></i><i></i><i></i>
                            <span>{value}</span>
                        </div>
                        <div className="mintworkspace__controls">
                            <button 
                                className={classNames("mintworkspace__controls-btn plus", { disabled: config.max_value === value})} 
                                onClick={addClickHandler}
                            ></button>
                            <button 
                                className={classNames("mintworkspace__controls-btn minus", { disabled: config.min_value === value})} 
                                onClick={minusClickHandler}
                            ></button>
                        </div>
                    </div>
                    <PlusButton 
                        className={classNames("mintworkspace__btn", {disabled: !account})}
                        onClick={handleSetCountMintButtonClick}
                    >
                        <span>Mint <strong>{value}</strong> intenet made nft!</span>
                    </PlusButton>
                    {account ? (
                        <p className="mintworkspace__connect">Connected to Ethereum Mainnet.</p>
                    ) : (
                        <p className="mintworkspace__connect warning">You are NOT connected to Ethereum Mainnet.</p>
                    )}
                </div>
            </div>
        </div>
    );
}