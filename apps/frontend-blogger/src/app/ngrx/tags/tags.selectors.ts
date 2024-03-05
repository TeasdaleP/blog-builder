import { createFeatureSelector, createSelector } from "@ngrx/store";
import { Tag } from "../../interface/tag.data";

export const featureKey = 'tags';

export const selectTagFeature = createFeatureSelector<Tag[]>(featureKey);

export const selectAllTags = createSelector(selectTagFeature, (state: Tag[]): Tag[] => state);