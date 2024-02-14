import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { selectUserId } from '../../ngrx/auth/auth.selectors';
import { map } from 'rxjs';
import { Store } from '@ngrx/store';

export const authGuard: CanActivateFn = (activated, route) => {
  const store = inject(Store)
  const router = inject(Router)
  
  return store.select(selectUserId).pipe(map((id) => {
    if (id) {
      return true;
    } else {
      router.navigate(['login']);
      return false;
    }
  }));
};
