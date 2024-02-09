import { Route } from '@angular/router';

export const appRoutes: Route[] = [
    {
        path: '', redirectTo: 'list', pathMatch: 'full'
    },
    {
        path: 'list', loadComponent: () => import('./pages/list/list.component').then((x) => x.ListComponent)
    },
    {
        path: 'login', loadComponent: () => import('./pages/login/login.component').then((x) => x.LoginComponent)
    },
    {
        path: 'signup', loadComponent: () => import('./pages/signup/signup.component').then((x) => x.SignupComponent)
    },
    {
        path: 'details/:id', loadComponent: () => import('./pages/details/details.component').then((x) => x.DetailsComponent)
    },
    {
        path: '**', redirectTo: 'list', pathMatch: 'full'
    }
];
