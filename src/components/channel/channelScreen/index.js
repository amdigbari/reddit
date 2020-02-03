import React from 'react';
import { connect } from 'react-redux';

import ChannelCard from '../channelCard';
import styles from './styles.module.scss';
import PostsScreen from '../../post/postsScreen';
import { getChannelById } from '../../../actions/ChannelActions';

const ChannelScreen = React.memo(({ match, getChannel }) => {
    const channelPk = React.useMemo(() => match.params.pk, [match]);

    let [channel, setChannel] = React.useState({});

    React.useEffect(() => {
        channelPk && setChannel(getChannel(channelPk));
    }, [channelPk, getChannel]);

    const ChannelDescription = () => {
        return (
            <>
                <div className={styles['description-container']}>
                    <h4>About</h4>
                    <p className={styles['channel-description']}>{channel.description}</p>
                </div>

                <div className={styles['description-container']}>
                    <h4>Stats</h4>
                    <div className={styles['stats-wrapper']}>
                        <div>
                            <h4 className="danger">{channel.postsCount}</h4>
                            <p>Posts</p>
                        </div>
                        <div>
                            <h4 className="danger">{channel.members}</h4>
                            <p>Followers</p>
                        </div>
                    </div>
                </div>
            </>
        );
    };

    const ChannelPosts = () => {
        return (
            <div className={styles['posts-container']}>
                <PostsScreen showFloatButton={false} channelsLink={false} />
            </div>
        );
    };

    return (
        channel.id && (
            <div className={styles.container}>
                <ChannelCard channel={channel} showBorder link={false} style={{ paddingTop: 30 }} />
                <ChannelDescription />
                <ChannelPosts />
            </div>
        )
    );
});

const mapDispatchToProps = {
    getChannel: getChannelById,
};
export default connect(undefined, mapDispatchToProps)(ChannelScreen);
