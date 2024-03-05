import { Action, createReducer, on } from '@ngrx/store';
import { INITIAL_TAG_STATE, Tag } from '../../interface/tag.data';

import * as TagActions from './tags.actions';

export const tagsReducer = createReducer(
    INITIAL_TAG_STATE,
    on(TagActions.getAllTagsSuccess, (state, action) => (action.payload))
)

export function reducer(state: Tag[], action: Action) {
    return tagsReducer(state, action);
}