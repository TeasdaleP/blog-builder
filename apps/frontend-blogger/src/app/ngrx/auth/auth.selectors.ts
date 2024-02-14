import { createFeatureSelector, createSelector } from "@ngrx/store";
import { Auth } from "../../interface/auth.data";

export const featureKey = 'auth';

export const selectAuthFeature = createFeatureSelector<Auth>(featureKey);

export const selectUserId = createSelector(selectAuthFeature, (state: Auth): string | undefined => state?.id);

export const selectUserToken = createSelector(selectAuthFeature, (state: Auth): string => state?.token)