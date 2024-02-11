import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BackwardsComponent } from '../../components/backwards/backwards.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { NavigationComponent } from '../../components/navigation/navigation.component';
import { Observable, ReplaySubject, takeUntil } from 'rxjs';
import { Store } from '@ngrx/store';
import { selectUser } from '../../ngrx/user';
import { User } from '../../interface/user.interface';
import { Account } from '../../enums/account.enum';

@Component({
  selector: 'blog-builder-profile',
  standalone: true,
  imports: [CommonModule, NavigationComponent, FooterComponent, BackwardsComponent],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss',
})
export class ProfileComponent implements OnInit, OnDestroy {
  public user$: Observable<User | undefined>;
  public Account = Account; 

  private destroyed$: ReplaySubject<void> = new ReplaySubject();
  
  constructor(private store: Store) {
    this.user$ = this.store.select(selectUser).pipe(takeUntil(this.destroyed$));
  }

  ngOnInit(): void {
      
  }

  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }

  public changeAccount(value: string): void {
    console.log(value);
  }
}
