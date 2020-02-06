import { SOCIALS_API } from 'api';

export const addCommentApi = post => `${SOCIALS_API}${post ? 'post' : 'comment'}/comment/`;

export const getCommentApi = id => `${SOCIALS_API}comment/?id=${id}`;
