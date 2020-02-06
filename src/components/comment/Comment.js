import React from 'react';
import { Link } from 'react-router-dom';
import { FaRegComment } from 'react-icons/fa';

import styles from './styles.module.scss';
import Avatar from '../common/Avatar';
import { useToggle } from '../common/customHooks';
import CommentModal from './CommentModal';
import { CustomLinkify } from '../common/CommonComponents';
import { userPath } from '../../utils/pathUtils';

const Comment = ({ comment, isReply = false }) => {
    let [replyPostModalVisibility, toggleReplyPostModalVisibility] = useToggle(false);

    let [_comment, _setComment] = React.useState(comment);

    const addComment = __comment => {
        _setComment({ ...comment, answers: { ...comment.answers, __comment } });
    };

    return (
        <>
            <div className={[styles['comment-container'], isReply ? styles.reply : ''].join(' ')}>
                <div className={styles['comment-header']}>
                    <Link to={userPath(_comment.author.id)}>
                        <div className={styles['comment-author']}>
                            <Avatar src={_comment.author.avatar} />
                            <p style={{ marginLeft: 10 }}>{_comment.author.name}</p>
                        </div>
                    </Link>

                    <p>{_comment.date}</p>
                </div>

                <CustomLinkify>
                    <p className={styles['comment-text']}>{_comment.text}</p>
                </CustomLinkify>

                {_comment.can_reply && <FaRegComment className={styles['reply-comment']} onClick={toggleReplyPostModalVisibility} />}

                {_comment.answers && _comment.answers.map(comment => <Comment comment={comment} isReply key={_comment.id} />)}
            </div>

            {_comment.can_reply && (
                <CommentModal
                    modalVisibility={replyPostModalVisibility}
                    toggleVisibility={toggleReplyPostModalVisibility}
                    callback={addComment}
                />
            )}
        </>
    );
};

export default Comment;
