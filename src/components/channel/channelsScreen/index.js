import React from 'react';

import ChannelCard from '../channelCard';
import { sampleChannel } from '../../../utils/hardcodedData';
import { FloatAddButton } from '../../common/CommonComponents';
import CreateChannelModal from '../createChannel';
import { useToggle } from '../../common/customHooks';

const ChannelsScreen = React.memo(() => {
    let [modalVisibility, toggleModalVisibility] = useToggle(false);

    const channels = React.useMemo(() => [sampleChannel, { ...sampleChannel, pk: 2 }], []);

    return (
        <>
            {channels.map((channel, index, array) => (
                <ChannelCard
                    channel={channel}
                    key={channel.pk}
                    {...(index === 0 ? { style: { marginTop: 30 } } : {})}
                    {...(index < array.length - 1 ? { showBorder: true } : {})}
                />
            ))}

            <FloatAddButton onClick={toggleModalVisibility} />
            <CreateChannelModal modalVisibility={modalVisibility} toggleModalVisibility={toggleModalVisibility} />
        </>
    );
});
export default ChannelsScreen;
