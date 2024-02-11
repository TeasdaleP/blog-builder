import { Route } from '@angular/router';
import { authGuard } from './guards/auth/auth.guard';
import { postsGuard } from './guards/posts/posts.guard';

export const appRoutes: Route[] = [
    {
        path: '', redirectTo: 'list', pathMatch: 'full'
    },
    {
        path: 'list',
        loadComponent: () => import('./pages/list/list.component').then((x) => x.ListComponent)
    },
    {
        path: 'login',
        loadComponent: () => import('./pages/login/login.component').then((x) => x.LoginComponent)
    },
    {
        path: 'signup',
        loadComponent: () => import('./pages/signup/signup.component').then((x) => x.SignupComponent)
    },
    {
        path: 'profile',
        loadComponent: () => import('./pages/profile/profile.component').then((x) => x.ProfileComponent),
        canActivate: [authGuard]
    },
    {
        path: 'details/:id',
        loadComponent: () => import('./pages/details/details.component').then((x) => x.DetailsComponent),
        canActivate: [postsGuard]
    },
    {
        path: '**', redirectTo: 'list', pathMatch: 'full'
    }
];
