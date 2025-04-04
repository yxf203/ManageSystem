import axios from 'axios';
export default function baseAxios(axiosConfig) {
    const service = axios.create({
        baseURL: 'http://127.0.0.1:8080',
        timeout: 10000,
    });
    return service(axiosConfig);
}