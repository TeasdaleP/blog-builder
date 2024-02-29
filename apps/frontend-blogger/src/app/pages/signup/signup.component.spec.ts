import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SignupComponent } from './signup.component';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { By } from '@angular/platform-browser';
import { User } from '../../interface/user.interface';
import { Account } from '../../enums/account.enum';

describe('SignupComponent', () => {
  let component: SignupComponent;
  let fixture: ComponentFixture<SignupComponent>;
  let store: MockStore;
  let actions: Observable<any>;

  const user: User = {
    firstname: 'phil',
    lastname: 'teasdale',
    email: 'phil@teasdale.com',
    password: 'password',
    account: Account.User
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SignupComponent],
      providers: [
        provideMockStore({}),
        provideMockActions(() => actions),
        { provide: ActivatedRoute, useValue: {} }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(SignupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    store = TestBed.inject(MockStore);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have a specific title and subtitle', () => {
    const title = fixture.debugElement.query(By.css('.signup-heading')).nativeElement;
    const subheading = fixture.debugElement.query(By.css('.signup-content')).nativeElement;

    expect(title.textContent).toBe('Sign up');
    expect(subheading.textContent).toContain('Join the blog so you can leave comments and like photos');
  });

  describe('On Submit', () => {
    it('should not dispatch when the form is invalid', () => {
      const dispatch = jest.spyOn(store, 'dispatch');

      component.form.get('firstname')?.setValue(user.firstname);
      component.form.get('lastname')?.setValue(user.lastname);
      component.form.get('email')?.setValue(user.email);
      component.form.markAllAsTouched();

      fixture.detectChanges();
      component.onSubmit();

      const errors = fixture.debugElement.queryAll(By.css('.form-error'));

      expect(dispatch).not.toHaveBeenCalled();
      expect(errors[0].nativeElement.textContent).toBe('Your password is required');
    });

    it('should dispatch when the form is valid', () => {
      const dispatch = jest.spyOn(store, 'dispatch');

      component.form.get('firstname')?.setValue(user.firstname);
      component.form.get('lastname')?.setValue(user.lastname);
      component.form.get('email')?.setValue(user.email);
      component.form.get('password')?.setValue(user.password);
      component.form.markAllAsTouched();

      fixture.detectChanges();
      component.onSubmit();

      expect(dispatch).toHaveBeenCalledWith({ payload: user, type: '[User] Register' });
    });
  });

  describe('Form Errors', () => {
    it('should see all fields with a required error when no value is entered', () => {
      const errorMessages = [
        'Your name is required', 'Your name is required',
        'Your email is required', 'Your password is required'
      ]

      component.form.markAllAsTouched();
      fixture.detectChanges()

      const errors = fixture.debugElement.queryAll(By.css('.form-error'));

      errors.forEach((error, index) => {
        expect(error.nativeElement.textContent).toBe(errorMessages[index]);
      });
    });

    it('should see an email error when the email isnt valid', () => {
      component.form.get('firstname')?.setValue(user.firstname);
      component.form.get('lastname')?.setValue(user.lastname);
      component.form.get('email')?.setValue('this is not an email');
      component.form.get('password')?.setValue(user.password);
      component.form.markAllAsTouched();

      fixture.detectChanges();

      const errors = fixture.debugElement.queryAll(By.css('.form-error'));
      expect(errors[0].nativeElement.textContent).toBe('The email is invalid');
    });
  })
});
