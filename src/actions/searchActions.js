import { customFetch } from 'utils/functionalUtils';
import { searchApi } from 'api/searchApi';

export const getSearchResponse = query => dispatch => {
    return customFetch(searchApi(query));
};
