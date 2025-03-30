import db from "../db";
import {ApiError} from "../exceptions/api_errors";
import {ICreateUserData} from "../interfaces/ICreateUserData";

class UserModel {
    async create(userData: ICreateUserData) {
        try {
            const query = db('users');
            await query.insert(userData);
        } catch (err) {
            console.error('Error creating user', err);
            throw err;
        }
    }

    async getByLogin(login: string) {
        try {
            const query = db('users');
            return await query.where('login', login).first();
        } catch (err) {
            console.error('Error fetching user by login', err);
            const errorArray: string[] = [err instanceof Error ? err.message : String(err)];

            ApiError.BadConnectToDB(errorArray);
        }
    }

    async getAll() {
        try {
            const query = db('users');
            return await query.where('role', 'Пользователь');
        } catch (err) {
            console.error('Error fetching all users', err);
            const errorArray: string[] = [err instanceof Error ? err.message : String(err)];

            ApiError.BadConnectToDB(errorArray);
        }
    }

}

export default UserModel;