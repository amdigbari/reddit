import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FaRegComment } from 'react-icons/fa';
import { connect } from 'react-redux';
import { MdDelete, MdEdit } from 'react-icons/md';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import styles from './styles.module.scss';
import PostChannel from './PostChannel';
import PostAuthor from './PostAuthor';
import PostScore from './PostScore';
import { useToggle } from '../../common/customHooks';
import CommentModal from '../../comment/CommentModal';
import PostImage from './PostImage';
import { CustomLinkify, CustomButton } from '../../common/CommonComponents';
import { postPath, basePath } from '../../../utils/pathUtils';
import { scorePost, deletePost } from 'actions/PostActions';
import { SILVER_GRAY } from 'utils/staticUtils';

const PostCard = React.memo(
    ({
        post,
        showBorder = false,
        fullCaption = false,
        channelLink = true,
        authorLink = true,
        setSnackMessage,
        scorePost,
        canEdit,
        showEditModal,
        deletePost,
        ...restProps
    }) => {
        let [replyPostModalVisibility, toggleReplyPostModalVisibility] = useToggle(false);
        let [changeScore, setChangedScore] = React.useState(0);
        let [userScore, setUserScore] = React.useState(post.like);
        let [openDialog, setDialogOpen] = React.useState(false);

        let score = React.useMemo(() => post.no_feedbacks.likes - post.no_feedbacks.dislikes + changeScore, [post]);

        let history = useHistory();

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

        const handleCloseDialog = () => {
            setDialogOpen(false);
        };

        const removePost = () => {
            deletePost(post.id).then(() => {
                history.push(basePath);
            });
        };

        return (
            <>
                <div className={[styles['card-container'], showBorder ? 'border-bottom' : ''].join(' ')} {...restProps}>
                    <div className={styles.header}>
                        <PostChannel channel={post.channel} link={channelLink} />

                        {canEdit && (
                            <>
                                <MdDelete
                                    color={SILVER_GRAY}
                                    className="pointer"
                                    size={23}
                                    onClick={() => {
                                        setDialogOpen(true);
                                    }}
                                />
                                <MdEdit color={SILVER_GRAY} className="pointer" size={23} onClick={showEditModal} />
                            </>
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

                {canEdit && (
                    <Dialog open={openDialog} onClose={handleCloseDialog}>
                        <DialogTitle id="alert-dialog-title">Are you Sore??</DialogTitle>
                        <DialogContent>
                            <DialogContentText id="alert-dialog-description">Are you sure about delete this post??</DialogContentText>
                        </DialogContent>
                        <DialogActions>
                            <CustomButton style={{ height: 35 }} onClick={handleCloseDialog}>
                                Cancel
                            </CustomButton>
                            <CustomButton style={{ height: 35 }} onClick={removePost}>
                                Confirm
                            </CustomButton>
                        </DialogActions>
                    </Dialog>
                )}

                <CommentModal
                    modalVisibility={replyPostModalVisibility}
                    toggleVisibility={toggleReplyPostModalVisibility}
                    post={post}
                    setSnackMessage={setSnackMessage}
                />
            </>
        );
    },
);

const mapDispatchToProps = {
    scorePost,
    deletePost,
};
export default connect(undefined, mapDispatchToProps)(PostCard);
