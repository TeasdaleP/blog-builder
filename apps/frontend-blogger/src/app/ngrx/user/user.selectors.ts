import { createFeatureSelector, createSelector } from "@ngrx/store";
import { User } from "../../interface/user.interface";

export const featureKey = 'user';

export const selectUserFeature = createFeatureSelector<User>(featureKey);

export const selectUser = createSelector(selectUserFeature, (state: User): User => state);