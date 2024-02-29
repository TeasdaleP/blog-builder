import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Store } from '@ngrx/store';
import { selectUserId } from '../../ngrx/auth';
import { Observable, ReplaySubject, takeUntil } from 'rxjs';
import { User } from '../../interface/user.interface';
import { selectUser } from '../../ngrx/user';

@Component({
  selector: 'blog-builder-navigation',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './navigation.component.html',
  styleUrl: './navigation.component.scss',
})
export class NavigationComponent implements OnInit, OnDestroy {
  public loggedin = false;
  public name!: string;
  public open = false;

  public id$: Observable<string | undefined>;
  public user$: Observable<User | undefined>;

  private destroyed$ = new ReplaySubject<void>();
  
  constructor(private store: Store){
    this.id$ = this.store.select(selectUserId).pipe(takeUntil(this.destroyed$));
    this.user$ = this.store.select(selectUser).pipe(takeUntil(this.destroyed$));
  }

  ngOnInit(): void {
    this.id$.subscribe((id) => this.loggedin = id ? true : false);
  }

  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }

  public toggleNavigation() {
    this.open = !this.open;
  }
}
