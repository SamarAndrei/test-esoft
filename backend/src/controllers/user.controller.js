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
Object.defineProperty(exports, "__esModule", { value: true });
const api_errors_1 = require("../exceptions/api_errors");
const express_validator_1 = require("express-validator");
class UserController {
    constructor(userService) {
        this.registration = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const errors = (0, express_validator_1.validationResult)(req);
                if (!errors.isEmpty()) {
                    const errorMessages = errors.array().map(error => error.msg);
                    return next(api_errors_1.ApiError.BadRequest('Ошибка при валидации', errorMessages));
                }
                const registrationResponse = yield this.userService.registration(req.body);
                //Токен дейсвителен 30 минут
                res.cookie('accessToken', registrationResponse.accessToken, {
                    maxAge: 30 * 60 * 1000,
                    httpOnly: true,
                    secure: true,
                    sameSite: 'none',
                });
                res.status(200).json(Object.assign(Object.assign({}, registrationResponse), { validToken: true }));
            }
            catch (e) {
                next(e);
            }
        });
        this.login = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const loginResponse = yield this.userService.login(req.body);
                //Токен дейсвителен 30 минут
                res.cookie('accessToken', loginResponse.accessToken, {
                    maxAge: 30 * 60 * 1000,
                    httpOnly: true,
                    secure: true,
                    sameSite: 'none',
                });
                res.status(200).json(Object.assign(Object.assign({}, loginResponse), { validToken: true }));
            }
            catch (e) {
                next(e);
            }
        });
        this.logout = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                res.clearCookie('accessToken');
                res.status(200).json(`Успешный выход`);
            }
            catch (e) {
                next(e);
            }
        });
        this.getAllUsers = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const users = yield this.userService.getAllUsers();
                if (users) {
                    res.status(200).json(users);
                }
                else {
                    return next(api_errors_1.ApiError.NotFound('Пользователи не найдены'));
                }
            }
            catch (e) {
                next(e);
            }
        });
        this.getUserById = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const user_id = req.params.id;
                const user = yield this.userService.getUserById(user_id);
                if (user) {
                    res.status(200).json(user);
                }
                else {
                    return next(api_errors_1.ApiError.NotFound('Пользователь не найден'));
                }
            }
            catch (e) {
                next(e);
            }
        });
        this.checkAuth = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                res.status(200).json({ validToken: true });
            }
            catch (e) {
                next(e);
            }
        });
        this.userService = userService;
    }
}
exports.default = UserController;
