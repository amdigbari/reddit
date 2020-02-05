import React from 'react';
import { Link } from 'react-router-dom';
import { FaRegComment } from 'react-icons/fa';
import { connect } from 'react-redux';
import { MdDelete } from 'react-icons/md';

import styles from './styles.module.scss';
import PostChannel from './PostChannel';
import PostAuthor from './PostAuthor';
import PostScore from './PostScore';
import { useToggle } from '../../common/customHooks';
import CommentModal from '../../comment/CommentModal';
import PostImage from './PostImage';
import { CustomLinkify } from '../../common/CommonComponents';
import { postPath } from '../../../utils/pathUtils';
import { scorePost } from 'actions/PostActions';
import { SILVER_GRAY } from 'utils/staticUtils';

const PostCard = React.memo(
    ({
        post,
        showBorder = false,
        fullCaption = false,
        channelLink = true,
        authorLink = true,
        setMessage,
        scorePost,
        showDelete,
        ...restProps
    }) => {
        let [replyPostModalVisibility, toggleReplyPostModalVisibility] = useToggle(false);
        let [changeScore, setChangedScore] = React.useState(0);
        let [userScore, setUserScore] = React.useState(post.like);

        let score = React.useMemo(() => post.no_feedbacks.likes - post.no_feedbacks.dislikes + changeScore, [post]);

        // const ReadMore = () => {
        //     return (
        //         <>
        //             <span>...</span>
        //             <Link to={`/posts/${post.id}`}>
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

                        {showDelete && (
                            <MdDelete
                                color={SILVER_GRAY}
                                className="pointer"
                                size={23}
                                onClick={() => {
                                    /* TODO:  delete post */
                                }}
                            />
                        )}

                        <p>{post.create_time}</p>
                    </div>

                    <Link to={postPath(post.id)}>
                        <PostImage src={post.image} />
                    </Link>

                    <CustomLinkify>
                        <p className={styles['caption-container']}>{post.text}</p>
                    </CustomLinkify>

                    <div className={styles.footer}>
                        <PostAuthor author={post.author} link={authorLink} />

                        <div style={{ display: 'flex', alignItems: 'center' }}>
                            <span style={{ marginRight: 6 }}>{post.comments.length}</span>
                            <FaRegComment className={styles['reply-comment']} onClick={toggleReplyPostModalVisibility} />
                        </div>

                        <PostScore
                            score={score}
                            userScore={userScore}
                            setScore={like => scorePost(post.id, like)}
                            setChangedScore={setChangedScore}
                            setUserScore={setUserScore}
                        />
                    </div>
                </div>

                <CommentModal
                    modalVisibility={replyPostModalVisibility}
                    toggleVisibility={toggleReplyPostModalVisibility}
                    post={post}
                    setMessage={setMessage}
                />
            </>
        );
    },
);

const mapDispatchToProps = {
    scorePost,
};
export default connect(undefined, mapDispatchToProps)(PostCard);
