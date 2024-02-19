import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ListComponent } from './list.component';
import { ActivatedRoute } from '@angular/router';
import { provideMockActions } from '@ngrx/effects/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { Observable, of } from 'rxjs';
import { By } from '@angular/platform-browser';
import { Post } from '../../interface/post.data';

describe('ListComponent', () => {
  let component: ListComponent;
  let fixture: ComponentFixture<ListComponent>;
  let store: MockStore;
  let actions: Observable<any>;

  const post: Post = {
    id: '9ec04e53-d82a-452e-835d-dfc471f94bb1',
    title: 'the title for the full test data object',
    date: new Date(),
    author: 'the author for the full test data object',
    description: 'the description for the full test data object',
    tags: [],
    images: [],
    comments: []
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListComponent],
      providers: [
        provideMockStore({}),
        provideMockActions(() => actions),
        { provide: ActivatedRoute, useValue: {} }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    store = TestBed.inject(MockStore);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have a heading and subheading', () => {
    const heading = fixture.debugElement.query(By.css('.list-heading')).nativeElement;
    const subheading = fixture.debugElement.query(By.css('.list-subheading')).nativeElement;

    expect(heading.textContent).toBe('Latest Posts');
    expect(subheading.textContent).toBe('Dive into our latest blog posts and tell us what you think...');
  });

  it('should be displaying the post component when post$ is populated', () => {
    component.posts$ = of([post]);
    fixture.detectChanges();

    const nopostcomponent = fixture.debugElement.query(By.css('blog-builder-post')).nativeElement;
    expect(nopostcomponent).toBeDefined();
  });

  it('should be displaying the no post component when post$ is empty', () => {
    component.posts$ = of([]);
    fixture.detectChanges();

    const nopostcomponent = fixture.debugElement.query(By.css('blog-builder-empty')).nativeElement;
    expect(nopostcomponent).toBeDefined();
  });

  it('should dispatch to retrieve all posts', () => {
    const dispatch = jest.spyOn(store, 'dispatch');
    
    component.ngOnInit();
    fixture.detectChanges();

    expect(dispatch).toHaveBeenCalledWith({ type: '[Posts] Retrieve All' });
  });
});
