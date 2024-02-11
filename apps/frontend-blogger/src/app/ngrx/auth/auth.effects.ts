import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, exhaustMap, map, of } from "rxjs";
import { AuthService } from "../../services/auth.service";

import * as AuthAction from './auth.actions';
import { Auth } from "../../interface/auth.data";

@Injectable()
export class AuthEffects {

    login$ = createEffect(() => this.actions$.pipe(
        ofType(AuthAction.login),
        exhaustMap((action) => this.authService.login$(action.email, action.password).pipe(
            map((result) => {
                let payload: Auth = {
                    token: result.response?.token,
                    id: result.response?.id
                }
                return AuthAction.loginSuccess({ payload: payload })
            }),
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