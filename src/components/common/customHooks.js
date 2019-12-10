import React, { useState, useCallback, useRef, useEffect } from 'react';

export const useToggle = initialState => {
    const [state, setState] = useState(initialState);
    const toggleState = useCallback(() => setState(s => !s), []);
    return [state, toggleState];
};

export const useStateObject = initialObj => {
    const [obj, setObj] = useState(initialObj);
    const setField = useCallback(name => value => setObj(prevObj => ({ ...prevObj, [name]: value })), []);
    const reset = useCallback(() => setObj(initialObj), []);
    return [obj, setField, reset];
};

export const useDepsChanged = (func, deps) => {
    let isFirstRender = React.useRef(true);
    useEffect(() => {
        if (!isFirstRender.current) {
            func();
        } else {
            isFirstRender.current = false;
        }
    }, deps);
};

export const useTimer = initialTime => {
    let [time, setTime] = useState(initialTime);
    let interval = useRef(null);
    let resetTimer = () => {
        clearInterval(interval.current);
    };
    let startTimer = () => {
        setTime(initialTime);
        const TIME = (initialTime + 1) * 1000;
        let countDownDate = new Date().getTime() + TIME;
        interval.current = setInterval(() => {
            let now = new Date().getTime();
            let distance = countDownDate - now;
            let seconds = Math.floor(distance / 1000);
            setTime(seconds);
            if (distance <= 0) {
                resetTimer();
            }
        }, 1000);
    };

    return [time, startTimer, resetTimer];
};
