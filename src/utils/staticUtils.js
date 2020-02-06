export const SHOW_ON_DESKTOP = 'showOnDesktop';
export const SHOW_ON_DEVICE = 'showOnDevice';

export const ENTER_KEY_CODE = 13;

export const SEARCH_DELAY = 500;

export const ANIMATION_DURATION = 400;

// Colors
export const GRAY = '#4a4a4a';
export const SILVER_GRAY = '#777';
export const PRIMARY_COLOR = '#ff6265';
export const DARK_PRIMARY_COLOR = '#de5356';
export const LIGHT_PRIMARY_COLOR = '#ff8688';
export const SECONDARY_COLOR = '#c2b526';
export const BACKGROUND_COLOR = '#f1efea';
export const LIGHT_COLOR = '#fff';
export const GREEN = 'rgb(40, 174, 68)';
export const RED = 'rgb(211, 71, 71)';

//Sizes
export const ICON_MOBILE_SIZE = 30;

//Platform
export const IS_IOS = process.browser && /iPad|iPhone|iPod/.test(navigator.userAgent);

//Validators
// eslint-disable-next-line no-control-regex
export const EMAIL_VALIDATOR = /^(?:[a-z0-9!#$%&'*+=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])$/;
export const PHONE_VALIDATOR = /^(\+989|09)\d{9}$/;
export const URL_PATTERN = /((http|ftp|https):\/\/|www.)([\w_-]+(?:(?:\.[\w_-]+)+))([\w.,@?^=%&:/~+#-]*[\w@?^=%&/~+#-])?/gm;

export const NOTIFICATION_TYPES = {
    FOLLOWED: 'FOLLOWED',
    COMMENT_ON_COMMENT: 'COMMENT_ON_COMMENT',
    LIKE_ON_COMMENT: 'LIKE_ON_COMMENT',
    LIKE_ON_POST: 'LIKE_ON_POST',
    COMMENT_ON_POST: 'COMMENT_ON_POST',
};

const getStatusErrorText = status => {
    switch (status) {
        case 400:
            return 'Bad Request';
        case 401:
            return 'Unauthorized';
        case 403:
            return 'Permission Denied';
        case 404:
            return 'Not Found';
        case 500:
            return 'Server Error';
        case 503:
            return 'Service Unavailable';
        default:
            return 'namoosan bikhial';
    }
};

export const getStatusMessage = status => {
    const statusFamily = Math.floor(status / 100);

    if (statusFamily === 2) {
        return { type: 'success', text: 'Successful' };
    } else {
        return { type: 'error', text: getStatusErrorText(status) };
    }
};
