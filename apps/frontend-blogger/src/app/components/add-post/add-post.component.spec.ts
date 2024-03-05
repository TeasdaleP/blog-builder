import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AddPostComponent } from './add-post.component';
import { Account } from '../../enums/account.enum';
import { User } from '../../interface/user.interface';
import { Post } from '../../interface/post.data';

describe('Add Post Component', () => {
  let component: AddPostComponent;
  let fixture: ComponentFixture<AddPostComponent>;

  const id = '9ec04e53-d82a-452e-835d-dfc471f94bb1';

  const user: User = {
    firstname: 'phil',
    lastname: 'teasdale',
    email: 'phil@teasdale.com',
    password: 'password',
    account: Account.User
  }

  const post: Post = {
    title: 'the title',
    author: `${user.firstname} ${user.lastname}`,
    description: 'the description',
    tags: [id, id]
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddPostComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AddPostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have undefined inputs until theyre provided', () => {
    expect(component.firstname).toBeUndefined();
    expect(component.lastname).toBeUndefined();

    component.firstname = user.firstname;
    component.lastname = user.lastname;
    fixture.detectChanges();
    
    expect(component.firstname).toBe(user.firstname);
    expect(component.lastname).toBe(user.lastname);
  });

  it('should emit the correct payload when the form is valid and submitted', () => {
    const newPostSpy = jest.spyOn(component.newPost, 'emit');

    component.form.get('title')?.setValue(post.title)
    component.form.get('description')?.setValue(post.description);
    component.addedTags = [id, id];
    component.firstname = user.firstname;
    component.lastname = user.lastname;
    component.form.markAllAsTouched();
    component.onSubmit();
    fixture.detectChanges();

    expect(newPostSpy).toHaveBeenCalled();
    expect(newPostSpy).toHaveBeenCalledWith(post);
  });

  it('should not emit any payload if the form is invalid', () => {
    const newPostSpy = jest.spyOn(component.newPost, 'emit');

    component.form.markAllAsTouched();
    component.onSubmit();
    fixture.detectChanges();

    expect(newPostSpy).not.toHaveBeenCalled();
  });
});
