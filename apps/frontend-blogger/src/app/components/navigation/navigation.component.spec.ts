import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NavigationComponent } from './navigation.component';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { ActivatedRoute } from '@angular/router';
import { By } from '@angular/platform-browser';
import { of } from 'rxjs';
import { User } from '../../interface/user.interface';
import { Account } from '../../enums/account.enum';

describe('Navigation Component', () => {
  let component: NavigationComponent;
  let fixture: ComponentFixture<NavigationComponent>;
  let store: MockStore;

  const mockUser: User | undefined = {
    firstname: 'Phil',
    lastname: 'Teasdale',
    email: 'phil@teasdale.com',
    account: Account.User
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NavigationComponent],
      providers: [
        provideMockStore({}),
        { provide: ActivatedRoute, useValue: {} }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(NavigationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    store = TestBed.inject(MockStore);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should define default logged in and open booleans', () => {
    expect(component.loggedin).toBeFalsy();
    expect(component.open).toBeFalsy();
  });

  describe('Different Links', () => {
    it('should have home and login buttons when logged out', () => {
      const exepected = ['Home', 'Login', ]
      const links = fixture.debugElement.queryAll(By.css('.navigation-links'));
  
      links.forEach((link, index) => {
        expect(link.nativeElement.textContent).toBe(exepected[index]);
      });
    });

    it('should have home and profile buttons when logged in', () => {
      component.user$ = of(mockUser);
      component.loggedin = true;
      fixture.detectChanges();

      const exepected = ['Home', mockUser?.firstname]
      const links = fixture.debugElement.queryAll(By.css('.navigation-links'));
  
      links.forEach((link, index) => {
        expect(link.nativeElement.textContent).toBe(exepected[index]);
      });
    });
  });

  it('should show a profile image and firstname if logged in', () => {
    component.user$ = of(mockUser);
    component.loggedin = true;
    fixture.detectChanges();

    const links = fixture.debugElement.query(By.css('.navigation-profile')).nativeElement;
    const image = fixture.debugElement.query(By.css('.navigation-avatar')).nativeElement;
    
    expect(image.src).toContain('assets/logos/profile.png');
    expect(links.textContent).toContain(mockUser?.firstname);
  });
});
