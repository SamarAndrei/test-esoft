import express from 'express';
import {body} from "express-validator";
import UserController from 'controllers/user.controller';
import {authorizeRole} from "../middleware/role.middleware";
import {authenticateJWT} from "../middleware/auth.middleware";

export default (userController: UserController) => {
    const router = express.Router();

    router.post(
        '/registration',
        [
            body('firstName', 'Имя не может быть пустым').notEmpty(),
            body('lastName', 'Фамилия не может быть пустой').notEmpty(),
            body('login', 'Логин должен быть больше 8 символов').isLength({
                min: 8,
            }),
            body('password', 'Пароль должен быть больше 8 символов').isLength({
                min: 8,
            }),
        ],
        userController.registration,
    );
    router.post('/login', userController.login);
    router.post('/logout', userController.logout);
    router.get('/user', authorizeRole(['Руководитель']), userController.getAllUsers);
    router.get('/user/:id', authenticateJWT, userController.getUserById);
    router.get('/checkAuth', authenticateJWT, userController.checkAuth);

    return router;
};