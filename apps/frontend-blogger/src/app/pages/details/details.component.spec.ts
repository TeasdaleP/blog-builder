import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DetailsComponent } from './details.component';
import { ActivatedRoute } from '@angular/router';
import { provideMockActions } from '@ngrx/effects/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { Post } from '../../interface/post.data';
import { By } from '@angular/platform-browser';

describe('DetailsComponent', () => {
  let component: DetailsComponent;
  let fixture: ComponentFixture<DetailsComponent>;

  let store: MockStore;
  let actions: Observable<any>;
  let route: ActivatedRoute;

  let posts: Post[] = [
    {
      id: '9ec04e53-d82a-452e-835d-dfc471f94bb1',
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

  let mockActivedRoute = {
    params: new BehaviorSubject({ id: '1234567890'})
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
    component.posts$ = of(posts);
    component.ngOnInit();
    fixture.detectChanges();

    expect(component.post?.id).toBe(posts[1].id);

    let title = fixture.debugElement.query(By.css('.details-heading')).nativeElement;
    let subheadings = fixture.debugElement.queryAll(By.css('.details-subheading'));
    let description = fixture.debugElement.query(By.css('.details-content-inner')).nativeElement;

    expect(title.textContent).toBe(posts[1].title);
    expect(subheadings[0].nativeElement.textContent).toBe(posts[1].author);
    expect(description.textContent).toBe(posts[1].description);
  });

  it('should show a to do alert for the comments section', () => {
    let title = fixture.debugElement.query(By.css('.details-content-heading')).nativeElement;
    expect(title.textContent).toBe('Comments');

    let alert = fixture.debugElement.query(By.css('.alert')).nativeElement;
    expect(alert.textContent).toContain('Logged in users will be able to add comments to posts');
  });
});
