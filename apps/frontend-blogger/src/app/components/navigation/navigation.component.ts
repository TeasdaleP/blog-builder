import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Store } from '@ngrx/store';
import { selectUserId } from '../../ngrx/auth';
import { Observable, ReplaySubject, map, takeUntil } from 'rxjs';
import { User } from '../../interface/user.interface';

@Component({
  selector: 'blog-builder-navigation',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './navigation.component.html',
  styleUrl: './navigation.component.scss',
})
export class NavigationComponent implements OnInit {
  public loggedin: boolean = false;
  public name!: string;
  public open: boolean = false;

  public id$: Observable<string | undefined>;
  // public user$: Observable<User | undefined>;

  private destroyed$: ReplaySubject<void> = new ReplaySubject();
  
  constructor(private store: Store){
    this.id$ = this.store.select(selectUserId).pipe(takeUntil(this.destroyed$));
    // this.user$ = this.store.select(selectUser).pipe(takeUntil(this.destroyed$));
  }

  ngOnInit(): void {
    this.id$.subscribe((id) => {
      this.loggedin = id ? true : false;
      // this.store.dispatch(User.getUser({ id: id }));
    });
  }

  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }

  public toggleNavigation() {
    this.open = !this.open;
  }
}
