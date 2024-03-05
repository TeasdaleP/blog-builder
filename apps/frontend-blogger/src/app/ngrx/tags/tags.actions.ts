import { createAction, props } from "@ngrx/store";
import { Tag } from "../../interface/tag.data";

const key = '[Tags]';

export const getAllTags = createAction(`${key} Retrieve All`);
export const getAllTagsSuccess = createAction(`${key} Retrieve All Success`, props<{ payload: Tag[] }>());
export const getAllTagsFailed = createAction(`${key} Retrieve All Failed`, props<{ error: any }>());

export const addTag = createAction(`${key} Add`, props<{ payload: Tag }>());
export const addTagSuccess = createAction(`${key} Add Success`, props<{ payload: any }>());
export const addTagFailed = createAction(`${key} Add Failed`, props<{ error: any }>());
