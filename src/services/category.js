import { serviceConfig } from "./config";
import axios from 'axios';

export const categoryService = {
    createCategory: createCategory,
    getCategories: getCategories,
    updateCategory: updateCategory,
    removeCategory: removeCategory
};

const api = {
    create: ['post', '/categories'],
    get: ['get', '/categories'],
    update: ['put', '/categories/'],
    remove: ['delete', '/categories/']
};

function createCategory(data) {
    let [method, url] = api.create;
    let body = {
        name: data.name,
        description: data.description
    };
    let requestConfig = serviceConfig.makeRequestConfig(method, url, body);
    return axios.request(requestConfig);
}

function getCategories(data) {
    let [method, url] = api.get;
    let requestConfig = serviceConfig.makeRequestConfig(method, url);
    return axios.request(requestConfig);
}

function updateCategory(data) {
    let [method, url] = api.update;
    url += data.id;
    let requestConfig = serviceConfig.makeRequestConfig(method, url, data);
    return axios.request(requestConfig);
}

function removeCategory(data) {
    let [method, url] = api.remove;
    url += data.id;
    let requestConfig = serviceConfig.makeRequestConfig(method, url);
    return axios.request(requestConfig);
}