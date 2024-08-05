import axios from 'axios';
import { getEnvVariables } from '../helpers';

const { VITE_HOST_BACKEND } = getEnvVariables();

const createAxiosInstance = (baseURL: string) => {
    const instance = axios.create({
        baseURL: `${baseURL}api`,
        withCredentials: false,
    });

    // Interceptor para agregar el token al encabezado de autorización
    instance.interceptors.request.use((request) => {
        const token = localStorage.getItem('token');
        if (token) {
            request.headers.Authorization = `Bearer ${token}`;
        }
        return request;
    });

    // Interceptor para manejar respuestas de error
    instance.interceptors.response.use(
        (response) => response,
        (error) => {
            if (error.response) {
                if (error.response.status === 401) {
                    localStorage.clear();
                    window.location.href = '/';
                } else {
                    console.error('API Error:', error.response.data); // Depuración
                }
            } else {
                console.error('Network Error:', error.message); // Depuración
            }
            return Promise.reject(error);
        }
    );

    return instance;
};

export const coffeApi = createAxiosInstance(VITE_HOST_BACKEND);
