import React from 'react';
import classNames from 'classnames';
import "./plusbutton.scss" 

export default function(props){
    return (
        <React.Fragment>
            {props.href ? (
                <a {...props} className={classNames("plusbutton", { [props.className]: !!props.className })}>
                    <i></i><i></i><i></i><i></i>
                    {props.children}
                </a>
            ) : (
                <button {...props} className={classNames("plusbutton", { [props.className]: !!props.className })}>
                    <i></i><i></i><i></i><i></i>
                    {props.children}
                </button>
            )}
        </React.Fragment>
    );
}