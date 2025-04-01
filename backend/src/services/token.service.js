"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
dotenv_1.default.config();
class TokenService {
    generateToken(payload) {
        const secretKey = process.env.SECRET_KEY || "default_secret";
        const sessionDuration = process.env.SESSION_DURATION || "30m";
        // @ts-ignore
        return jsonwebtoken_1.default.sign(payload, secretKey, { expiresIn: sessionDuration });
    }
    validateAccessToken(token) {
        try {
            return jsonwebtoken_1.default.verify(token, process.env.SECRET_KEY);
        }
        catch (e) {
            return null;
        }
    }
}
exports.default = TokenService;
