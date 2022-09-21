import { serviceConfig } from "./config";
import axios from 'axios';

export const subCategoryService = {
    createSubCategory: createSubCategory,
    getSubCategories: getSubCategories,
    updateSubCategory: updateSubCategory,
    removeSubCategory: removeSubCategory
};

const api = {
    create: ['post', '/sub-categories'],
    get: ['get', '/sub-categories'],
    update: ['put', '/sub-categories/'],
    remove: ['delete', '/sub-categories/']
};

function createSubCategory(data) {
    let [method, url] = api.create;
    let body = {
        name: data.name,
        description: data.description,
        categoryId: data.categoryId
    };
    let requestConfig = serviceConfig.makeRequestConfig(method, url, body);
    return axios.request(requestConfig);
}

function getSubCategories(data) {
    let [method, url] = api.get;
    let requestConfig = serviceConfig.makeRequestConfig(method, url);
    return axios.request(requestConfig);
}

function updateSubCategory(data) {
    let [method, url] = api.update;
    url += data.id;
    let requestConfig = serviceConfig.makeRequestConfig(method, url, data);
    return axios.request(requestConfig);
}

function removeSubCategory(data) {
    let [method, url] = api.remove;
    url += data.id;
    let requestConfig = serviceConfig.makeRequestConfig(method, url);
    return axios.request(requestConfig);
}