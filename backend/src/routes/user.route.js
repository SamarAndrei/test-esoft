"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const express_validator_1 = require("express-validator");
const auth_middleware_1 = require("../middleware/auth.middleware");
exports.default = (userController) => {
    const router = express_1.default.Router();
    router.post('/registration', [
        (0, express_validator_1.body)('firstName', 'Имя не может быть пустым').notEmpty(),
        (0, express_validator_1.body)('lastName', 'Фамилия не может быть пустой').notEmpty(),
        (0, express_validator_1.body)('login', 'Логин должен быть больше 8 символов').isLength({
            min: 8,
        }),
        (0, express_validator_1.body)('password', 'Пароль должен быть больше 8 символов').isLength({
            min: 8,
        }),
    ], userController.registration);
    router.post('/login', userController.login);
    router.post('/logout', userController.logout);
    router.get('/user', auth_middleware_1.authenticateJWT, userController.getAllUsers);
    router.get('/user/:id', auth_middleware_1.authenticateJWT, userController.getUserById);
    router.get('/checkAuth', auth_middleware_1.authenticateJWT, userController.checkAuth);
    return router;
};
