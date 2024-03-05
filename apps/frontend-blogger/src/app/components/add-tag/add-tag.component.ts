import { CommonModule } from "@angular/common";
import { Component, EventEmitter, OnInit, Output } from "@angular/core";
import { Tag } from "../../interface/tag.data";
import { FormsModule, ReactiveFormsModule, FormGroup, FormBuilder, Validators } from "@angular/forms";

@Component({
    selector: 'blog-builder-add-tag',
    standalone: true,
    imports: [CommonModule, FormsModule, ReactiveFormsModule],
    templateUrl: './add-tag.component.html',
    styleUrl: './add-tag.component.scss',
})
export class AddTagComponent implements OnInit {
    public form: FormGroup;

    @Output() newTag: EventEmitter<Tag> = new EventEmitter<Tag>();

    constructor(private fb: FormBuilder) {
        this.form = this.formSetup()
    }

    ngOnInit(): void { }

    public onSubmit(): void {
        if (this.form?.valid) {
            this.newTag.emit(this.getPayload());
            this.form.reset()
        }
    }

    private getPayload(): Tag {
        return {
            name: this.form.get('name')?.value
        }
    }

    private formSetup(): FormGroup {
        return this.fb.group({
            name: ['', Validators.required]
        });
    }
}