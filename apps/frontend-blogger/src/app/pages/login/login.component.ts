import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { BackwardsComponent } from '../../components/backwards/backwards.component';
import { NavigationComponent } from '../../components/navigation/navigation.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Actions, ofType } from '@ngrx/effects';
import { ReplaySubject, takeUntil } from 'rxjs';
import { Store } from '@ngrx/store';

import * as AuthActions from '../../ngrx/auth';

@Component({
  selector: 'blog-builder-login',
  standalone: true,
  imports: [CommonModule, NavigationComponent, FooterComponent, BackwardsComponent, FormsModule, ReactiveFormsModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent implements OnInit, OnDestroy {
  public form: FormGroup;

  private destroyed$ = new ReplaySubject<void>();

  constructor(private fb: FormBuilder, private store: Store, private actions: Actions, private router: Router) {
    this.form = this.formSetup();
  }

  ngOnInit(): void {
    this.actions.pipe(ofType(AuthActions.loginSuccess), takeUntil(this.destroyed$)).subscribe(() => {
      this.router.navigate(['profile']);
    });
  }

  ngOnDestroy() {
    this.destroyed$.next();
    this.destroyed$.complete();
  }

  public onSubmit(): void {
    if (this.form?.valid) {
      this.store.dispatch(AuthActions.login({ 
        email: this.form.get('email')?.value,
        password: this.form.get('password')?.value
      }));
      this.form.reset();
    }
  }

  private formSetup(): FormGroup { 
    return this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }
}
