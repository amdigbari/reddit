import React from 'react';
import TextField from '@material-ui/core/TextField';
import { connect } from 'react-redux';

import image from '../../assets/images/default_profile.png';
import styles from './styles.module.scss';
import Modal from '../common/Modal';
import Avatar from '../common/Avatar';
import { CustomButtonWithLoading } from '../common/CommonComponents';
import { useToggle } from '../common/customHooks';
import { addComment } from 'actions/commentActions';

const RenderForm = ({ text, submitForm, setText, buttonLoadingVisibility, buttonClick, error }) => {
    return (
        <form action="/" method="POST" onSubmit={submitForm} className={styles['comment-form']}>
            <div className={styles['comment-input-container']}>
                <Avatar src={image} />

                <TextField
                    className={[styles['comment-input'], 'animation-error'].join(' ')}
                    label="comment"
                    multiline
                    rowsMax={10}
                    color="secondary"
                    value={text}
                    onChange={({ target: { value } }) => setText(value)}
                    error={!!error}
                    helperText="text can't be empty!"
                />
            </div>

            <CustomButtonWithLoading
                className={styles['submit-comment-container']}
                type="submit"
                clickHandler={buttonClick}
                loading={buttonLoadingVisibility}>
                ارسال
            </CustomButtonWithLoading>
        </form>
    );
};

const CommentModal = ({
    modalVisibility,
    toggleVisibility: toggleModalVisibility,
    comment,
    post,
    addComment,
    callback,
    setSnackMessage,
}) => {
    let [buttonLoadingVisibility, toggleButtonLoadingVisibility] = useToggle(false);

    let [text, setText] = React.useState('');
    let [error, setError] = React.useState(null);

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

    const submitForm = event => {
        event.preventDefault();

        if (text.trim().length) {
            const _comment = { id: post ? post.id : comment.id, text: text.trim() };

            toggleButtonLoadingVisibility();

            addComment(!!post, _comment)
                .then(response => {
                    toggleModalVisibility();
                    callback && callback({ ..._comment, ...response });
                })
                .catch(e => setSnackMessage({ text: "can't connect to server", type: 'error' }))
                .finally(() => toggleButtonLoadingVisibility());
        }
    };

    const buttonClick = event => {
        if (text.trim().length) {
            setError(null);
        } else {
            event.preventDefault();
            setError("caption can't be empty");
        }
    };

    return (
        <Modal modalVisibility={modalVisibility} toggleVisibility={toggleModalVisibility}>
            <div className={styles['comment-modal-container']}>
                <RenderHeader />
                <RenderForm
                    buttonClick={buttonClick}
                    error={error}
                    buttonLoadingVisibility={buttonLoadingVisibility}
                    text={text}
                    setText={setText}
                    submitForm={submitForm}
                />
            </div>
        </Modal>
    );
};

const mapDispatchToProps = {
    addComment,
};
export default connect(undefined, mapDispatchToProps)(CommentModal);
