import classNames from 'classnames';
import React from 'react';
import "./socials.scss"

// Images
import twitter from '../../images/twitter.png';
import discord from '../../images/discord.png';
import instagram from '../../images/instagram.png';

export default function({ className }){
    return (
        <div className={classNames("socials", { [className]: !!className })}>
            <a href="https://twitter.com/InternetMadeNFT" className="socials__link">
                <img src={twitter} alt="twitter" />
            </a>
            <a href="https://discord.gg/mUtyPpSHhh" className="socials__link">
                <img src={discord} alt="discord" />
            </a>
            <a href="https://www.instagram.com/internetmadenft/" className="socials__link">
                <img src={instagram} alt="instagram" />
            </a>
        </div>
    );
}