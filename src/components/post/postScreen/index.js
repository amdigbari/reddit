import React from 'react';
import { connect } from 'react-redux';

import PostCard from '../postCard/PostCard';
import CommentsList from '../../comment/CommentsList';
import { getPostById } from '../../../actions/PostActions';

const PostScreen = React.memo(({ match, getPost }) => {
    //use post pk to get full post from server
    const postPk = React.useMemo(() => match.params.pk, [match]);

    let [post, setPost] = React.useState({});

    React.useEffect(() => {
        if (postPk) {
            getPost(postPk).then(setPost);
        }
    }, [postPk, getPost]);

    return (
        post.id && (
            <>
                <PostCard post={post} fullCaption style={{ marginTop: 30 }} />
                <CommentsList comments={post.comments || []} allCommentsCount={21} />
            </>
        )
    );
});

const mapDispatchToProps = {
    getPost: getPostById,
};
export default connect(undefined, mapDispatchToProps)(PostScreen);
