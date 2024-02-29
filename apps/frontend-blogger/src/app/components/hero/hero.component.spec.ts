import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HeroComponent } from './hero.component';
import { By } from '@angular/platform-browser';

describe('Hero Component', () => {
  let component: HeroComponent;
  let fixture: ComponentFixture<HeroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeroComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(HeroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should not have any input values as standard', () => {
    expect(component.subtitle).toBeUndefined();
    expect(component.title).toBeUndefined()
  });

  it('should be able to input values and they should be displayed on the page', () => {
    component.title = 'title';
    component.subtitle = 'subtitle';

    fixture.detectChanges();
    const title = fixture.debugElement.query(By.css('.hero-title')).nativeElement;
    expect(title.textContent).toContain('Title');

    const subtitle = fixture.debugElement.query(By.css('.hero-subtitle')).nativeElement;
    expect(subtitle.textContent).toContain('subtitle');
  });

  it('shouldnt show a subtitle when one its not provided', () => {
    component.title = 'title';

    fixture.detectChanges();
    const title = fixture.debugElement.query(By.css('.hero-title')).nativeElement;
    expect(title.textContent).toContain('Title');

    const subtitle = fixture.debugElement.query(By.css('.hero-subtitle'));
    expect(subtitle).toBeNull();
    expect(component.subtitle).toBeUndefined();
  });
});
