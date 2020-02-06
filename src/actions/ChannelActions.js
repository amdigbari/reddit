import { sampleChannel } from '../utils/hardcodedData';
import { customFetch } from 'utils/functionalUtils';
import { CREATE_CHANNEL_API, getChannelApi, getFollowChannelApi, getPotentialAuthorsApi, updateChannelApi } from 'api/channelApi';

export const getChannelById = pk => dispatch => {
    return customFetch(getChannelApi(pk)).then(response => response[0]);
};

export const getUserChannels = pk => dispatch => {
    return [sampleChannel, { ...sampleChannel, pk: 2 }];
};

export const createChannel = (channel, edit, id) => dispatch => {
    return customFetch(
        edit ? updateChannelApi(id) : CREATE_CHANNEL_API,
        {
            method: edit ? 'PATCH' : 'POST',
            body: channel,
        },
        false,
    );
};

export const followChannel = (id, action) => dispatch => {
    return customFetch(getFollowChannelApi(id, action), { method: 'PUT' });
};

export const getPotentialAuthors = pk => dispatch => {
    return customFetch(getPotentialAuthorsApi(pk));
};

export const deleteChannel = pk => dispatch => {
    return customFetch(updateChannelApi(pk), {
        method: 'DELETE',
    });
};
