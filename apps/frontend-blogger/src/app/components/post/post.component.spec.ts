import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PostComponent } from './post.component';
import { By } from '@angular/platform-browser';
import { Router } from '@angular/router';

describe('Post Component', () => {
  let component: PostComponent;
  let fixture: ComponentFixture<PostComponent>;

  const mockRouter = {
    navigate: jest.fn()
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PostComponent],
      providers: [
        { provide: Router, useValue: mockRouter }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(PostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should not have any input values as standard', () => {
    expect(component.id).toBeUndefined();
    expect(component.title).toBeUndefined();
    expect(component.description).toBeUndefined();
    expect(component.image).toBeUndefined();
  });

  it('should precent the post details when provided', () => {
    component.id = '9ec04e53-d82a-452e-835d-dfc471f94bb1';
    component.title = 'title';
    component.description = 'description';

    fixture.detectChanges();

    const title = fixture.debugElement.query(By.css('.post-title')).nativeElement;
    const button = fixture.debugElement.query(By.css('.button')).nativeElement;

    expect(title.textContent).toBe('Title');
    expect(button.textContent).toBe('Read More');
  });

  it('should be able to navigate to the details page when provided with an id', () => {
    const navigateSpy = jest.spyOn(mockRouter, 'navigate');

    component.id = '9ec04e53-d82a-452e-835d-dfc471f94bb1';
    component.readMore();

    expect(navigateSpy).toHaveBeenCalledWith(['details', component.id]);
  });

  it('should present a default image when no image is provided', () => {
    fixture.detectChanges();

    const image = fixture.debugElement.query(By.css('.post-image')).nativeElement;
    expect(getComputedStyle(image).backgroundImage).toBe('url(assets/logos/post-default.png)');
  });

  it('should present the image when its provided', () => {
    component.image = 'http://url.com/image';
    fixture.detectChanges();

    const image = fixture.debugElement.query(By.css('.post-image')).nativeElement;
    expect(getComputedStyle(image).backgroundImage).toBe(`url(${component.image})`);
  });
});
