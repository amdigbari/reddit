import { URL_PATTERN } from './staticUtils';

export const parseLinks = (text, linkClass) => {
    let parsedText = text.replace(URL_PATTERN, function(matchedUrl) {
        return `<a class="${linkClass}" href="${matchedUrl.replace(/^www./, 'http://')}" target="_blank">${matchedUrl}</a>`;
    });

    console.log(parsedText);

    return parsedText;
};
