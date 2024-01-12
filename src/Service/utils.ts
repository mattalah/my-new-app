import axios from "axios";



const authInterceptor = (req: any) => {
    const accessToken = localStorage.getItem("token")
    if (accessToken) {
        req.headers.Authorization = `Bearer ${accessToken}`;
        return req;
    }
    return req;
}
const BASE_URL = import.meta.env.VITE_APP_API_URL;
const Api = axios.create({ baseURL: BASE_URL });
Api.defaults.timeout = 25000;
Api.interceptors.request.use(authInterceptor);

export const setToken = (token: string) => {
    localStorage.setItem('token', token);
}


export default Api;
