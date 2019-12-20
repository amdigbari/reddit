import React from 'react';

import styles from './styles.module.scss';
import Modal from '../common/Modal';

const CommentModal = ({ modalVisibility, toggleVisibility }) => {
    return (
        <Modal modalVisibility={modalVisibility} toggleVisibility={toggleVisibility}>
            <div style={{ width: 300, height: 300, backgroundColor: 'red' }}></div>
        </Modal>
    );
};
export default CommentModal;
