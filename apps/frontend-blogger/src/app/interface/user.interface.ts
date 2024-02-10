import { Account } from "../enums/account.enum";

export interface User {
    firstname: string;
    lastname: string;
    email: string;
    password?: string;
    account: Account;
}

export const MOCK_USER : User = {
    firstname: '',
    lastname: '',
    email: '',
    password: '',
    account: Account.User
}