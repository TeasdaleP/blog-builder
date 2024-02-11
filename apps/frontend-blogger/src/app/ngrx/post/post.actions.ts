import { createAction, props } from "@ngrx/store";
import { Post } from "../../interface/post.data";

const key = '[Posts]';

export const getAllPosts = createAction(`${key} Retrieve All`);
export const getAllPostsSuccess = createAction(`${key} Retrieve All Success`, props<{ payload: Post[] }>());
export const getAllPostsFailed = createAction(`${key} Retrieve All Failed`, props<{ error: any }>());

export const addPost = createAction(`${key} Add`, props<{ payload: Post }>());
export const addPostSuccess = createAction(`${key} Add Success`, props<{ payload: any }>());
export const addPostFailed = createAction(`${key} Add Failed`, props<{ error: any }>());

export const deletePost = createAction(`${key} Delete`, props<{ id: string}>());
export const deletePostSuccess = createAction(`${key} Delete Success`, props<{ payload: any }>());
export const deletePostFailed = createAction(`${key} Delete Failed`, props<{ error: any }>());