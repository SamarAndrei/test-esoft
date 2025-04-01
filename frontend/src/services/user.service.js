import $api from '../http';
export default class UserService {
    static async fetchUsers() {
        return $api.get('/user');
    }
    static async fetchUserById(id) {
        return $api.get(`/user/${id}`);
    }
}
