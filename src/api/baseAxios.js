import axios from 'axios';
export default function baseAxios(axiosConfig) {
    const service = axios.create({
        baseURL: 'http://127.0.0.1:3000',
        timeout: 10000,
    });
    return service(axiosConfig);
}