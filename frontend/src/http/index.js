import axios from 'axios';
export const API_URL = `https://test-esoft-nd13.onrender.com/api`;
const $api = axios.create({
    withCredentials: true,
    baseURL: API_URL,
});
$api.interceptors.request.use(config => {
    return config;
});
$api.interceptors.response.use(config => {
    return config;
}, async (error) => {
    const originalRequest = error.config;
    if (error.response.status == 401 &&
        error.config &&
        !error.config._isRetry) {
        originalRequest._isRetry = true;
        try {
            const response = await axios.get(`${API_URL}/login`, { withCredentials: true });
            // localStorage.setItem('token', response.data.accessToken);
            return $api.request(originalRequest);
        }
        catch (e) {
            console.log('НЕ АВТОРИЗОВАН');
        }
    }
    throw error;
});
export default $api;
