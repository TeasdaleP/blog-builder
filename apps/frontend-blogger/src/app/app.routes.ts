import { Route } from '@angular/router';

export const appRoutes: Route[] = [
    {
        path: '', redirectTo: 'list', pathMatch: 'full'
    },
    {
        path: 'list', loadComponent: () => import('./pages/list/list.component').then((x) => x.ListComponent)
    }
];
