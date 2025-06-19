import axios from "axios";

const getAuthToken = () => {
    return localStorage.getItem('magnusToken');
};

export const api_db = axios.create({
    baseURL: "https://magnus-app.com.br/api/v1/",
});

export const api_auth = axios.create({
    baseURL: "https://magnus-app.com.br/api/v1/auth/",
});
// http://localhost:8000/api/v1/auth/
// http://localhost:8000/api/v1/

api_db.interceptors.request.use(config => {
    const authToken = getAuthToken();
    if (authToken) {
        config.headers['Authorization'] = 'Bearer ' + authToken;
    }
    return config;
});

api_auth.interceptors.request.use(config => {
    const authToken = getAuthToken();
    if (authToken) {
        config.headers['Authorization'] = 'Bearer ' + authToken;    
    }
    return config;
});

