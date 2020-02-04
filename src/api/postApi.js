import { BASE_API, SOCIALS_API } from 'api';

export const CREATE_POST_API = `${SOCIALS_API}post/`;

export const getPostApi = pk => `${CREATE_POST_API}?post_id=${pk}`;

export const GET_AVAILABLE_CHANNELS_API = `${CREATE_POST_API}available_channels/`;

export const getScorePostApi = (pk, score) => `${CREATE_POST_API}${pk}/feedback/?like=${score}`;
