import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BackwardsComponent } from '../../components/backwards/backwards.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { NavigationComponent } from '../../components/navigation/navigation.component';
import { Observable, ReplaySubject, takeUntil } from 'rxjs';
import { Store } from '@ngrx/store';
import { changeAccount, deleteUser, selectAllUsers, selectUser } from '../../ngrx/user';
import { User } from '../../interface/user.interface';
import { Account } from '../../enums/account.enum';
import { addPost, deletePost, selectAllPosts } from '../../ngrx/post';
import { Post } from '../../interface/post.data';
import { AddPostComponent } from '../../components/add-post/add-post.component';
import { Actions, ofType } from '@ngrx/effects';

import * as PostActions from '../../ngrx/post';

@Component({
  selector: 'blog-builder-profile',
  standalone: true,
  imports: [CommonModule, NavigationComponent, FooterComponent, BackwardsComponent, AddPostComponent],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss',
})
export class ProfileComponent implements OnInit, OnDestroy {
  public user$: Observable<User | undefined>;
  public allUsers$: Observable<User[] | undefined>;
  public posts$: Observable<Post[]>;
  public Account = Account;
  public postSuccess = false;

  private destroyed$ = new ReplaySubject<void>();

  constructor(private store: Store, private actions: Actions) {
    this.user$ = this.store.select(selectUser).pipe(takeUntil(this.destroyed$));
    this.posts$ = this.store.select(selectAllPosts).pipe(takeUntil(this.destroyed$));
    this.allUsers$ = this.store.select(selectAllUsers).pipe(takeUntil(this.destroyed$));
  }

  ngOnInit(): void {
    this.actions.pipe(ofType(PostActions.addPostSuccess), takeUntil(this.destroyed$)).subscribe(() => {
      this.postSuccess = true;
      setTimeout(() => { this.postSuccess = false }, 3000);
    });
  }

  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }

  public changeAccount(value: string): void {
    this.store.dispatch(changeAccount({ account: value as Account }));
  }

  public addPost(post: Post): void {
    this.store.dispatch(addPost({ payload: post }));
  }

  public deletePost(id: string | undefined): void {
    if (typeof id === 'string') {
      this.store.dispatch(deletePost({ id: id }));
    }
  }

  public deleteUser(id: string | undefined): void {
    if (typeof id === 'string') {
      this.store.dispatch(deleteUser({ id: id }));
    }
  }
}
