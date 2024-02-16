
import { Action, createReducer, on } from '@ngrx/store';
import { INITIAL_COMMENT_STATE } from '../../interface/comment.data';

import * as CommentAction from './comments.actions';

export const commentReducer = createReducer(
    INITIAL_COMMENT_STATE,
    on(CommentAction.getCommentsSuccess, (state, action) => (action.payload))
)

export function reducer(state: Comment[], action: Action) {
    return commentReducer(state, action);
}