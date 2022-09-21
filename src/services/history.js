import { serviceConfig } from "./config";
import axios from 'axios';

export const historyService = {
    createHistory: createHistory,
    getHistories: getHistories,
    updateHistory: updateHistory,
    removeHistory: removeHistory
};

const api = {
    create: ['post', '/histories'],
    get: ['get', '/histories'],
    update: ['put', '/histories/'],
    remove: ['delete', '/histories/']
};

function createHistory(data) {
    let [method, url] = api.create;
    let body = {
        name: data.name,
        description: data.description
    };
    let requestConfig = serviceConfig.makeRequestConfig(method, url, body);
    return axios.request(requestConfig);
}

function getHistories(data) {
    let [method, url] = api.get;
    let requestConfig = serviceConfig.makeRequestConfig(method, url);
    return axios.request(requestConfig);
}

function updateHistory(data) {
    let [method, url] = api.update;
    url += data.id;
    let requestConfig = serviceConfig.makeRequestConfig(method, url, data);
    return axios.request(requestConfig);
}

function removeHistory(data) {
    let [method, url] = api.remove;
    url += data.id;
    let requestConfig = serviceConfig.makeRequestConfig(method, url);
    return axios.request(requestConfig);
}