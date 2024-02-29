import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DetailsComponent } from './details.component';
import { ActivatedRoute } from '@angular/router';
import { provideMockActions } from '@ngrx/effects/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { Post } from '../../interface/post.data';
import { By } from '@angular/platform-browser';
import { Comment } from '../../interface/comment.data';

describe('DetailsComponent', () => {
  let component: DetailsComponent;
  let fixture: ComponentFixture<DetailsComponent>;

  let store: MockStore;
  let actions: Observable<any>;
  let route: ActivatedRoute;

  const mockId = '1234567890';
  const uuid = '9ec04e53-d82a-452e-835d-dfc471f94bb1'

  const posts: Post[] = [
    {
      id: uuid,
      title: 'the first title',
      date: new Date(),
      author: 'the first author',
      description: 'the first description'
    },
    {
      id: '1234567890',
      title: 'the second title',
      date: new Date(),
      author: 'the second author',
      description: 'the second description'
    }
  ]

  const comments: Comment[] = [
    {
      id: uuid,
      date: new Date(),
      author: 'phil teasdale',
      comment: 'this is the first comment',
    },
    {
      id: uuid,
      date: new Date(),
      author: 'joe bloggs',
      comment: 'this is the second comment',
    }
  ]

  const mockActivedRoute = {
    params: new BehaviorSubject({ id: mockId })
  }
 
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetailsComponent],
      providers: [
        provideMockStore({}),
        provideMockActions(() => actions),
        { provide: ActivatedRoute, useValue: mockActivedRoute }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(DetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    store = TestBed.inject(MockStore);
    route = TestBed.inject(ActivatedRoute);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should be able to filter to one post from an array', () => {
    component.post$ = of(posts[1]);
    component.ngOnInit();
    fixture.detectChanges();

    component.post$.subscribe((post) => expect(post?.id).toBe(posts[1].id));

    const title = fixture.debugElement.query(By.css('.details-heading')).nativeElement;
    const subheadings = fixture.debugElement.queryAll(By.css('.details-subheading'));
    const description = fixture.debugElement.query(By.css('.details-content-inner')).nativeElement;

    expect(title.textContent).toBe(posts[1].title);
    expect(subheadings[0].nativeElement.textContent).toBe(posts[1].author);
    expect(description.textContent).toBe(posts[1].description);
  });

  it('should have a heading for the comments section', () => {
    const title = fixture.debugElement.query(By.css('.details-content-heading')).nativeElement;
    expect(title.textContent).toBe('Comments');
  });

  it('should allow logged in users to add new comments', () => {
    const dispatch = jest.spyOn(store, 'dispatch');
    component.loggedIn$ = of(true);
    fixture.detectChanges();

    const addComment = fixture.debugElement.query(By.css('blog-builder-add-comment'));
    expect(addComment).toBeDefined();

    const comment = 'this is a new comment';
    component.handleAddComment(comment);
    expect(dispatch).toHaveBeenCalledWith({ type: '[Comments] Add', postId: mockId, comment: comment });
  });

  it('should show a list of comments if they are available', () => {
    component.comments$ = of(comments);
    fixture.detectChanges();

    const comment = fixture.debugElement.query(By.css('blog-builder-comment'));
    expect(comment).toBeDefined();
  });

  it('should show the empty coment if no comments are available', () => {
    component.comments$ = of([]);
    fixture.detectChanges();

    const empty = fixture.debugElement.query(By.css('blog-builder-empty'));
    expect(empty).toBeDefined();
  });
});
