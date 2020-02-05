import React from 'react';
import { connect } from 'react-redux';

import PostCard from '../postCard/PostCard';
import { FloatAddButton } from '../../common/CommonComponents';
import CreatePostModal from '../createPost';
import { useToggle } from '../../common/customHooks';
import { getUserPosts } from '../../../actions/PostActions';
import ScreenWithError from 'components/common/screenWithError';

const PostsScreen = React.memo(
    ({ showFloatButton = true, channelsLink = true, authorsLink = true, getPosts, posts: propsPosts, setMessage }) => {
        let [modalVisibility, toggleModalVisibility] = useToggle(false);

        let [posts, setPosts] = React.useState(propsPosts || []);

        React.useEffect(() => {
            !posts.length && setPosts(getPosts());
        }, []);

        return (
            <>
                {posts.map((post, index, array) => (
                    <PostCard
                        setMessage={setMessage}
                        channelLink={channelsLink}
                        authorLink={authorsLink}
                        post={post}
                        key={post.id}
                        {...(index === 0 ? { style: { paddingTop: 30 } } : {})}
                        {...(index < array.length - 1 ? { showBorder: true } : {})}
                    />
                ))}

                {showFloatButton && (
                    <>
                        <FloatAddButton onClick={toggleModalVisibility} />
                        <CreatePostModal modalVisibility={modalVisibility} toggleModalVisibility={toggleModalVisibility} />
                    </>
                )}
            </>
        );
    },
);

const mapDispatchToProps = {
    getPosts: getUserPosts,
};
export default connect(undefined, mapDispatchToProps)(ScreenWithError(PostsScreen));
