export interface IUser {
    id: string; // uuid
    firstName: string;
    lastName: string;
    middleName?: string;
    login: string;
    password: string;
    role: string;
}