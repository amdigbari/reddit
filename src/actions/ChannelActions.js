import { sampleChannel } from '../utils/hardcodedData';

export const getChannelById = pk => dispatch => {
    return sampleChannel;
};

export const getUserChannels = pk => dispatch => {
    return [sampleChannel, { ...sampleChannel, pk: 2 }];
};
