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
import ScreenWithError from 'components/common/screenWithError';

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
        let [userScore, setUserScore] = React.useState(post.like);
        let [openDialog, setDialogOpen] = React.useState(false);
        let [_post, _setPost] = React.useState(post);
        let [commentsCount, setCommentsCount] = React.useState(post.no_comments);

        let [score, setScore] = React.useState(_post.no_feedbacks.likes - _post.no_feedbacks.dislikes);

        // let score = React.useMemo(_score => +(prevScore ? changeScore : -prevScore), [_post, changeScore, prevScore]);

        React.useEffect(() => {}, []);

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
            deletePost(_post.id).then(() => {
                history.push(basePath);
            });
        };

        const addComment = comment => {
            _setPost({ ..._post, comments: [..._post.comments, comment] });
            setCommentsCount(commentsCount + 1);
        };

        return (
            <>
                <div className={[styles['card-container'], showBorder ? 'border-bottom' : ''].join(' ')} {...restProps}>
                    <div className={styles.header}>
                        <PostChannel channel={_post.channel} link={channelLink} />

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

                        <p>{_post.create_time}</p>
                    </div>

                    <Link to={postPath(_post.id)}>
                        <PostImage src={_post.image} />
                    </Link>

                    <CustomLinkify>
                        <p className={styles['caption-container']}>{_post.text}</p>
                    </CustomLinkify>

                    <div className={styles.footer}>
                        <PostAuthor author={_post.author} link={authorLink} />

                        <div style={{ display: 'flex', alignItems: 'center' }}>
                            <span style={{ marginRight: 6 }}>{commentsCount}</span>
                            <FaRegComment className={styles['reply-comment']} onClick={toggleReplyPostModalVisibility} />
                        </div>

                        <PostScore
                            score={score}
                            userScore={userScore}
                            setScore={like => scorePost(_post.id, like)}
                            changeScore={setScore}
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
                    post={_post}
                    setSnackMessage={setSnackMessage}
                    callback={addComment}
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
