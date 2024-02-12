import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginComponent } from './login.component';
import { provideMockActions } from '@ngrx/effects/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { By } from '@angular/platform-browser';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let store: MockStore;
  let actions: Observable<any>;

  let login: any = {
    email: 'phil@teasdale.com',
    password: 'password'
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoginComponent],
      providers: [
        provideMockStore({}),
        provideMockActions(() => actions),
        { provide: ActivatedRoute, useValue: {} }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    store = TestBed.inject(MockStore);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should see the heading', () => {
    let title = fixture.debugElement.query(By.css('.login-heading')).nativeElement;
    expect(title.textContent).toBe('Log In');
  });

  it('should see a prompt to register', () => {
    let register = fixture.debugElement.query(By.css('.login-signup')).nativeElement;
    let button = fixture.debugElement.query(By.css('.button-inline')).nativeElement;

    expect(register.textContent).toContain('Not registered?');
    expect(button.textContent).toContain('Sign up');
  });

  describe('On Submit', () => {
    it('should not dispatch when the form is invalid', () => {
      const dispatch = jest.spyOn(store, 'dispatch');

      component.form.get('email')?.setValue(login.email);
      component.form.markAllAsTouched();

      fixture.detectChanges();
      component.onSubmit();

      let errors = fixture.debugElement.queryAll(By.css('.form-error'));

      expect(dispatch).not.toHaveBeenCalled();
      expect(errors[0].nativeElement.textContent).toBe('Your password is required');
    });

    it('should dispatch when the form is valid', () => {
      const dispatch = jest.spyOn(store, 'dispatch');

      component.form.get('email')?.setValue(login.email);
      component.form.get('password')?.setValue(login.password);
      component.form.markAllAsTouched();

      fixture.detectChanges();
      component.onSubmit();

      expect(dispatch).toHaveBeenCalledWith({ email: login.email, password: login.password, type: '[Auth] Login' });
    });
  });

  describe('Form Errors', () => {
    it('should see all fields with a required error when no value is entered', () => {
      let errorMessages = ['Your email is required', 'Your password is required']

      component.form.markAllAsTouched();
      fixture.detectChanges()

      let errors = fixture.debugElement.queryAll(By.css('.form-error'));

      errors.forEach((error, index) => {
        expect(error.nativeElement.textContent).toBe(errorMessages[index]);
      })
    });

    it('should see an email error when the email isnt valid', () => {
      const dispatch = jest.spyOn(store, 'dispatch');

      component.form.get('email')?.setValue('this is not an email');
      component.form.get('password')?.setValue(login.password)
      component.form.markAllAsTouched();

      fixture.detectChanges();
      component.onSubmit();

      let errors = fixture.debugElement.queryAll(By.css('.form-error'));

      expect(dispatch).not.toHaveBeenCalled();
      expect(errors[0].nativeElement.textContent).toBe('The email is invalid');
    })
  });
});
