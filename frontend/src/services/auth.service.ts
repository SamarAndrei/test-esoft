import $api from '../http';
import { AxiosResponse } from 'axios';
import { AuthResponse } from '../models/response/AuthResponse.ts';
import {ISignUpData} from "../models/ISignUpData.ts";
import {ILoginData} from "../models/ILoginData.ts";

export default class AuthService {
    static async login(loginData: ILoginData
    ): Promise<AxiosResponse<AuthResponse>> {
        return $api.post<AuthResponse>('/login', loginData);
    }

    static async registration(signUpData: ISignUpData
    ): Promise<AxiosResponse<AuthResponse>> {
        return $api.post<AuthResponse>('/registration', signUpData);
    }

    static async logout(): Promise<void> {
        return $api.post('/logout');
    }
}