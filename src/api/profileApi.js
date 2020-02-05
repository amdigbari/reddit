import { SOCIALS_API, ACCOUNTS_API } from 'api';

export const UPDATE_PROFILE_API = `${ACCOUNTS_API}update/`;

export const GET_NOTIFICATIONS_API = `${SOCIALS_API}notifs/`;

export const getFollowListApi = (followers, pk) => `${ACCOUNTS_API}follow/${pk}/${followers ? 'followers' : 'followings'}/`;

export const getProfileApi = pk => `${ACCOUNTS_API}profile/?id=${pk}`;

export const getFollowProfileApi = (id, unFollow) => `${ACCOUNTS_API}follow/${id}/user/${unFollow ? '?action=unfollow' : ''}`;
