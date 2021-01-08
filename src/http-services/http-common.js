import axios from "axios";
import config from '../constants/config.json';

function getBaseUrl() {
 
    switch (process.env.NODE_ENV) {
        case 'production':
            return config.api.url.production
        case 'development':
            return config.api.url.development
        default:
            return config.api.url.local
    }
}

const instance = axios.create({
    baseURL: getBaseUrl(),
    headers: {
        "Content-type": "application/json",
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