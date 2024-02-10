import { createFeatureSelector, createSelector } from "@ngrx/store";
import { Auth } from "../../interface/auth.data";

export const featureKey = 'auth';

export const selectFeature = createFeatureSelector<Auth>(featureKey);

export const selectUserId = createSelector(selectFeature, (state: Auth): string => state.id);