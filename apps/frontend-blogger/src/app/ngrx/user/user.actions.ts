import { createAction, props } from '@ngrx/store';
import { User } from '../../interface/user.interface';
import { Account } from '../../enums/account.enum';

const key = '[User]';

export const register = createAction(`${key} Register`, props<{ payload: User }>());
export const registerSuccess = createAction(`${key} Register Success`, props<{ payload: any }>());
export const registerFailed = createAction(`${key} Register Failed`, props<{ error: any }>());

export const getUser = createAction(`${key} Get`, props<{ id: string | undefined }>());
export const getUserSuccess = createAction(`${key} Get Success`, props<{ payload: User }>());
export const getUserFailed = createAction(`${key} Get Failed`, props<{ error: any }>());

export const changeAccount = createAction(`${key} Change Account`, props<{ account: Account }>());
export const changeAccountSuccess = createAction(`${key} Change Account Success`, props<{ payload: User }>());
export const changeAccountFailed = createAction(`${key} Change Account Success`, props<{ error: any }>());

export const getAllUsers = createAction(`${key} Get All`);
export const getAllUsersSuccess = createAction(`${key} Get All Success`, props<{ payload: User[] }>());
export const getAllUserFailed = createAction(`${key} Get All Failed`, props<{ error: any }>());

export const deleteUser = createAction(`${key} Delete`, props<{ id: string }>());
export const deleteUserSuccess = createAction(`${key} Get All Success`, props<{ payload: any }>());
export const deleteUserFailed = createAction(`${key} Get All Failed`, props<{ error: any }>());