import React from 'react';
import { connect } from 'react-redux';

import PostCard from '../postCard/PostCard';
import CommentsList from 'components/comment/CommentsList';
import { getPostById } from 'actions/PostActions';
import ScreenWithError from 'components/common/screenWithError';
import CreatePostModal from '../createPost';
import { useToggle } from 'components/common/customHooks';

const PostScreen = React.memo(({ match, getPost, setSnackMessage, loginUser }) => {
    const postPk = React.useMemo(() => match.params.pk, [match]);

    let [editPostModal, toggleEditPostModal] = useToggle(false);

    let [post, setPost] = React.useState({});

    let hasEditPermission = React.useMemo(
        () => loginUser && post.id && (loginUser.id === post.author.id || loginUser.id === post.channel.admin.id),
        [post, loginUser],
    );

    React.useEffect(() => {
        if (postPk) {
            getPost(postPk).then(response => {
                setPost(response[0]);
            });
        }
    }, [postPk, getPost]);

    const editCallback = response => {
        setPost({ ...post, ...response });
        toggleEditPostModal();
    };

    return (
        post.id && (
            <>
                <PostCard
                    post={post}
                    fullCaption
                    style={{ marginTop: 30 }}
                    setSnackMessage={setSnackMessage}
                    canEdit={hasEditPermission}
                    showEditModal={toggleEditPostModal}
                />
                <CommentsList comments={post.comments || []} allCommentsCount={post.comments.length} setSnackMessage={setSnackMessage} />

                <CreatePostModal
                    modalVisibility={editPostModal}
                    toggleModalVisibility={toggleEditPostModal}
                    callback={editCallback}
                    edit
                    post={post}
                />
            </>
        )
    );
});

const mapStateToProps = state => {
    return { loginUser: state.loginUser };
};
const mapDispatchToProps = {
    getPost: getPostById,
};
export default connect(mapStateToProps, mapDispatchToProps)(ScreenWithError(PostScreen));
