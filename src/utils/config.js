let baseURL = '';

if (process.env.NODE_ENV === 'development') {
    baseURL = 'http://cangdu.org:8001';
} else if (process.env.NODE_ENV === 'production') {
    baseURL = 'https://elm.cangdu.org';
}

let imgBaseURL = baseURL + '/img/';

export {baseURL, imgBaseURL}