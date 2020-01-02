import React from 'react';
import { Link } from 'react-router-dom';
import { FiPlus } from 'react-icons/fi';

import styles from './styles.module.scss';
import logo from '../../assets/images/reddit_logo.png';
import { useToggle } from './customHooks';
import { PRIMARY_COLOR, DARK_PRIMARY_COLOR, LIGHT_COLOR } from '../../utils/staticUtils';

export const RedditLogo = () => {
    return (
        <Link to="/" id={styles['reddit-logo']}>
            <img alt="Reddit" src={logo} className={styles['reddit-avatar']} />
        </Link>
    );
};

export const Loading = ({ size = 45 }) => {
    const inlineStyles = { width: size, height: size };

    return (
        <div className={styles['loading-spinner-wrapper']} style={inlineStyles}>
            <div className={styles['loading-spinner']}></div>
            <div className={styles['loading-spinner']}></div>
            <div className={styles['loading-spinner']}></div>
            <div className={styles['loading-spinner']}></div>
        </div>
    );
};

export const ButtonLoading = ({ color, visible }) => {
    return (
        <div className={styles['button-loading']} style={{ display: visible ? 'block' : 'none' }}>
            <div
                className={styles['loading-gradient']}
                style={{ backgroundImage: `linear-gradient(to right, transparent, ${color}, transparent)` }}></div>
        </div>
    );
};

export const CustomButton = ({
    color = PRIMARY_COLOR,
    hoverColor = DARK_PRIMARY_COLOR,
    className = '',
    style = {},
    children,
    ...restProps
}) => {
    let [isHover, setIsIsHover] = React.useState(false);

    return (
        <button
            className={[styles['custom-button'], className].join(' ')}
            style={{ backgroundColor: isHover ? hoverColor : color, ...style }}
            {...restProps}
            onMouseEnter={() => setIsIsHover(true)}
            onMouseLeave={() => setIsIsHover(false)}>
            {children}
        </button>
    );
};

export const CustomButtonWithLoading = ({
    loading,
    children,
    color = PRIMARY_COLOR,
    hoverColor = DARK_PRIMARY_COLOR,
    loadingColor = DARK_PRIMARY_COLOR,
    className = '',
    style = {},
    clickHandler,
    ...restProps
}) => {
    return (
        <div className={className} style={{ position: 'relative', ...style }}>
            <CustomButton
                style={{ opacity: loading ? 0.6 : 1 }}
                color={color}
                hoverColor={hoverColor}
                onClick={clickHandler}
                {...restProps}>
                {children}
            </CustomButton>

            <ButtonLoading color={loadingColor} visible={loading} />
        </div>
    );
};

export const FloatAddButton = ({ onClick, className, ...restProps }) => {
    return (
        <div className={[styles['float-add-button'], className].join(' ')} {...restProps} onClick={onClick}>
            <FiPlus color={LIGHT_COLOR} size={35} />
        </div>
    );
};
