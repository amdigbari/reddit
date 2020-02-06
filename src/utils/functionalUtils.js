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

export const imageToBase64 = image => {
    return new Promise((resolve, reject) => {
        var reader = new FileReader();
        reader.readAsDataURL(image);

        reader.onloadend = function(e) {
            resolve(reader.result);
        };
    });
};

export const canvasToBlob = url => {
    if (!HTMLCanvasElement.prototype.toBlob) {
        Object.defineProperty(HTMLCanvasElement.prototype, 'toBlob', {
            value: function(callback, type, quality) {
                var dataURL = this.toDataURL(type, quality).split(',')[1];
                setTimeout(function() {
                    var binStr = atob(dataURL),
                        len = binStr.length,
                        arr = new Uint8Array(len);
                    for (var i = 0; i < len; i++) {
                        arr[i] = binStr.charCodeAt(i);
                    }
                    callback(new Blob([arr], { type: type || 'image/png' }));
                });
            },
        });
    }

    return new Promise((resolve, reject) => {
        const fileName = url.replace(/(\/image\/|\..*$)/g, '');
        const type = url.replace(/(\/image\/.*\.)/g, '');

        const img = new Image();
        img.src = url;

        img.onload = () => {
            let elem = document.createElement('canvas');

            elem.width = img.width;
            elem.height = img.height;

            let ctx = elem.getContext('2d');
            // img.width and img.height will contain the original dimensions

            ctx.drawImage(img, 0, 0, elem.width, elem.height);
            let tmpBlob = ctx.canvas.toBlob(
                blob => {
                    let _file = new File([blob], fileName, {
                        type: `image/${type}`,
                        lastModified: Date.now(),
                    });

                    resolve(_file);
                },
                `image/${type}`,
                1,
            );
        };

        img.onerror = reject;
    });
};
