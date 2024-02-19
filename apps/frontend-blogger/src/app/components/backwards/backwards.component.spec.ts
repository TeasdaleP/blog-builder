import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BackwardsComponent } from './backwards.component';
import { ActivatedRoute } from '@angular/router';
import { By } from '@angular/platform-browser';

describe('Backwards Component', () => {
  let component: BackwardsComponent;
  let fixture: ComponentFixture<BackwardsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BackwardsComponent],
      providers: [ 
        { provide: ActivatedRoute, useValue: {} }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(BackwardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get the correct input values', () => {
    component.link = '/list';
    component.text = 'Back'

    component.ngOnInit();
    fixture.detectChanges();

    expect(component.link).toEqual('/list');
    expect(component.text).toEqual('Back');
  });

  it('should display the name in the template', () => {
    component.text = 'Back'

    component.ngOnInit();
    fixture.detectChanges();

    const link = fixture.debugElement.query(By.css('.hero-link'));
    expect(link.nativeElement.textContent).toContain('Back');
  });
});
