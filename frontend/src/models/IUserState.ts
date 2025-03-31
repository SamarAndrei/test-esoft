import {IUser} from "./IUser.ts";

export interface UserState {
    isAuth: boolean;
    role: string;
    isLoading: boolean;
    validToken: boolean
    users: IUser[];
}