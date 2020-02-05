import { customFetch } from 'utils/functionalUtils';
import { addCommentApi } from 'api/commentApi';

export const addComment = (post, request) => dispatch => {
    return customFetch(addCommentApi(post), {
        method: 'POST',
        body: JSON.stringify(request),
    });
};
