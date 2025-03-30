import jwt from "jsonwebtoken";
import {ApiError} from "../exceptions/api_errors";
import {IUser} from "../interfaces/IUser";

require('dotenv').config();

export const authorizeRole = (roles: string[]) => {
    return (req: any, res: any, next: any) => {
        const token = req.headers.authorization?.split(' ')[1];

        if (!token) {
            return next(ApiError.UnauthorizedError());
        }
        jwt.verify(token, process.env.SECRET_KEY!, (err: any, decoded: any) => {
            if (err) {
                console.error('Ошибка при расшифровке токена:', err);
                return next(ApiError.Forbidden());
            }

            req.user = decoded as IUser;

            if (!roles.includes(req.user.role)) {
                return next(ApiError.Forbidden());
            }

            next();
        });
    };
};