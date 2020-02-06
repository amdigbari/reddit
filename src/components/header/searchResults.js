import React from 'react';
import CustomNavbar from 'components/common/customNavbar/CustomNavbar';
import ChannelCard from 'components/channel/channelCard';
import ProfileCard from 'components/profile/profileCard';
import PostCard from 'components/post/postCard/PostCard';
import styles from './styles.module.scss';

const searchNavBars = [
    { id: 1, title: 'Channels' },
    { id: 2, title: 'Users' },
    { id: 3, title: 'Posts' },
];

const RenderSearchResults = React.memo(({ searchResults, setSnackMessage, loading }) => {
    let [activeId, setActiveId] = React.useState(searchNavBars[0].id);

    let activeTitle = React.useMemo(() => searchNavBars.find(navigator => navigator.id === activeId).title, [activeId]);

    const showEmpty = () => (
        <div className="render-center">
            <h3 className="danger">Nothing To Show</h3>
        </div>
    );

    const renderComponent = React.useCallback(() => {
        switch (activeTitle) {
            case 'Channels':
                return searchResults.channels && searchResults.channels.length
                    ? searchResults.channels.map((channel, index, array) => (
                          <ChannelCard
                              channel={channel}
                              key={channel.id}
                              showBorder={index < array.length - 1}
                              setSnackMessage={setSnackMessage}
                          />
                      ))
                    : showEmpty();
            case 'Users':
                return searchResults.users && searchResults.users.length
                    ? searchResults.users.map((user, index, array) => (
                          <ProfileCard user={user} key={user.id} showBorder={index < array.length - 1} />
                      ))
                    : showEmpty();
            default:
                return searchResults.posts && searchResults.posts.length
                    ? searchResults.posts.map((post, index, array) => (
                          <PostCard
                              post={post}
                              key={post.id}
                              showBorder={index < array.length - 1}
                              hideChannel
                              setSnackMessage={setSnackMessage}
                          />
                      ))
                    : showEmpty();
        }
    }, [activeTitle, searchResults]);

    return (
        <CustomNavbar
            containerStyle={styles['result-container']}
            navigators={searchNavBars}
            renderComponent={renderComponent}
            setActiveId={setActiveId}
            activeId={activeId}
            loading={loading}
        />
    );
});

export default RenderSearchResults;
