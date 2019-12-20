import React from 'react';

import PostCard from '../postCard/PostCard';
import { samplePost } from '../../../utils/hardcodedData';

const PostsScreen = React.memo(() => {
    const posts = React.useMemo(() => [samplePost, { ...samplePost, pk: 2 }], []);

    return (
        <>
            {posts.map((post, index, array) => (
                <PostCard post={post} key={post.pk} {...(index < array.length - 1 ? { showBorder: true } : {})} />
            ))}
        </>
    );
});
export default PostsScreen;
