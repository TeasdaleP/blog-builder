import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, exhaustMap, map, of } from "rxjs";
import { AuthService } from "../../services/auth.service";

import * as AuthAction from './auth.actions';

@Injectable()
export class AuthEffects {

    login$ = createEffect(() => this.actions$.pipe(
        ofType(AuthAction.login),
        exhaustMap((action) => this.authService.login$(action.email, action.password).pipe(
            map((payload) => AuthAction.loginSuccess({ payload: payload })),
            catchError((error) => of(AuthAction.loginFailed(error)))
        ))
    ));

    register$ = createEffect(() => this.actions$.pipe(
        ofType(AuthAction.register),
        exhaustMap((action) => this.authService.register$(action.payload).pipe(
            map((payload) => AuthAction.registerSuccess({ payload: payload })),
            catchError((error) => of(AuthAction.registerFailed(error)))
        ))
    ));

    constructor(private authService: AuthService, private actions$: Actions) {}
}