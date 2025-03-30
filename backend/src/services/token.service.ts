import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import {ITokenPayload} from "../interfaces/ITokenPayload";

dotenv.config();

class TokenService {
    generateToken(payload: ITokenPayload) {
        const secretKey = process.env.SECRET_KEY || "default_secret";
        const sessionDuration = process.env.SESSION_DURATION as string || "30m";

        // @ts-ignore
        return jwt.sign(payload, secretKey, {expiresIn: sessionDuration});
    }

    validateAccessToken(token: string) {
        try {
            return jwt.verify(token, process.env.SECRET_KEY!);
        } catch (e) {
            return null;
        }
    }
}

export default TokenService;