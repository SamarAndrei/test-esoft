import {v7} from "uuid";
import bcrypt from "bcrypt";
import UserModel from 'reposio/user.dal';
import TokenService from "./token.service";
import {ILoginData} from "../interfaces/ILoginData";
import {ApiError} from '../exceptions/api_errors';
import {INewUser} from "../interfaces/INewUser";

require('dotenv').config();

class UserService {
    private userModel: UserModel;
    private tokenService: TokenService;


    constructor(userModel: UserModel, tokenService: TokenService) {
        this.userModel = userModel;
        this.tokenService = tokenService;
    }

    async registration(userData: INewUser) {
        const existingUser = await this.userModel.getByLogin(userData.login);

        if (existingUser) {
            throw ApiError.BadRequest(
                `Пользователь с таким логином - ${userData.login} уже существует`,
            );
        } else {
            const hashedPassword = await bcrypt.hash(
                userData.password,
                parseInt(process.env.SALT_ROUNDS!),
            );
            const newUserData = {
                id: v7(),
                firstName: userData.firstName,
                lastName: userData.lastName,
                middleName: userData.middleName,
                login: userData.login,
                password: hashedPassword,
                role: process.env.USER_ACCESS!,
            };
            await this.userModel.create(newUserData);

            const user = await this.userModel.getByLogin(userData.login);

            return this.tokenService.generateToken({
                id: user.id,
                firstName: user.firstName,
                role: user.role,
            });
        }
    }

    async login(userData: ILoginData) {
        const user = await this.userModel.getByLogin(userData.login);

        if (user && (await bcrypt.compare(userData.password, user.password))) {
            return this.tokenService.generateToken({
                id: user.id,
                firstName: user.firstName,
                role: user.role,
            });
        } else {
            throw ApiError.BadRequest('Неверный пароль или email');
        }
    }

    async getAllUsers() {
        return await this.userModel.getAll();
    }
}
export default UserService;