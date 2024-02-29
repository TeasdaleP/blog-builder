import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FooterComponent } from './footer.component';
import { By } from '@angular/platform-browser';

describe('Footer Component', () => {
  let component: FooterComponent;
  let fixture: ComponentFixture<FooterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FooterComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(FooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should include the footer content', () => {
    const sentence = fixture.debugElement.query(By.css('.footer-sentence')).nativeElement;
    expect(sentence.textContent).toContain('Developed by');
  });

  it('should have my name highlighted', () => {
    const sentence = fixture.debugElement.query(By.css('span')).nativeElement;
    expect(sentence.textContent).toContain('Phil Teasdale');
  });
});
