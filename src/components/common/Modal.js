import React from 'react';
import { Animated } from 'react-animated-css';

import styles from './styles.module.scss';
import { ANIMATION_DURATION } from '../../utils/staticUtils';

const Modal = React.memo(({ modalVisibility, children, className = '', toggleVisibility, containerClassName = '', ...restProps }) => {
    return (
        <Animated
            isVisible={modalVisibility}
            animationIn="slideInUp"
            animationOut="slideOutDown"
            animationInDuration={ANIMATION_DURATION}
            animationOutDuration={ANIMATION_DURATION}
            className={[styles['modal-background'], className].join(' ')}>
            <div className={styles['modal-container']} onClick={toggleVisibility} {...restProps}>
                <div onClick={event => event.stopPropagation()} className={containerClassName}>
                    {children}
                </div>
            </div>
        </Animated>
    );
});
export default Modal;
