import { config } from '../config';

export const serviceConfig = {
    makeRequestConfig,
};

function makeRequestConfig(method, url, data, params) {
    let requestConfig = {
        baseURL: config.SERVER_URL,
        responseType: 'json',
        url: url,
        method,
        data,
        params
    };

    return requestConfig;
}