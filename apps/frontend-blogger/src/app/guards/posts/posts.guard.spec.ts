import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';
import { postsGuard } from './posts.guard';

describe('postsGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => postsGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});