import { ComponentFixture, TestBed } from "@angular/core/testing";
import { AddTagComponent } from "./add-tag.component";

describe('Add Tag Component', () => {
  let component: AddTagComponent;
  let fixture: ComponentFixture<AddTagComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddTagComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AddTagComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should not be able to submit the form without adding a tag', () => {
    const emmitter = jest.spyOn(component.newTag, 'emit');

    component.form.markAsDirty();
    component.onSubmit();

    expect(component.form.invalid).toBeTruthy();
    expect(emmitter).not.toHaveBeenCalled();
  });

  it('should be able to submit the form when a new tag is included', () => {
    const emmitter = jest.spyOn(component.newTag, 'emit');

    const tag = 'blogging';

    component.form.get('name')?.setValue(tag);
    component.onSubmit();
    fixture.detectChanges();

    expect(emmitter).toHaveBeenCalledWith({ name: tag });
  });
});