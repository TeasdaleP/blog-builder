import { Action, createReducer, on } from '@ngrx/store';
import { INITIAL_POST_STATE, Post } from '../../interface/post.data';

import * as PostActions from './post.actions';

export const postReducer = createReducer(
    INITIAL_POST_STATE,
    on(PostActions.getAllPostsSuccess, (state, action) => (action.payload))
)

export function reducer(state: Post[], action: Action) {
    return postReducer(state, action);
}