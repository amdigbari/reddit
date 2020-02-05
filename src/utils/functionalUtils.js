import { URL_PATTERN } from './staticUtils';
import { decode } from 'base-64';

export const parseLinks = (text, linkClass) => {
    let parsedText = text.replace(URL_PATTERN, function(matchedUrl) {
        return `<a class="${linkClass}" href="${matchedUrl.replace(/^www./, 'http://')}" target="_blank">${matchedUrl}</a>`;
    });

    console.log(parsedText);

    return parsedText;
};

export const customFetch = (url, options, setContent = true) => {
    let token = localStorage.getItem('token');

    let headers = {};

    if (setContent) headers = { 'Content-Type': 'application/json' };

    if (token) {
        headers = { ...headers, Authorization: `Basic ${token}` };
    }

    return fetch(url, {
        ...(options || {}),
        headers: { ...headers, ...((options && options.headers) || {}) },
    }).then(res => {
        let status = Math.floor(res.status / 100);
        if (status === 2) return res.json();

        throw res.status;
    });
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
