"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const express_1 = __importDefault(require("express"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const cors_1 = __importDefault(require("cors"));
const user_dal_1 = __importDefault(require("./reposio/user.dal"));
const user_service_1 = __importDefault(require("./services/user.service"));
const token_service_1 = __importDefault(require("./services/token.service"));
const user_controller_1 = __importDefault(require("./controllers/user.controller"));
const user_route_1 = __importDefault(require("./routes/user.route"));
const task_dal_1 = __importDefault(require("./reposio/task.dal"));
const task_service_1 = __importDefault(require("./services/task.service"));
const task_controller_1 = __importDefault(require("./controllers/task.controller"));
const task_route_1 = __importDefault(require("./routes/task.route"));
const app = (0, express_1.default)();
const port = Number(process.env.API_PORT) || 3000;
app.use((0, cors_1.default)({
    credentials: true,
    origin: 'https://test-esoft-front.onrender.com/',
}));
app.use((0, cookie_parser_1.default)());
app.use(express_1.default.json());
const userService = new user_service_1.default(new user_dal_1.default(), new token_service_1.default());
const userController = new user_controller_1.default(userService);
app.use('/api', (0, user_route_1.default)(userController));
const taskService = new task_service_1.default(new task_dal_1.default());
const taskController = new task_controller_1.default(taskService);
app.use('/api', (0, task_route_1.default)(taskController));
try {
    app.listen(port, '0.0.0.0', () => {
        console.log(`Server listening at 0.0.0.0:${port}`);
    });
}
catch (e) {
    console.log(e);
}
