import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EmptyComponent } from './empty.component';
import { By } from '@angular/platform-browser';

describe('Empty Component', () => {
  let component: EmptyComponent;
  let fixture: ComponentFixture<EmptyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmptyComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(EmptyComponent);
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
