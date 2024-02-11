import { createAction, props } from '@ngrx/store';
import { User } from '../../interface/user.interface';

const key = '[User]';

export const register = createAction(`${key} Register`, props<{ payload: User }>());
export const registerSuccess = createAction(`${key} Register Success`, props<{ payload: any }>());
export const registerFailed = createAction(`${key} Register Failed`, props<{ error: any }>());

export const getUser = createAction(`${key} Get`, props<{ id: string | undefined }>());
export const getUserSuccess = createAction(`${key} Get Success`, props<{ payload: User }>());
export const getUserFailed = createAction(`${key} Get Failed`, props<{ error: any }>());