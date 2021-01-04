import axios from "axios";
import config from '../constants/config.json';

function getBaseUrl() {
    return process.env.NODE_ENV !== "production" ? config.api.url.dev : config.api.url.prod;
}

function getJwt() {
    return localStorage.getItem('jwt');
}

const instance = axios.create({
    baseURL: getBaseUrl(),
    headers: {
        "Content-type": "application/json",
        // "x-access-token": getJwt()
    }
});

instance.interceptors.request.use(function (config) {
    const token = localStorage.getItem('jwt');
    if (token) {
        config.headers["x-access-token"] =  token;
    }

    return config;
});

export default instance;