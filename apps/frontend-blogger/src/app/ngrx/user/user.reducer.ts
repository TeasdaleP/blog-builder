import { Action, createReducer, on } from '@ngrx/store';
import { User } from '../../interface/user.interface';

import * as UserActions from './user.actions';
import { Account } from '../../enums/account.enum';

export interface UserState {
    user: User;
    allUsers?: User[];
}

export const INITIAL_USER_STATE: UserState = {
    user: {
        id: '',
        firstname: '',
        lastname: '',
        email: '',
        account: Account.User 
    },
    allUsers: []
}

export const userReducer = createReducer(
    INITIAL_USER_STATE,
    
    on(UserActions.registerSuccess, (state) => ({ 
        ...state 
    })),
    on(UserActions.getUserSuccess, (state, action) => ({ 
        ...state,
        user: action.payload
    })),
    on(UserActions.changeAccountSuccess, (state, action) => ({ 
        ...state, 
        user: {
            ...state.user,
            account: action.payload.account
        }
    })),
    on(UserActions.getAllUsersSuccess, (state, action) => ({ 
        ...state,
        allUsers: action.payload
    })),
)

export function reducer(state: UserState, action: Action) {
    return userReducer(state, action);
}