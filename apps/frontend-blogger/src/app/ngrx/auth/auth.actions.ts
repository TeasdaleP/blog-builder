
import { createAction, props } from '@ngrx/store';
import { Auth } from '../../interface/auth.data';

const key = '[Auth]';

export const login = createAction(`${key} Login`, props<{ email: string, password: string }>());
export const loginSuccess = createAction(`${key} Login Success`, props<{ payload: Auth }>());
export const loginFailed = createAction(`${key} Login Failed`, props<{ error: any }>());