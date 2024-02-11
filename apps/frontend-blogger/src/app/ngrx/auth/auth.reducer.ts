import { Action, createReducer, on } from '@ngrx/store';
import { Auth, INITIAL_AUTH_STATE } from '../../interface/auth.data';

import * as AuthActions from './auth.actions';

export const authReducer = createReducer(
    INITIAL_AUTH_STATE,
    on(AuthActions.loginSuccess, (state, action) => ({ 
        id: action.payload.id,
        token: action.payload.token
    }))
)

export function reducer(state: Auth | undefined, action: Action) {
    return authReducer(state, action);
}