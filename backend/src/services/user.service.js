"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const uuid_1 = require("uuid");
const bcrypt_1 = __importDefault(require("bcrypt"));
const api_errors_1 = require("../exceptions/api_errors");
require('dotenv').config();
class UserService {
    constructor(userModel, tokenService) {
        this.userModel = userModel;
        this.tokenService = tokenService;
    }
    registration(userData) {
        return __awaiter(this, void 0, void 0, function* () {
            const existingUser = yield this.userModel.getByLogin(userData.login);
            if (existingUser) {
                throw api_errors_1.ApiError.BadRequest(`Пользователь с таким логином - ${userData.login} уже существует`);
            }
            else {
                const hashedPassword = yield bcrypt_1.default.hash(userData.password, parseInt(process.env.SALT_ROUNDS));
                const newUserData = {
                    id: (0, uuid_1.v7)(),
                    firstName: userData.firstName,
                    lastName: userData.lastName,
                    middleName: userData.middleName,
                    login: userData.login,
                    password: hashedPassword,
                    role: process.env.USER_ACCESS,
                };
                yield this.userModel.create(newUserData);
                const user = yield this.userModel.getByLogin(userData.login);
                const role = user.role;
                const accessToken = this.tokenService.generateToken({
                    id: user.id,
                    firstName: user.firstName,
                    role: user.role
                });
                return { accessToken, role };
            }
        });
    }
    login(userData) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.userModel.getByLogin(userData.login);
            if (user && (yield bcrypt_1.default.compare(userData.password, user.password))) {
                const accessToken = this.tokenService.generateToken({
                    id: user.id,
                    firstName: user.firstName,
                    role: user.role,
                });
                const role = user.role;
                return { accessToken, role };
            }
            else {
                throw api_errors_1.ApiError.BadRequest('Неверный пароль или email');
            }
        });
    }
    getAllUsers() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.userModel.getAll();
        });
    }
    getUserById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.userModel.getById(id);
        });
    }
}
exports.default = UserService;
