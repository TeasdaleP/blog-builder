import { createFeatureSelector, createSelector } from "@ngrx/store";
import { Post } from "../../interface/post.data";

export const featureKey = 'posts';

export const selectPostFeature = createFeatureSelector<Post[]>(featureKey);

export const selectAllPosts = createSelector(selectPostFeature, (state: Post[]): Post[] => state);