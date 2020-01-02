import React from 'react';

import PostCard from '../postCard/PostCard';
import { samplePost } from '../../../utils/hardcodedData';
import { FloatAddButton } from '../../common/CommonComponents';
import CreatePostModal from '../createPost';
import { useToggle } from '../../common/customHooks';

const PostsScreen = React.memo(({ showFloatButton = true, channelsLink = true, authorsLink = true }) => {
    let [modalVisibility, toggleModalVisibility] = useToggle(false);

    const posts = React.useMemo(() => [samplePost, { ...samplePost, pk: 2 }], []);

    return (
        <>
            {posts.map((post, index, array) => (
                <PostCard
                    channelLink={channelsLink}
                    authorLink={authorsLink}
                    post={post}
                    key={post.pk}
                    {...(index === 0 ? { style: { paddingTop: 30 } } : {})}
                    {...(index < array.length - 1 ? { showBorder: true } : {})}
                />
            ))}

            {showFloatButton && <FloatAddButton onClick={toggleModalVisibility} />}
            <CreatePostModal modalVisibility={modalVisibility} toggleModalVisibility={toggleModalVisibility} />
        </>
    );
});
export default PostsScreen;
