import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AddCommentComponent } from './add-comment.component';
import exp from 'constants';

describe('Add Comment Component', () => {
  let component: AddCommentComponent;
  let fixture: ComponentFixture<AddCommentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddCommentComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AddCommentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should not be able to submit without interacting with the form', () => {
    const emmitter = jest.spyOn(component.newComment, 'emit');

    component.form.markAsDirty();
    component.onSubmit();

    expect(component.form.invalid).toBeTruthy();
    expect(emmitter).not.toHaveBeenCalled();
  });

  it('should be able to sumbit when the comment is entered', () => {
    const emmitter = jest.spyOn(component.newComment, 'emit');

    const comment = 'this is a new comment';
    
    component.form.get('comment')?.setValue(comment);
    component.onSubmit();
    fixture.detectChanges();

    expect(emmitter).toHaveBeenCalledWith(comment);
  });
});
