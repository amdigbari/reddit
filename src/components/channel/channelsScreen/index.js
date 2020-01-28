import React from 'react';
import { connect } from 'react-redux';

import ChannelCard from '../channelCard';
import { FloatAddButton } from '../../common/CommonComponents';
import CreateChannelModal from '../createChannel';
import { useToggle } from '../../common/customHooks';
import { getUserChannels } from '../../../actions/ChannelActions';

const ChannelsScreen = React.memo(({ getChannels }) => {
    let [modalVisibility, toggleModalVisibility] = useToggle(false);

    let [channels, setChannels] = React.useState([]);

    React.useEffect(() => {
        setChannels(getChannels());
    }, [getChannels]);

    return (
        <>
            {channels.map((channel, index, array) => (
                <ChannelCard
                    channel={channel}
                    key={channel.pk}
                    {...(index === 0 ? { style: { paddingTop: 30 } } : {})}
                    {...(index < array.length - 1 ? { showBorder: true } : {})}
                />
            ))}

            <FloatAddButton onClick={toggleModalVisibility} />
            <CreateChannelModal modalVisibility={modalVisibility} toggleModalVisibility={toggleModalVisibility} />
        </>
    );
});

const mapDispatchToProps = {
    getChannels: getUserChannels,
};
export default connect(undefined, mapDispatchToProps)(ChannelsScreen);
