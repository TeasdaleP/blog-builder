import { createFeatureSelector, createSelector } from "@ngrx/store";
import { User } from "../../interface/user.interface";
import { UserState } from "./user.reducer";

export const featureKey = 'user';

export const selectUserFeature = createFeatureSelector<UserState>(featureKey);

export const selectUser = createSelector(selectUserFeature, (state: UserState): User => state.user);

export const selectAllUsers = createSelector(selectUserFeature, (state: UserState): User[] | undefined => state.allUsers);
