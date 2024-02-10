
import { createAction, props } from '@ngrx/store';
import { User } from '../../interface/user.interface';
import { Auth } from '../../interface/auth.data';

const key = '[Auth]';

export const register = createAction(`${key} Register`, props<{ payload: User }>());
export const registerSuccess = createAction(`${key} Register Success`, props<{ payload: any }>());
export const registerFailed = createAction(`${key} Register Failed`, props<{ error: any }>());

export const login = createAction(`${key} Login`, props<{ email: string, password: string }>());
export const loginSuccess = createAction(`${key} Login Success`, props<{ payload: Auth }>());
export const loginFailed = createAction(`${key} Login Failed`, props<{ error: any }>());