import { SOCIALS_API } from 'api';

export const searchApi = query => `${SOCIALS_API}search/?q=${query}`;
