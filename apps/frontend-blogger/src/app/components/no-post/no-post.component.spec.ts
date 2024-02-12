import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NoPostComponent } from './no-post.component';
import { By } from '@angular/platform-browser';

describe('Post Component', () => {
  let component: NoPostComponent;
  let fixture: ComponentFixture<NoPostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NoPostComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(NoPostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should present a static title', () => {
    let title = fixture.debugElement.query(By.css('.nopost-title')).nativeElement;
    expect(title.textContent).toContain('No Recent Posts!');
  });

  it('should present a static paragrpah', () => {
    let content = fixture.debugElement.query(By.css('p')).nativeElement;
    expect(content.textContent).toContain('There are currently no recent posts to display.');
  });
});
