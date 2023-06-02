import axios from "axios";
import Cookies from "cookies-ts";
const cookies = new Cookies()
export const api = axios.create({
    baseURL: 'http://127.0.0.1:5000/api',
    headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
    },
})

const requestHandler = (request: any) => {
    if (cookies.get('access_token')) {
        request.headers['Authorization'] = `Bearer ${cookies.get('access_token')}`
    }
    return request;
}
api.interceptors.request.use(request => requestHandler(request));