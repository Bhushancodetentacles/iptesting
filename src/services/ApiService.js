
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// const url = process.env.BASE_URl
const url = import.meta.env.VITE_BASE_URL

const api = axios.create({
    baseURL: url,
    headers: {
        'Content-Type': 'application/json',
        // 'Accept': 'application/json',
    },
});

api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token')?.replace(/"/g, '');
    if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
});

api.interceptors.response.use(
    (response) => {
        return response.data;
    },
    (error) => {
        if(error && error.response){
            toast.error(error.response.data.message)
        }
        return Promise.reject(error);
    }
);

export const get = async (url, params = {}) => {
    try {
        const response = await api.get(url, { params });
        return response;
    } catch (error) {
        throw error;
    }
};

export const post = async (url, data = {}, additionalHeaders = {}) => {
    try {
        const response = await api.post(url, data, {
            headers: {
                ...api.defaults.headers,
                ...additionalHeaders,
            },
        });
        return response;
    } catch (error) {
        throw error;
    }
};

export const put = async (url, data = {}) => {
    try {
        const response = await api.put(url, data);
        return response;
    } catch (error) {
        throw error;
    }
};

export const del = async (url) => {
    try {
        const response = await api.delete(url);
        return response;
    } catch (error) {
        throw error;
    }
};
