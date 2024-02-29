import { createFeatureSelector, createSelector } from "@ngrx/store";
import { Comment } from "../../interface/comment.data";

export const featureKey = 'comments';

export const selectCommentsFeature = createFeatureSelector<Comment[]>(featureKey);

export const selectComments = createSelector(selectCommentsFeature, (state: Comment[]): Comment[] => state);