import React from 'react';

import ChannelCard from '../channelCard';
import { sampleChannel } from '../../../utils/hardcodedData';
import { FloatAddButton } from '../../common/CommonComponents';

const ChannelsScreen = React.memo(() => {
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

            <FloatAddButton onClick={() => console.log('Add Channel')} />
            {/* TODO: */}
        </>
    );
});
export default ChannelsScreen;
