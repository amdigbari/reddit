import { samplePost } from '../utils/hardcodedData';

export const getPostById = pk => dispatch => {
    return samplePost;
};

export const getUserPosts = pk => dispatch => {
    return [samplePost, { ...samplePost, pk: 2 }];
};
