import { Action, createReducer, on } from '@ngrx/store';
import { INITIAL_USER_STATE, User } from '../../interface/user.interface';

import * as UserActions from './user.actions';

export const userReducer = createReducer(
    INITIAL_USER_STATE,
    
    on(UserActions.registerSuccess, (state, action) => ({ ...state })),
    on(UserActions.getUserSuccess, (state, action) => ({ ...action.payload })),
    on(UserActions.changeAccountSuccess, (state, action) => ({ ...state, account: action.payload.account }))
)

export function reducer(state: User, action: Action) {
    return userReducer(state, action);
}