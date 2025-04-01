"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApiError = void 0;
class ApiError extends Error {
    constructor(status, message, errors = []) {
        super(message);
        this.status = status;
        this.errors = errors;
    }
    static UnauthorizedError() {
        return new ApiError(401, 'Пользователь не авторизован');
    }
    static Forbidden() {
        return new ApiError(403, 'У пользователя нет прав');
    }
    static BadRequest(message, errors = []) {
        return new ApiError(400, message, errors);
    }
    static BadConnectToDB(errors = []) {
        return new ApiError(400, 'Ошибка связанная с базой данных', errors);
    }
    static NotFound(message, errors = []) {
        return new ApiError(404, message, errors);
    }
}
exports.ApiError = ApiError;
