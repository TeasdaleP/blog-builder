import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BackwardsComponent } from '../../components/backwards/backwards.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { NavigationComponent } from '../../components/navigation/navigation.component';
import { Observable, ReplaySubject, takeUntil } from 'rxjs';
import { Store } from '@ngrx/store';
import { changeAccount, deleteUser, getAllUsers, selectAllUsers, selectUser } from '../../ngrx/user';
import { User } from '../../interface/user.interface';
import { Account } from '../../enums/account.enum';
import { deletePost, selectAllPosts } from '../../ngrx/post';
import { Post } from '../../interface/post.data';

@Component({
  selector: 'blog-builder-profile',
  standalone: true,
  imports: [CommonModule, NavigationComponent, FooterComponent, BackwardsComponent],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss',
})
export class ProfileComponent implements OnInit, OnDestroy {
  public user$: Observable<User | undefined>;
  public allUsers$: Observable<User[] | undefined>;
  public posts$: Observable<Post[]>;
  public Account = Account; 

  private destroyed$: ReplaySubject<void> = new ReplaySubject();
  
  constructor(private store: Store) {
    this.user$ = this.store.select(selectUser).pipe(takeUntil(this.destroyed$));
    this.posts$ = this.store.select(selectAllPosts).pipe(takeUntil(this.destroyed$));
    this.allUsers$ = this.store.select(selectAllUsers).pipe(takeUntil(this.destroyed$));
  }

  ngOnInit(): void {
      this.store.dispatch(getAllUsers());
  }

  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }

  public changeAccount(value: string): void {
    this.store.dispatch(changeAccount({ account: value as Account }));
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
