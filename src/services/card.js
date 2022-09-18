import { serviceConfig } from "./config";
import axios from 'axios';

export const cardService = {
    registerCard: registerCard,
    getCards: getCards,
    updateCard: updateCard,
    removeCard: removeCard
};

const api = {
    register: ['post', '/cards'],
    get: ['get', '/cards'],
    update: ['put', '/cards/'],
    remove: ['delete', '/cards/']
};

function registerCard(data) {
    let [method, url] = api.register;
    let body = {
        name: data.name,
        cardNumber: data.cardNumber,
        description: data.description
    };
    let requestConfig = serviceConfig.makeRequestConfig(method, url, body);
    return axios.request(requestConfig);
}

function getCards(data) {
    let [method, url] = api.get;
    let requestConfig = serviceConfig.makeRequestConfig(method, url);
    return axios.request(requestConfig);
}

function updateCard(data) {
    let [method, url] = api.get;
    let requestConfig = serviceConfig.makeRequestConfig(method, url);
    return axios.request(requestConfig);
}

function removeCard(data) {
    let [method, url] = api.get;
    let requestConfig = serviceConfig.makeRequestConfig(method, url);
    return axios.request(requestConfig);
}