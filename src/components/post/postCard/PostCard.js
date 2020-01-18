import React from 'react';
import { Link } from 'react-router-dom';
import { FaRegComment } from 'react-icons/fa';

import styles from './styles.module.scss';
import PostChannel from './PostChannel';
import PostAuthor from './PostAuthor';
import PostScore from './PostScore';
import { useToggle } from '../../common/customHooks';
import CommentModal from '../../comment/CommentModal';
import PostImage from './PostImage';
import { CustomLinkify } from '../../common/CommonComponents';
import { postPath } from '../../../utils/pathUtils';

const PostCard = React.memo(({ post, showBorder = false, fullCaption = false, channelLink = true, authorLink = true, ...restProps }) => {
    let [replyPostModalVisibility, toggleReplyPostModalVisibility] = useToggle(false);

    // const ReadMore = () => {
    //     return (
    //         <>
    //             <span>...</span>
    //             <Link to={`/posts/${post.pk}`}>
    //                 <span className={styles['show-more']}>[show more]</span>
    //             </Link>
    //         </>
    //     );
    // };

    return (
        <>
            <div className={[styles['card-container'], showBorder ? 'border-bottom' : ''].join(' ')} {...restProps}>
                <div className={styles.header}>
                    <PostChannel channel={post.channel} link={channelLink} />

                    <p>{post.date}</p>
                </div>

                {post.image && (
                    <Link to={postPath(post.pk)}>
                        <PostImage src={post.image} />
                    </Link>
                )}

                <CustomLinkify>
                    <p className={styles['caption-container']}>{post.caption}</p>
                </CustomLinkify>

                <div className={styles.footer}>
                    <PostAuthor author={post.author} link={authorLink} />

                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <span style={{ marginRight: 6 }}>21</span>
                        <FaRegComment className={styles['reply-comment']} onClick={toggleReplyPostModalVisibility} />
                    </div>

                    <PostScore
                        score={post.score}
                        userScore={post.userScore}
                        setScore={() => {
                            //TODO:
                        }}
                    />
                </div>
            </div>

            <CommentModal modalVisibility={replyPostModalVisibility} toggleVisibility={toggleReplyPostModalVisibility} />
        </>
    );
});
export default PostCard;
