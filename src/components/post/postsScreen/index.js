import React from 'react';

import PostCard from '../postCard/PostCard';
import { samplePost } from '../../../utils/hardcodedData';
import { FloatAddButton } from '../../common/CommonComponents';

const PostsScreen = React.memo(({ showFloatButton = true }) => {
    const posts = React.useMemo(() => [samplePost, { ...samplePost, pk: 2 }], []);

    return (
        <>
            {posts.map((post, index, array) => (
                <PostCard
                    post={post}
                    key={post.pk}
                    {...(index === 0 ? { style: { paddingTop: 30 } } : {})}
                    {...(index < array.length - 1 ? { showBorder: true } : {})}
                />
            ))}

            {showFloatButton && <FloatAddButton onClick={() => console.log('Add Post')} />}
            {/* TODO: */}
        </>
    );
});
export default PostsScreen;
