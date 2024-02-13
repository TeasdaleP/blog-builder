import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProfileComponent } from './profile.component';
import { ActivatedRoute } from '@angular/router';
import { provideMockActions } from '@ngrx/effects/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { Observable, of } from 'rxjs';
import { User } from '../../interface/user.interface';
import { Account } from '../../enums/account.enum';
import { By } from '@angular/platform-browser';
import { Post } from '../../interface/post.data';

describe('Profile Component', () => {
  let component: ProfileComponent;
  let fixture: ComponentFixture<ProfileComponent>;
  let store: MockStore;
  let actions: Observable<any>;

  let user: User = {
    firstname: 'phil',
    lastname: 'teasdale',
    email: 'phil@teasdale.com',
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProfileComponent],
      providers: [
        provideMockStore({}),
        provideMockActions(() => actions),
        { provide: ActivatedRoute, useValue: {} }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    store = TestBed.inject(MockStore);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have a name, email and account type in the heading', () => {
    component.user$ = of({ ...user, account: Account.User });
    fixture.detectChanges();

    let expected = [user.email, 'User'];

    let title = fixture.debugElement.query(By.css('.profile-content-heading')).nativeElement;
    let subheadings = fixture.debugElement.queryAll(By.css('.profile-subheading'));

    expect(title.textContent).toContain('Phil Teasdale');
    subheadings.forEach((subheading, index) => {
      expect(subheading.nativeElement.textContent).toContain(expected[index]);
    }); 
  });

  it('should be able to change the account type', () => {
    const dispatch = jest.spyOn(store, 'dispatch');

    component.user$ = of({ ...user, account: Account.User });
    fixture.detectChanges();

    let label = fixture.debugElement.query(By.css('.form-select-label')).nativeElement;
    expect(label.textContent).toBe('Change Account Type');

    let dropdown: HTMLSelectElement = fixture.debugElement.query(By.css('select')).nativeElement;
    expect(dropdown.options[1].value).toBe('BLOGGER');
    expect(dropdown.options[2].value).toBe('ADMIN');
    dropdown.value = dropdown.options[2].value;
    dropdown.dispatchEvent(new Event('change'));
    fixture.detectChanges();

    expect(dispatch).toHaveBeenCalledWith({ account: 'ADMIN', type: '[User] Change Account' });
  });

  describe('Posts', () => {
    it('should be able to see the post list with the right permissions', () => {
      component.user$ = of({ ...user, account: Account.Blogger });
      fixture.detectChanges();

      let headings = fixture.debugElement.queryAll(By.css('.profile-content-heading'));
      expect(headings[2].nativeElement.textContent).toBe('Posts');
    });

    it('should not see posts list if you got the wrong permissions', () => {
      component.user$ = of({ ...user, account: Account.User });
      fixture.detectChanges();

      let headings = fixture.debugElement.queryAll(By.css('.profile-content-heading'));
      headings.forEach((heading) => {
        expect(heading.nativeElement.textContent).not.toBe('Posts');
      });
    });

    it('should be able to add a new post', () => {
      const dispatch = jest.spyOn(store, 'dispatch');

      let post: Post = {
        title: 'the title',
        author: `${user.firstname} ${user.lastname}`,
        description: 'the description',
      }

      component.addPost(post);
      fixture.detectChanges();
      expect(dispatch).toHaveBeenCalledWith({ payload: post, type: "[Posts] Add"});
    });
    
    it('should be able to delete a post', () => {
      const dispatch = jest.spyOn(store, 'dispatch');
      let id = '1234-ABCD-5678-EFGH';

      component.deletePost(undefined);
      fixture.detectChanges();
      expect(dispatch).not.toHaveBeenCalled();

      component.deletePost(id);
      fixture.detectChanges();
      expect(dispatch).toHaveBeenCalledWith({ id: id, type: "[Posts] Delete"});
    });
  });

  describe('Users', () => {
    it('should be able to see the post list with the right permissions', () => {
      component.user$ = of({ ...user, account: Account.Admin });
      fixture.detectChanges();

      let headings = fixture.debugElement.queryAll(By.css('.profile-content-heading'));
      expect(headings[3].nativeElement.textContent).toBe('Users');
    });
    
    it('should not see users list if you got the wrong permissions', () => {
      component.user$ = of({ ...user, account: Account.Blogger });
      fixture.detectChanges();

      let headings = fixture.debugElement.queryAll(By.css('.profile-content-heading'));
      headings.forEach((heading) => {
        expect(heading.nativeElement.textContent).not.toBe('Users');
      });
    });

    it('should be able to delete a post', () => {
      const dispatch = jest.spyOn(store, 'dispatch');
      let id = '1234-ABCD-5678-EFGH';

      component.deleteUser(undefined);
      fixture.detectChanges();
      expect(dispatch).not.toHaveBeenCalled();

      component.deleteUser(id);
      fixture.detectChanges();
      expect(dispatch).toHaveBeenCalledWith({ id: id, type: "[User] Delete"});
    });
  })
});
