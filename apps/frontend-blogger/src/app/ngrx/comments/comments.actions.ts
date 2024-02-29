import { createAction, props } from "@ngrx/store";
import { Comment } from "../../interface/comment.data";

const key = '[Comments]';

export const getComments = createAction(`${key} Get`, props<{ postId: string }>());
export const getCommentsSuccess = createAction(`${key} Get Successfully`, props<{ payload: Comment[] }>());
export const getCommentsFailed = createAction(`${key} Get Failed`, props<{ error: any }>());

export const addComment = createAction(`${key} Add`, props<{ comment: string, postId: string }>());
export const addCommentSuccess = createAction(`${key} Add Successfully`, props<{ payload: Comment }>());
export const addCommentFailed = createAction(`${key} Add Failed`, props<{ error: any }>());