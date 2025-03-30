import { createAsyncThunk } from "@reduxjs/toolkit";
import Cookies from "js-cookie"; // Используем библиотеку для работы с cookies
import AuthService from '../services/auth.service.ts';
import {ILoginData} from "../models/ILoginData.ts";
import {ISignUpData} from "../models/ISignUpData.ts";
import {IUser} from "../models/IUser.ts";
import UserService from "../services/user.service.ts";

interface UserState {
    isAuth: boolean;
    role: string;
    isLoading: boolean;
    users: IUser[];
}

const initialState: UserState = {
    isAuth: false,
    role: '',
    isLoading: false,
    users: []
};

export const login = createAsyncThunk(
    'user/login',
    async (payload: ILoginData, { rejectWithValue }) => {
        try {
            const response = await AuthService.login(payload);
            return { isAuth: true, role: response.data.role };
        } catch (error) {
            console.error('Ошибка входа', error);
            return rejectWithValue(error.message);
        }
    },
);

export const registration = createAsyncThunk(
    'user/registration',
    async (payload: ISignUpData, { rejectWithValue }) => {
        try {
            const response = await AuthService.registration(payload);
            return { isAuth: true, role: response.data.role };
        } catch (error) {
            console.error('Ошибка при регистрации', error);
            return rejectWithValue(error.message);
        }
    },
);

export const logout = createAsyncThunk(
    'user/logout',
    async (_, { rejectWithValue }) => {
        try {
            await AuthService.logout();
            return { isAuth: false, role: '', users: []};
        } catch (error) {
            console.error('Ошибка при выходе', error);
            return rejectWithValue(error.message);
        }
    },
);

export const checkAuth = createAsyncThunk(
    'user/checkAuth',
    async (_, { rejectWithValue }) => {
        try {
            const accessToken = Cookies.get("accessToken"); // Читаем токен из cookies
            if (!accessToken) {
                // localStorage.clear();
                return rejectWithValue("Токен отсутствует");
            }
            return { isAuth: true};
        } catch (error) {
            console.error('Ошибка проверки авторизации', error);
            return rejectWithValue(error.message);
        }
    },
);

export const getAllUsers = createAsyncThunk(
    'user/getAll',
    async (_, { rejectWithValue }) => {
        try {
            const response = await UserService.fetchUsers();
            return { users: response.data };
        } catch (error) {
            console.error('Ошибка при выходе', error);
            return rejectWithValue(error.message);
        }
    },
);

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case login.pending.type:
        case registration.pending.type:
        case logout.pending.type:
        case checkAuth.pending.type:
            return {
                ...state,
                isLoading: true,
            };
        case login.fulfilled.type:
        case registration.fulfilled.type:
        case logout.fulfilled.type:
            return {
                ...state,
                role: action.payload.role,
                isAuth: action.payload.isAuth,
                isLoading: false,
                users: action.payload.users,
            };
        case checkAuth.fulfilled.type:
            return {
                ...state,
                isAuth: action.payload.isAuth,
                isLoading: false,
            };
        case login.rejected.type:
        case registration.rejected.type:
        case logout.rejected.type:
            return {
                ...state,
                isLoading: false,
            };
        case checkAuth.rejected.type:
            return {
                ...state,
                role: '',
                isAuth: false,
                isLoading: false,
                users: [],
            };
        default:
            return state;
    }
};

export default userReducer;