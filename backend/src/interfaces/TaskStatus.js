"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaskStatus = void 0;
var TaskStatus;
(function (TaskStatus) {
    TaskStatus["TO_DO"] = "\u043A \u0432\u044B\u043F\u043E\u043B\u043D\u0435\u043D\u0438\u044E";
    TaskStatus["IN_PROGRESS"] = "\u0432\u044B\u043F\u043E\u043B\u043D\u044F\u0435\u0442\u0441\u044F";
    TaskStatus["COMPLETED"] = "\u0432\u044B\u043F\u043E\u043B\u043D\u0435\u043D\u0430";
    TaskStatus["CANCELLED"] = "\u043E\u0442\u043C\u0435\u043D\u0435\u043D\u0430";
})(TaskStatus || (exports.TaskStatus = TaskStatus = {}));
