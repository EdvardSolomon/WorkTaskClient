import axios from "axios";

export const API_URL = "http://localhost:3000";

const $api = axios.create({
    withCredentials: true,
    baseURL: API_URL,
});

$api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    config.headers.Authorization = `Bearer ${token}`;
    return config;
});

$api.interceptors.response.use((config) => config,
async (error) => {
    const originalRequest = error.config;
    if(error.response.status === 401) {
        try {
        const response = await axios.get(`${API_URL}/auth/refresh`, {withCredentials: true});
        localStorage.setItem('token', response.data.access_token);
        return $api.request(originalRequest);
        } catch (e) {
            console.log("not authorized");
        }
    }
});

export default $api;