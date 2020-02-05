import { SOCIALS_API, ACCOUNTS_API } from 'api';

export const CREATE_CHANNEL_API = `${SOCIALS_API}channel/`;

export const getChannelApi = id => `${CREATE_CHANNEL_API}?id=${id}`;

export const getFollowChannelApi = (id, unFollow) => `${ACCOUNTS_API}follow/${id}/channel/${unFollow ? '?action=unfollow' : ''}`;
