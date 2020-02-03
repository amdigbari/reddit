import React from 'react';
import TextField from '@material-ui/core/TextField';

import image from '../../assets/images/default_profile.png';
import styles from './styles.module.scss';
import Modal from '../common/Modal';
import Avatar from '../common/Avatar';
import { CustomButtonWithLoading } from '../common/CommonComponents';
import { useToggle } from '../common/customHooks';

const CommentModal = ({ modalVisibility, toggleVisibility: toggleModalVisibility }) => {
    let [buttonLoadingVisibility, toggleButtonLoadingVisibility] = useToggle(false);

    React.useEffect(() => {
        if (buttonLoadingVisibility) {
            setTimeout(() => {
                toggleButtonLoadingVisibility();
            }, 2000);
        }
    }, [buttonLoadingVisibility, toggleButtonLoadingVisibility]);

    const RenderHeader = () => {
        return (
            <div className={styles['modal-header']}>
                <span className={styles['close-modal']} onClick={toggleModalVisibility}>
                    &times;
                </span>
                <p>Add Comment</p>
                <span className={styles['close-modal']} style={{ visibility: 'hidden' }}>
                    &times;
                </span>
            </div>
        );
    };

    const RenderForm = () => {
        return (
            <form action="/" method="POST" onSubmit={event => event.preventDefault()} className={styles['comment-form']}>
                <div className={styles['comment-input-container']}>
                    <Avatar src={image} />

                    <TextField className={styles['comment-input']} label="comment" multiline rowsMax={10} color="secondary" />
                </div>

                <CustomButtonWithLoading
                    className={styles['submit-comment-container']}
                    type="submit"
                    clickHandler={toggleButtonLoadingVisibility}
                    loading={buttonLoadingVisibility}>
                    ارسال
                </CustomButtonWithLoading>
            </form>
        );
    };

    return (
        <Modal modalVisibility={modalVisibility} toggleVisibility={toggleModalVisibility}>
            <div className={styles['comment-modal-container']}>
                <RenderHeader />
                <RenderForm />
            </div>
        </Modal>
    );
};
export default CommentModal;
