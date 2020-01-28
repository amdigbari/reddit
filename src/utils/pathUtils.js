export const basePath = '/';

export const postPath = pk => `${basePath}posts/${pk || ':pk'}/`;

export const channelPath = pk => `${basePath}channels/${pk || ':pk'}/`;

export const notificationPath = `${basePath}notifications/`;

export const userPath = pk => `${basePath}users/${pk || ':pk'}/`;

export const userPostsPath = pk => `${userPath(pk)}posts/`;

export const userChannelsPath = pk => `${userPath(pk)}channels/`;

export const userFollowersPath = pk => `${userPath(pk)}followers/`;

export const userFollowingsPath = pk => `${userPath(pk)}followings/`;
