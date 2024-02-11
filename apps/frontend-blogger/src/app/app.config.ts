import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { appRoutes } from './app.routes';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { provideStoreDevtools } from '@ngrx/store-devtools';

import { authReducer } from './ngrx/auth/auth.reducer';
import { AuthEffects } from './ngrx/auth/auth.effects';
import { HttpClientModule } from '@angular/common/http';
import { UserEffects, userReducer } from './ngrx/user';
import { PostEffects, postReducer } from './ngrx/post';

export const appConfig: ApplicationConfig = {
  providers: [
    importProvidersFrom(HttpClientModule),
    provideRouter(appRoutes),
    provideStore({ 
      auth: authReducer,
      user: userReducer,
      posts: postReducer,
    }),
    provideStoreDevtools({
      maxAge: 25,
      autoPause: true,
      trace: false
    }),
    provideEffects([AuthEffects, UserEffects, PostEffects]),
  ],
};
