import { SOCIALS_API } from 'api';

export const addCommentApi = post => `${SOCIALS_API}${post ? 'post' : 'comment'}/comment/`;
