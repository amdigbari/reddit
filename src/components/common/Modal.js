import React from 'react';
import MaterialModal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';

import styles from './styles.module.scss';
import './material_styles.scss';
import { ANIMATION_DURATION } from '../../utils/staticUtils';

const Modal = React.memo(({ modalVisibility, children, className = '', toggleVisibility, ...restProps }) => {
    return (
        <MaterialModal
            open={modalVisibility}
            onClose={toggleVisibility}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
                timeout: ANIMATION_DURATION,
            }}
            className={styles['modal-background']}>
            <Fade in={modalVisibility} style={{ border: 'none !important', outline: 'none !important' }}>
                <div className={className}>{children}</div>
            </Fade>
        </MaterialModal>
    );
});
export default Modal;
