export interface ICreateUserData {
    id: string; // uuid
    firstName: string;
    lastName: string;
    middleName?: string;
    login: string;
    password: string;
    role: string;
}