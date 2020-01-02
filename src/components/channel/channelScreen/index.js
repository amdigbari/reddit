import React from 'react';

import ChannelCard from '../channelCard';
import { sampleChannel } from '../../../utils/hardcodedData';
import styles from './styles.module.scss';
import PostsScreen from '../../post/postsScreen';

const ChannelScreen = React.memo(({ match }) => {
    const channelPk = React.useMemo(() => match.params.pk, [match]);

    const channel = sampleChannel;

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
        <div className={styles.container}>
            <ChannelCard channel={channel} showBorder link={false} style={{ paddingTop: 30 }} />
            <ChannelDescription />
            <ChannelPosts />
        </div>
    );
});
export default ChannelScreen;
