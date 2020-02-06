import React from 'react';
import { connect } from 'react-redux';

import PostCard from '../postCard/PostCard';
import CommentsList from 'components/comment/CommentsList';
import { getPostById } from 'actions/PostActions';
import ScreenWithError from 'components/common/screenWithError';
import CreatePostModal from '../createPost';
import { useToggle } from 'components/common/customHooks';

const PostScreen = React.memo(({ match, getPost, setSnackMessage }) => {
    const postPk = React.useMemo(() => match.params.pk, [match]);

    let [editPostModal, toggleEditPostModal] = useToggle(false);

    let [post, setPost] = React.useState({});

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
                    canEdit={post.can_edit || true}
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

const mapDispatchToProps = {
    getPost: getPostById,
};
export default connect(undefined, mapDispatchToProps)(ScreenWithError(PostScreen));
