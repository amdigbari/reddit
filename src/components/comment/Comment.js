import React from 'react';
import { Link } from 'react-router-dom';
import { FaRegComment } from 'react-icons/fa';

import styles from './styles.module.scss';
import Avatar from '../common/Avatar';
import { useToggle } from '../common/customHooks';
import CommentModal from './CommentModal';
import { CustomLinkify } from '../common/CommonComponents';

const Comment = ({ comment, isReply = false }) => {
    let [replyPostModalVisibility, toggleReplyPostModalVisibility] = useToggle(false);

    return (
        <>
            <div className={[styles['comment-container'], isReply ? styles.reply : ''].join(' ')}>
                <div className={styles['comment-header']}>
                    <Link to={`/profile/${comment.author.pk}`}>
                        <div className={styles['comment-author']}>
                            <Avatar src={comment.author.avatar} />
                            <p style={{ marginLeft: 10 }}>{comment.author.name}</p>
                        </div>
                    </Link>

                    <p>{comment.date}</p>
                </div>

                <CustomLinkify>
                    <p className={styles['comment-text']}>{comment.text}</p>
                </CustomLinkify>

                <FaRegComment className={styles['reply-comment']} onClick={toggleReplyPostModalVisibility} />

                {comment.replies && comment.replies.map(comment => <Comment comment={comment} isReply key={comment.pk} />)}
            </div>

            <CommentModal modalVisibility={replyPostModalVisibility} toggleVisibility={toggleReplyPostModalVisibility} />
        </>
    );
};

export default Comment;
