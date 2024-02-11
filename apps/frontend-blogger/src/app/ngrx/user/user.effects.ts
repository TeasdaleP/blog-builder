import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, exhaustMap, map, of } from "rxjs";
import { UserService } from "../../services/user.service";

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

    constructor(private userService: UserService, private actions$: Actions) {}
}