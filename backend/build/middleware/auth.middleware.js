"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticateJWT = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const api_errors_1 = require("../exceptions/api_errors");
require('dotenv').config();
const authenticateJWT = (req, res, next) => {
    const token = req.cookies.accessToken;
    if (token) {
        jsonwebtoken_1.default.verify(token, process.env.SECRET_KEY, (err, user) => {
            if (err) {
                return next(api_errors_1.ApiError.Forbidden());
            }
            req.user = user;
            next();
        });
    }
    else {
        return next(api_errors_1.ApiError.UnauthorizedError());
    }
};
exports.authenticateJWT = authenticateJWT;
