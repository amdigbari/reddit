import React from 'react';

import styles from '../postScreen/styles.module.scss';
import PostCard from '../postCard/PostCard';
import { samplePost } from '../../../utils/hardcodedData';
import CustomScreen from '../../common/customScreen/CustomScreen';

const PostsScreen = React.memo(() => {
    const posts = React.useMemo(() => [samplePost, samplePost], []);

    return (
        <CustomScreen className={styles.container}>
            {posts.map((post, index, array) => (
                <PostCard post={post} {...(index < array.length - 1 ? { showBorder: true } : {})} />
            ))}
        </CustomScreen>
    );
});
export default PostsScreen;
