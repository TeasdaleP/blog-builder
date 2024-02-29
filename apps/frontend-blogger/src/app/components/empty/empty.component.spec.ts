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

  it('should not have any input values as standard', () => {
    expect(component.type).toBeUndefined();
    expect(component.title).toBeUndefined();
    expect(component.subtitle).toBeUndefined();

    component.title = 'title';
    component.subtitle = 'subtitle';
    component.type = 'CARD';
    fixture.detectChanges();

    expect(component.type).toBeDefined();
    expect(component.title).toBeDefined();
    expect(component.subtitle).toBeDefined();
  });

  it('should be able to see the inputted content in the component', () => {
    component.title = 'title';
    component.subtitle = 'subtitle';
    component.type = 'INLINE';
    fixture.detectChanges();

    const title = fixture.debugElement.query(By.css('h4')).nativeElement;
    const subtitle = fixture.debugElement.query(By.css('p')).nativeElement;

    expect(title.textContent).toContain('Title');
    expect(subtitle.textContent).toContain('subtitle');
  });

  it('should be able to see different styling for components with CARD type', () => {
    component.title = 'title';
    component.subtitle = 'subtitle';

    const h2 = fixture.debugElement.query(By.css('h2'));
    const h4 = fixture.debugElement.query(By.css('h4'));
    const card = fixture.debugElement.query(By.css('.empty-card'));
    const space = fixture.debugElement.query(By.css('.empty-doublespace'));

    component.type = 'INLINE';
    fixture.detectChanges();

    expect(h4).toBeDefined();
    expect(h2).toBeNull();
    expect(card).toBeNull();
    expect(space).toBeNull();

    component.type = 'CARD';
    fixture.detectChanges();

    expect(h4).toBeNull();
    expect(h2).toBeDefined();
    expect(card).toBeDefined();
    expect(space).toBeDefined();
  });
});
