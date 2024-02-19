import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { selectAllPosts } from '../../ngrx/post';
import { Store } from '@ngrx/store';
import { map } from 'rxjs';

export const postsGuard: CanActivateFn = () => {
  const store = inject(Store)
  const router = inject(Router)
  
  return store.select(selectAllPosts).pipe(map((posts) => {
    if (posts.length > 0) {
      return true
    } else {
      router.navigate(['list']);
      return false
    }
  }));
};