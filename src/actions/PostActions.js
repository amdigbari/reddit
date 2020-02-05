import { samplePost } from '../utils/hardcodedData';
import { customFetch } from 'utils/functionalUtils';
import { CREATE_POST_API, getPostApi, GET_AVAILABLE_CHANNELS_API, getScorePostApi } from 'api/postApi';

export const getPostById = pk => dispatch => {
    return customFetch(getPostApi(pk));
};

export const getUserPosts = pk => dispatch => {
    return [samplePost, { ...samplePost, pk: 2 }];
};

export const createPost = post => dispatch => {
    return customFetch(CREATE_POST_API, {
        method: 'POST',
        body: JSON.stringify(post),
    }).then(response => {
        console.log(response);
    });
};

export const getAvailableChannels = () => dispatch => {
    return customFetch(GET_AVAILABLE_CHANNELS_API).then(response => response.channels);
};

export const scorePost = (postId, score) => dispatch => {
    return customFetch(getScorePostApi(score), { method: 'PUT', body: JSON.stringify({ id: postId }) });
};
