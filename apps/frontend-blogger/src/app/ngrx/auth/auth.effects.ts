import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, exhaustMap, mergeMap, of } from "rxjs";
import { AuthService } from "../../services/auth.service";

import * as AuthAction from './auth.actions';
import * as UserAction from '../user/user.actions';

@Injectable()
export class AuthEffects {

    login$ = createEffect(() => this.actions$.pipe(
        ofType(AuthAction.login),
        exhaustMap((action) => this.authService.login$(action.email, action.password).pipe(
            mergeMap((response) => {
                return [
                    AuthAction.loginSuccess({ payload: response }),
                    UserAction.getUser({ id: response.id })
                ]
            }),
            catchError((error) => of(AuthAction.loginFailed(error)))
        ))
    ));

    constructor(private authService: AuthService, private actions$: Actions) {}
}