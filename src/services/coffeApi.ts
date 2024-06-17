import axios from 'axios';
import { getEnvVariables } from '../helpers';

const { VITE_HOST_BACKEND } = getEnvVariables();

const createAxiosInstance = (baseURL: string) => {
    const instance = axios.create({
        baseURL: `${baseURL}api`,
        withCredentials: false,
    });

    instance.interceptors.request.use((request) => {
        const token = localStorage.getItem(`token`);
        if (token) {
            request.headers.Authorization = `Bearer ${token}`;
        }
        return request;
    });

    instance.interceptors.response.use(
        (response) => response,
        (error) => {
            if (error.response && error.response.status === 401) {
                localStorage.clear();
                window.location.href = '/';
            }
            return Promise.reject(error);
        }
    );

    return instance;
};

export const coffeApi = createAxiosInstance(VITE_HOST_BACKEND);
