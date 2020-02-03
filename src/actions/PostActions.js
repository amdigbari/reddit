import { samplePost } from '../utils/hardcodedData';
import { customFetch } from 'utils/functionalUtils';
import { CREATE_POST_API, getPostApi } from 'api/postApi';

export const getPostById = pk => dispatch => {
    return Promise.resolve(samplePost);
    // return customFetch(getPostApi);
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
