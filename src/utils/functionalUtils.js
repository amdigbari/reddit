import { URL_PATTERN } from './staticUtils';
import { decode } from 'base-64';

export const parseLinks = (text, linkClass) => {
    let parsedText = text.replace(URL_PATTERN, function(matchedUrl) {
        return `<a class="${linkClass}" href="${matchedUrl.replace(/^www./, 'http://')}" target="_blank">${matchedUrl}</a>`;
    });

    console.log(parsedText);

    return parsedText;
};

export const customFetch = (url, options) => {
    let token = localStorage.getItem('token');

    let headers = { 'Content-Type': 'application/json' };

    if (token) {
        headers = { ...headers, Authorization: `Basic ${token}` };
    }

    return fetch(url, {
        headers,
        ...(options || {}),
    }).then(res => res.json());
};

export const imageToBase64 = async image => {
    return new Promise((resolve, reject) => {
        var reader = new FileReader();
        reader.readAsDataURL(image);

        reader.onloadend = function(e) {
            resolve(reader.result);
        };
    });
};
