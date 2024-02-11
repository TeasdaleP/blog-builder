import { Account } from "../enums/account.enum";

export interface User {
    id?: string;
    firstname: string;
    lastname: string;
    email: string;
    password?: string;
    account?: Account;
}

export const MOCK_USER: User = {
    id: '',
    firstname: '',
    lastname: '',
    email: '',
    account: Account.User
}

export const INITIAL_USER_STATE: User = {
    id: '',
    firstname: '',
    lastname: '',
    email: '',
    account: Account.User
}