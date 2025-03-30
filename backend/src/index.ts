import 'dotenv/config'
import express from 'express';
import cookieParser from "cookie-parser"
import cors from 'cors';

import UserModel from "./reposio/user.dal";
import UserService from "./services/user.service";
import TokenService from "./services/token.service";
import UserController from "./controllers/user.controller";
import userRoutes from "./routes/user.route";

import TaskModel from "./reposio/task.dal";
import TaskService from "./services/task.service";
import TaskController from "./controllers/task.controller";
import taskRoutes from "./routes/task.route";


const app = express();

const port = Number(process.env.API_PORT) || 3000;

app.use(
    cors({
        credentials: true,
        origin: process.env.CLIENT_URL,
    }),
);
app.use(cookieParser());
app.use(express.json());

const userService = new UserService(new UserModel(), new TokenService());
const userController = new UserController(userService);
app.use('/api', userRoutes(userController));

const taskService = new TaskService(new TaskModel());
const taskController = new TaskController(taskService);
app.use('/api', taskRoutes(taskController));


try {
    app.listen(port, '0.0.0.0', () => {
        console.log(`Server listening at 0.0.0.0:${port}`);
    });
} catch (e) {
    console.log(e);
}