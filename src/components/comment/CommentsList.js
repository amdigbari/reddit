import React from 'react';

import styles from './styles.module.scss';
import Comment from './Comment';

const CommentsList = React.memo(({ comments, allCommentsCount, className = '', ...restProps }) => {
    const RenderComments = React.useCallback(() => {
        return (
            <>
                {comments.map(comment => (
                    <Comment comment={comment} key={comment.id} />
                ))}
            </>
        );
    }, [comments]);

    return (
        <div className={[styles['comment-list-container'], className].join(' ')} {...restProps}>
            {allCommentsCount ? <p>{allCommentsCount} comments</p> : null}

            <div className={styles['comment-list-wrapper']}>
                <RenderComments />
            </div>
        </div>
    );
});
export default CommentsList;
