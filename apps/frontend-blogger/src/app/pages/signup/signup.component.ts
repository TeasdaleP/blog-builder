import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BackwardsComponent } from '../../components/backwards/backwards.component';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { Store } from '@ngrx/store';
import { Actions, ofType } from '@ngrx/effects';
import { ReplaySubject, takeUntil } from 'rxjs';
import { User } from '../../interface/user.interface';
import { Account } from '../../enums/account.enum';

import * as AuthActions from '../../ngrx/auth';

@Component({
  selector: 'blog-builder-signup',
  standalone: true,
  imports: [CommonModule, BackwardsComponent, FormsModule, ReactiveFormsModule, RouterModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss',
})
export class SignupComponent implements OnInit {
  public form: FormGroup;

  private destroyed$: ReplaySubject<void> = new ReplaySubject();
  
  constructor(private fb: FormBuilder, private store: Store, private actions: Actions, private router: Router) {
    this.form = this.formSetup()
  }

  ngOnInit(): void {
    this.actions.pipe(ofType(AuthActions.registerSuccess), takeUntil(this.destroyed$)).subscribe(() => {
      this.router.navigate(['login']);
    });
  }

  public onSubmit(): void {
    if (this.form?.valid) {
      const newUser: User = this.userPayload();
      this.store.dispatch(AuthActions.register({ payload: newUser }));
    }
    this.form.reset();
  }

  private userPayload(): User {
    return {
      firstname: this.form.get('firstname')?.value,
      lastname: this.form.get('lastname')?.value,
      email: this.form.get('email')?.value,
      password: this.form.get('firstname')?.value,
      account: Account.User,
    }
  }

  private formSetup(): FormGroup { 
    return this.fb.group({
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }
}
