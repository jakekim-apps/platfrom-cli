import { serviceConfig } from "./config";
import axios from 'axios';

export const accountService = {
    registerAccount: registerAccount,
    getAccounts: getAccounts,
    updateAccount: updateAccount,
    removeAccount: removeAccount
};

const api = {
    register: ['post', '/accounts'],
    get: ['get', '/accounts'],
    update: ['put', '/accounts/'],
    remove: ['delete', '/accounts/']
};

function registerAccount(data) {
    let [method, url] = api.register;
    let body = {
        name: data.name,
        accountNumber: data.accountNumber,
        description: data.description,
        amount: data.amount
    };
    let requestConfig = serviceConfig.makeRequestConfig(method, url, body);
    return axios.request(requestConfig);
}

function getAccounts(data) {
    let [method, url] = api.get;
    let requestConfig = serviceConfig.makeRequestConfig(method, url);
    return axios.request(requestConfig);
}

function updateAccount(data) {
    let [method, url] = api.update;
    url += data.id;
    let requestConfig = serviceConfig.makeRequestConfig(method, url, data);
    return axios.request(requestConfig);
}

function removeAccount(data) {
    let [method, url] = api.remove;
    url += data.id;
    let requestConfig = serviceConfig.makeRequestConfig(method, url);
    return axios.request(requestConfig);
}