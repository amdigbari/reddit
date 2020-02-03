import { BASE_API, SOCIALS_API } from 'api';

export const CREATE_POST_API = `${SOCIALS_API}post/`;

export const getPostApi = pk => `${CREATE_POST_API}?post_id=${pk}`;
