import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import "./range.scss"

export default function({ step, smooth, picture, min_value, max_value, state }){
    const [value, setValue]             = state;
    const [settings, setSettings]       = useState({ inited: false });
    const [sliderRef, setSliderRef]     = useState(null);
    const [thumbRef, setThumbRef]       = useState(null);
    const [active, setActive]           = useState(false);
    const [coords, setCoords]           = useState({});
    const [resize, setResize]           = useState(window.innerWidth);

    const onMouseDown = (event) => {
        setActive(true);
    };

    const onMouseUp = (event) => {
        setActive(false);
    };

    const getCoords = () => {
        const sliderCoords  = sliderRef.getBoundingClientRect();
        const thumbCoords   = thumbRef.getBoundingClientRect(); 
        const thumbCenter   = thumbCoords.width / 2;
        const MIN_X         = 0;
        const MAX_X         = sliderCoords.width - thumbCoords.width;
        const stepDivider   = (max_value - min_value) / step;
        const stepWidth     = MAX_X / stepDivider;
        const divider       = stepWidth / step;
        const strFixed      = String(step).split(".")[1]?.length || 0;

        return {
            sliderCoords,
            thumbCoords,
            thumbCenter,
            MIN_X,
            MAX_X,
            stepDivider,
            stepWidth,
            divider,
            strFixed
        };
    }

    const onMouseMove = (event) => {
        if(active === false || sliderRef === null || thumbRef === null){ return; };

        const coords        = getCoords();
        const currentX      = (event.clientX || event.changedTouches[0].clientX) - coords.sliderCoords.left;
        const left          = Math.max(coords.MIN_X, Math.min(coords.MAX_X, currentX - coords.thumbCenter));

        const positionLeft  = smooth === true 
            ? left
            : Math.min(coords.MAX_X, Math.round(left / coords.stepWidth) * coords.stepWidth);

        const value         = Math
            .min(max_value, min_value + Math.round(positionLeft / coords.divider / step) * step )
            .toFixed(coords.strFixed);

        setCoords({
            left: positionLeft + "px"
        });

        setValue(Number(value));
    };

    const resizeHandler = () => {
        setResize(window.innerWidth);
    };

    useEffect(() => {
        if(active === true || sliderRef === null || thumbRef === null){ return; };

        const coords    = getCoords();
        const left      = ((value - 1) / step) * coords.stepWidth + "px";

        setCoords({ left });
    }, [state, resize]);

    useEffect(() => {
        const supportTouchScreen = !!('ontouchstart' in window);

        if(supportTouchScreen){
            document.addEventListener("touchmove", onMouseMove);
            document.addEventListener("touchend", onMouseUp);
        } else {            
            document.addEventListener("mousemove", onMouseMove);
            document.addEventListener("mouseup", onMouseUp);
        }

        window.addEventListener("resize", resizeHandler);

        return () => {
            if(supportTouchScreen){
                document.removeEventListener("touchmove", onMouseMove);
                document.removeEventListener("touchend", onMouseUp);
            } else {
                document.removeEventListener("mousemove", onMouseMove);
                document.removeEventListener("mouseup", onMouseUp);
            }

            window.removeEventListener("resize", resizeHandler);
        };
    });

    return (
        <div className="range" ref={setSliderRef}>
            <div className="range__line"></div>
            <button 
                className="range__avatar"
                ref={setThumbRef} 
                onMouseDown={onMouseDown}
                onTouchStart={onMouseDown}
                onMouseUp={onMouseUp}
                onTouchEnd={onMouseUp}
                style={coords}
            >
                <img src={picture} alt="avatar" />
            </button>
        </div>
    );
}