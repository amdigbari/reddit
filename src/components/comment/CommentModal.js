import React from 'react';
import Textarea from 'react-textarea-autosize';

import image from '../../assets/images/test_profile.jpg';
import styles from './styles.module.scss';
import Modal from '../common/Modal';
import Avatar from '../common/Avatar';
import { ButtonLoading } from '../common/CommonComponents';
import { DARK_PRIMARY_COLOR } from '../../utils/staticUtils';
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
                <p>افزودن کامنت</p>
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
                    <Textarea
                        minRows={1}
                        maxRows={6}
                        maxLength="500"
                        placeholder="بنویسید..."
                        name="comment"
                        className={styles['comment-input']}
                    />

                    <Avatar src={image} />
                </div>

                <div className={styles['submit-comment-container']}>
                    <button
                        className={styles['submit-comment']}
                        style={{ opacity: buttonLoadingVisibility ? 0.6 : 1 }}
                        type="submit"
                        onClick={toggleButtonLoadingVisibility}>
                        ارسال
                    </button>

                    <ButtonLoading color={DARK_PRIMARY_COLOR} visible={buttonLoadingVisibility} />
                </div>
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
