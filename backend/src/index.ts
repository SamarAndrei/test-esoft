import 'dotenv/config'
import express from 'express';
import cookieParser from "cookie-parser"
import cors from 'cors';

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

try {
    app.listen(port, '0.0.0.0', () => {
        console.log(`Server listening at 0.0.0.0:${port}`);
    });
} catch (e) {
    console.log(e);
}