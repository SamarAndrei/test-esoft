import $api from '../http';
import { AxiosResponse } from 'axios';
import { IUser } from '../models/IUser.ts';

export default class UserService {
    static async fetchUsers() : Promise<AxiosResponse<IUser[]>> {
        return $api.get<IUser[]>('/user');
    }

    static async fetchUserById(id: string) : Promise<AxiosResponse<IUser>> {
        return $api.get<IUser>(`/user/${id}`);
    }
}