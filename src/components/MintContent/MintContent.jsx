import React from 'react';
import Marquee from 'react-fast-marquee';
import MintWorkspace from '../MintWorkspace/MintWorkspace';
import MintWallet from '../MintWallet/MintWallet';
import Notifications from '../Notifications/Notifications';
import "./mintcontent.scss";

// Images
import internetMade from '../../images/internet-made.png';
import zebra from '../../images/zebra.png';

function MintContent(){
    const settings = {
        speed: window.innerWidth > 768 ? 150 : 70,
        gradient: false,
    };

    return (
        <div className="mintcontent">
            <div className="mintcontent__interned-made">
                <picture>
                    <img src={internetMade} alt="im" />
                </picture>
            </div>
            <div className="mintcontent__runline">
                <Marquee {...settings}>
                    {Array.from({length: 2}).map((item, id) => (
                        <React.Fragment key={id}>         
                            <div className="mintcontent__runline-item">
                                <img src={zebra} alt="zebra" />
                            </div>                       
                            <div className="mintcontent__runline-item">
                                <h2>playing with reality</h2>
                            </div>
                            <div className="mintcontent__runline-item">
                                <p>fashion NFT fashion NFT fashion NFT</p>
                            </div>
                        </React.Fragment>
                    ))}
                </Marquee>
            </div>
            <MintWallet />
            <MintWorkspace />
            <Notifications />
        </div>
    );
}

export default MintContent;