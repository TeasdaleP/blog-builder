import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, combineLatest, exhaustMap, map, mergeMap, of, switchMap, withLatestFrom } from "rxjs";
import { UserService } from "../../services/user.service";
import { Store } from "@ngrx/store";
import { selectUser } from "./user.selectors";
import { User } from "../../interface/user.interface";
import { selectUserToken } from "../auth";

import * as UserAction from './user.actions';

@Injectable()
export class UserEffects {

    register$ = createEffect(() => this.actions$.pipe(
        ofType(UserAction.register),
        exhaustMap((action) => this.userService.register$(action.payload).pipe(
            map((payload) => UserAction.registerSuccess({ payload: payload })),
            catchError((error) => of(UserAction.registerFailed(error)))
        ))
    ));

    /** Requires Auth Token */
    getUser$ = createEffect(() => this.actions$.pipe(
        ofType(UserAction.getUser),
        withLatestFrom(this.store.select(selectUserToken)),
        switchMap(([action, state]) => this.userService.getUser$(action.id, state).pipe(
            map((payload) => UserAction.getUserSuccess({ payload: payload })),
            catchError((error) => of(UserAction.getUserFailed(error)))
        ))
    ));
    
    /** Requires Auth Token */
    getAllUser$ = createEffect(() => this.actions$.pipe(
        ofType(UserAction.getAllUsers),
        withLatestFrom(this.store.select(selectUserToken)),
        switchMap(([action, state]) => this.userService.getAllUser$(state).pipe(
            map((payload) => UserAction.getAllUsersSuccess({ payload: payload })),
            catchError((error) => of(UserAction.getAllUserFailed(error)))
        ))
    ));

    /** Requires Auth Token */
    updateUser$ = createEffect(() => this.actions$.pipe(
         ofType(UserAction.changeAccount),
         withLatestFrom(combineLatest([this.store.select(selectUser), this.store.select(selectUserToken)])),
         switchMap(([action, state]) => {
            console.log(state);
            const payload: User = {
                id: state[0].id,
                firstname: state[0].firstname,
                lastname: state[0].lastname,
                email: state[0].email,
                account: action.account
            }
            return this.userService.updateUser$(state[0].id, payload, state[1]).pipe(
                map((payload) => UserAction.changeAccountSuccess({ payload: payload })),
                catchError((error) => of(UserAction.changeAccountFailed(error)))
            )
         })
    ));

    /** Requires Auth Token */
    deleteUser$ = createEffect(() => this.actions$.pipe(
        ofType(UserAction.deleteUser),
        withLatestFrom(this.store.select(selectUserToken)),
        switchMap(([action, state]) => this.userService.deleteUsers$(action.id, state).pipe(
            mergeMap((response) => {
                return [
                    UserAction.deleteUserSuccess({ payload: response }),
                    UserAction.getAllUsers()
                ]
            }),
            catchError((error) => of(UserAction.deleteUserFailed(error)))
        ))
    ));

    constructor(private userService: UserService, private actions$: Actions, private store: Store) {

    }
}