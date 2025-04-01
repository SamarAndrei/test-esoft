import $api from '../http';
export default class AuthService {
    static async login(loginData) {
        return $api.post('/login', loginData);
    }
    static async registration(signUpData) {
        return $api.post('/registration', signUpData);
    }
    static async logout() {
        return $api.post('/logout');
    }
    static async checkAuth() {
        return $api.get('/checkAuth');
    }
}
