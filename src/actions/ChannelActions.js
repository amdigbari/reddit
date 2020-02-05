import { sampleChannel } from '../utils/hardcodedData';
import { customFetch } from 'utils/functionalUtils';
import { CREATE_CHANNEL_API, getChannelApi, getFollowChannelApi } from 'api/channelApi';

export const getChannelById = pk => dispatch => {
    return customFetch(getChannelApi(pk)).then(response => response[0]);
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

export const followChannel = (id, action) => dispatch => {
    return customFetch(getFollowChannelApi(id, action), { method: 'PUT' });
};
