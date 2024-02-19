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
import { NavigationComponent } from '../../components/navigation/navigation.component';
import { FooterComponent } from '../../components/footer/footer.component';

import * as UserActions from '../../ngrx/user';

@Component({
  selector: 'blog-builder-signup',
  standalone: true,
  imports: [CommonModule, NavigationComponent, FooterComponent, BackwardsComponent, FormsModule, ReactiveFormsModule, RouterModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss',
})
export class SignupComponent implements OnInit {
  public form: FormGroup;

  private destroyed$ = new ReplaySubject<void>();
  
  constructor(private fb: FormBuilder, private store: Store, private actions: Actions, private router: Router) {
    this.form = this.formSetup()
  }

  ngOnInit(): void {
    this.actions.pipe(ofType(UserActions.registerSuccess), takeUntil(this.destroyed$)).subscribe(() => {
      this.router.navigate(['login']);
    });
  }

  public onSubmit(): void {
    if (this.form?.valid) {
      const newUser: User = this.userPayload();
      this.store.dispatch(UserActions.register({ payload: newUser }));
    }
    this.form.reset();
  }

  private userPayload(): User {
    return {
      firstname: this.form.get('firstname')?.value,
      lastname: this.form.get('lastname')?.value,
      email: this.form.get('email')?.value,
      password: this.form.get('password')?.value,
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
