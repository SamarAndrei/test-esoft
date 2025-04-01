"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authorizeRole = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const api_errors_1 = require("../exceptions/api_errors");
require('dotenv').config();
const authorizeRole = (roles) => {
    return (req, res, next) => {
        const token = req.cookies.accessToken;
        if (!token) {
            return next(api_errors_1.ApiError.UnauthorizedError());
        }
        jsonwebtoken_1.default.verify(token, process.env.SECRET_KEY, (err, decoded) => {
            if (err) {
                console.error('Ошибка при расшифровке токена:', err);
                return next(api_errors_1.ApiError.Forbidden());
            }
            req.user = decoded;
            if (!roles.includes(req.user.role)) {
                return next(api_errors_1.ApiError.Forbidden());
            }
            next();
        });
    };
};
exports.authorizeRole = authorizeRole;
