import React from 'react';
import PlusButton from '../PlusButton/PlusButton';
import "./mintbtn.scss"

export default function({ className }){
    return (
        <PlusButton 
            className={className}
            onClick={console.log.bind(null)}
        >
            <span className='hide'>Mint</span>
            <span className='show'>Soon</span>     
        </PlusButton>
    );
}