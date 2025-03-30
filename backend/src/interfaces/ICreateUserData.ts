export interface ICreateUserData {
    id: string;
    firstName: string;
    lastName: string;
    middleName?: string;
    login: string;
    password: string;
    role: string;
}