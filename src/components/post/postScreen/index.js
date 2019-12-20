import React from 'react';

import PostCard from '../postCard/PostCard';
import { samplePost } from '../../../utils/hardcodedData';
import CommentsList from '../../comment/CommentsList';

const PostScreen = React.memo(({ match }) => {
    //use post pk to get full post from server
    const postPk = React.useMemo(() => match.params.pk, [match]);

    return (
        <>
            <PostCard post={samplePost} fullCaption />
            <CommentsList comments={samplePost.comments || []} allCommentsCount={21} />
        </>
    );
});
export default PostScreen;
