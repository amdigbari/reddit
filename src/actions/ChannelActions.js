import { sampleChannel } from '../utils/hardcodedData';
import { customFetch } from 'utils/functionalUtils';
import { CREATE_CHANNEL_API } from 'api/channelApi';

export const getChannelById = pk => dispatch => {
    return sampleChannel;
};

export const getUserChannels = pk => dispatch => {
    return [sampleChannel, { ...sampleChannel, pk: 2 }];
};

export const createChannel = channel => dispatch => {
    return customFetch(CREATE_CHANNEL_API, {
        method: 'POST',
        body: JSON.stringify(channel),
    });
};
