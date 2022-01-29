import React, { useState, useEffect } from 'react';
import {getData} from "../../javascript/utils";
import PlusButton from '../PlusButton/PlusButton';
import classNames from 'classnames';
import "./mintworkspace.scss";

import { useEthers } from "@usedapp/core";
import { useContractMethod } from "../../hooks";
import { utils } from "ethers";
import { useOnlyWhitelistedFF, useOnlyWhitelisted, useOnlyPublicSale } from "../../hooks";
import MerkleTree from "merkletreejs";
import keccak256 from "keccak256";

// Images
import workspaceBackground from '../../images/workspace-background.png';
import workspaceBackgroundMobile from '../../images/workspace-background@mobile.png';

export default function(){
    const [value, setValue] = useState(1);
    const [config, setConfig] = useState({
        publicSale: 0,
        whitelist: 0,
        whitelistFF: 0,
        rinkebyAddress: "",
        maxSupply: 0,
        whitelistHashedAddresses: [],
        tokenPrice: 0.00,
        presaleTokenPrice: 0.00,
        presaleFFTokenPrice: 0.00,
        max_value: 0
    });

    const { account, chainId } = useEthers();
    const { state: mintStateWhitelistedFF, send: mintWhitelistedFF } = useContractMethod("mintWhitelistedFF");
    const { state: mintStateWhitelisted, send: mintWhitelisted } = useContractMethod("mintWhitelisted");
    const { state: mintStatePublicSale, send: mintPublicSale } = useContractMethod("mintPublicSale");

    const onlyWhitelistedFF = useOnlyWhitelistedFF(account);
    const onlyWhitelisted = useOnlyWhitelisted(account);
    const onlyPublicSale = useOnlyPublicSale(account);

    async function handleSetCountMintButtonClick() {
        const _count = parseInt(value);    

        console.log("_count: ", _count);
        console.log("mintStateWhitelistedFF: ", mintStateWhitelistedFF)
        console.log("mintStateWhitelisted: ", mintStateWhitelisted)
        console.log("mintStatePublicSale: ", mintStatePublicSale)
        console.log("onlyWhitelistedFF: ", onlyWhitelistedFF)
        console.log("onlyWhitelisted: ", onlyWhitelisted)
        console.log("onlyPublicSale: ", onlyPublicSale)

        if (onlyWhitelistedFF) {
          //merkle
          const leafNodes = config.whitelistHashedAddresses.map((leafJson) => Buffer.from(leafJson, "hex"));
          const merkleTree = new MerkleTree(leafNodes, keccak256, { sortPairs: true });
          const addr = account
          const hexProof = merkleTree.getHexProof(keccak256(addr));
    
          if (_count) {
            mintWhitelistedFF(_count, hexProof, {
              value: utils.parseEther((config.presaleFFTokenPrice * value).toString()),
            }); //calling the mint here! arguments and a config object at end for value wow read comments here https://dev.to/jacobedawson/send-react-web3-dapp-transactions-via-metamask-2b8n
          }
        }
    
        if (onlyWhitelisted) {
          //merkle
          const leafNodes = config.whitelistHashedAddresses.map((leafJson) => Buffer.from(leafJson, "hex"));
          const merkleTree = new MerkleTree(leafNodes, keccak256, { sortPairs: true });
          const addr = account
          const hexProof = merkleTree.getHexProof(keccak256(addr));
    
          if (_count) {
            mintWhitelisted(_count, hexProof, {
              value: utils.parseEther((config.presaleTokenPrice * value).toString()),
            }); //calling the mint here! arguments and a config object at end for value wow read comments here https://dev.to/jacobedawson/send-react-web3-dapp-transactions-via-metamask-2b8n
          }
        }
    
        if (onlyPublicSale) {
          if (_count) {
            mintPublicSale(_count, {
              value: utils.parseEther((config.tokenPrice * value).toString()),
            }); //calling the mint here! arguments and a config object at end for value wow read comments here https://dev.to/jacobedawson/send-react-web3-dapp-transactions-via-metamask-2b8n
          }
        }
    }

    const addClickHandler = () => {
        setValue(
            Math.min(value + 1, config.max_value)
        );
    };

    const minusClickHandler = () => {
        setValue(
            Math.max(1, value - 1)
        );
    };

    useEffect(async () => {
        const data = await getData("./config.json");
        const max_value = onlyPublicSale 
            ? data.publicSale 
            : (onlyWhitelisted ? data.whitelistFF : data.whitelist);

        console.log(max_value)

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
                                className={classNames("mintworkspace__controls-btn minus", { disabled: value === 1})} 
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