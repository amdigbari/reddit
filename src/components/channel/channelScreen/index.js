import React from 'react';
import { connect } from 'react-redux';

import ChannelCard from '../channelCard';
import styles from './styles.module.scss';
import PostsScreen from '../../post/postsScreen';
import { getChannelById } from '../../../actions/ChannelActions';
import { useToggle } from 'components/common/customHooks';
import CreateChannelModal from 'components/channel/createChannel';

const ChannelScreen = React.memo(({ match, getChannel, loginUser }) => {
    const channelPk = React.useMemo(() => match.params.pk, [match]);

    let [editChannelModal, toggleEditChannelModal] = useToggle(false);

    let [channel, setChannel] = React.useState({});

    let isAdmin = React.useMemo(() => (channel.admin && loginUser ? loginUser.id === channel.admin : false), [channel, loginUser]);

    React.useEffect(() => {
        channelPk && getChannel(channelPk).then(setChannel);
    }, [channelPk, getChannel]);

    const ChannelDescription = () => {
        return (
            <>
                <div className={styles['description-container']}>
                    <h4>Rules</h4>
                    <p className={styles['channel-description']}>{channel.rules}</p>
                </div>

                <div className={styles['description-container']}>
                    <h4>Stats</h4>
                    <div className={styles['stats-wrapper']}>
                        <div>
                            <h4 className="danger">{channel.no_posts}</h4>
                            <p>Posts</p>
                        </div>
                        <div>
                            <h4 className="danger">{channel.no_followers}</h4>
                            <p>Followers</p>
                        </div>
                        {/* <div style={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}></div> */}
                    </div>
                </div>
            </>
        );
    };

    const ChannelPosts = () => {
        return (
            <div className={styles['posts-container']}>
                <PostsScreen showFloatButton={false} channelsLink={false} posts={channel.posts.map(post => ({ ...post, channel }))} />
            </div>
        );
    };

    const editCallback = response => {
        setChannel({ ...channel, ...response });
    };

    return (
        channel.id && (
            <>
                <div className={styles.container}>
                    <ChannelCard
                        channel={channel}
                        edit={isAdmin}
                        showEdit={toggleEditChannelModal}
                        showBorder
                        link={false}
                        style={{ paddingTop: 30 }}
                    />
                    <ChannelDescription />
                    <ChannelPosts />
                </div>

                <CreateChannelModal
                    modalVisibility={editChannelModal}
                    toggleModalVisibility={toggleEditChannelModal}
                    callback={editCallback}
                    edit
                    channel={channel}
                />
            </>
        )
    );
});

const mapStateToProps = state => {
    return { loginUser: state.loginUser };
};

const mapDispatchToProps = {
    getChannel: getChannelById,
};
export default connect(mapStateToProps, mapDispatchToProps)(ChannelScreen);
