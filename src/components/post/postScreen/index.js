import React from 'react';
import { connect } from 'react-redux';

import PostCard from '../postCard/PostCard';
import CommentsList from '../../comment/CommentsList';
import { getPostById } from '../../../actions/PostActions';
import ScreenWithError from 'components/common/screenWithError';

const PostScreen = React.memo(({ match, getPost, setErrorMessage }) => {
    //use post pk to get full post from server
    const postPk = React.useMemo(() => match.params.pk, [match]);

    let [post, setPost] = React.useState({});

    React.useEffect(() => {
        if (postPk) {
            getPost(postPk).then(response => {
                setPost(response[0]);
            });
        }
    }, [postPk, getPost]);

    return (
        post.id && (
            <>
                <PostCard post={post} fullCaption style={{ marginTop: 30 }} setErrorMessage={setErrorMessage} />
                <CommentsList comments={post.comments || []} allCommentsCount={post.comments.length} setErrorMessage={setErrorMessage} />
            </>
        )
    );
});

const mapDispatchToProps = {
    getPost: getPostById,
};
export default connect(undefined, mapDispatchToProps)(ScreenWithError(PostScreen));
