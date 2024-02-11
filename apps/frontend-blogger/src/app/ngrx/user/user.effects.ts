import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, exhaustMap, map, mergeMap, of, switchMap, withLatestFrom } from "rxjs";
import { UserService } from "../../services/user.service";
import { Store } from "@ngrx/store";
import { selectUser } from "./user.selectors";
import { User } from "../../interface/user.interface";

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

    getUser$ = createEffect(() => this.actions$.pipe(
        ofType(UserAction.getUser),
        exhaustMap((action) => this.userService.getUser$(action.id).pipe(
            map((payload) => UserAction.getUserSuccess({ payload: payload })),
            catchError((error) => of(UserAction.getUserFailed(error)))
        ))
    ));

    getAllUser$ = createEffect(() => this.actions$.pipe(
        ofType(UserAction.getAllUsers),
        exhaustMap(() => this.userService.getAllUser$().pipe(
            map((payload) => UserAction.getAllUsersSuccess({ payload: payload })),
            catchError((error) => of(UserAction.getAllUserFailed(error)))
        ))
    ));

    updateUser$ = createEffect(() => this.actions$.pipe(
         ofType(UserAction.changeAccount),
         withLatestFrom(this.store.select(selectUser)),
         switchMap(([action, state]) => {
            const payload: User = {
                id: state.id,
                firstname: state.firstname,
                lastname: state.lastname,
                email: state.email,
                account: action.account
            }
            return this.userService.updateUser$(state.id, payload).pipe(
                map((payload) => UserAction.changeAccountSuccess({ payload: payload })),
                catchError((error) => of(UserAction.changeAccountFailed(error)))
            )
         })
    ));

    deleteUser$ = createEffect(() => this.actions$.pipe(
        ofType(UserAction.deleteUser),
        exhaustMap((action) => this.userService.deleteUsers$(action.id).pipe(
            mergeMap((response) => {
                return [
                    UserAction.deleteUserSuccess({ payload: response }),
                    UserAction.getAllUsers()
                ]
            }),
            catchError((error) => of(UserAction.deleteUserFailed(error)))
        ))
    ));

    constructor(private userService: UserService, private actions$: Actions, private store: Store) {}
}