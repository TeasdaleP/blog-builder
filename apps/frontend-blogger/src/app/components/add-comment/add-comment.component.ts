import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EditorModule } from '@tinymce/tinymce-angular';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'blog-builder-add-comment',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, EditorModule],
  templateUrl: './add-comment.component.html',
  styleUrl: './add-comment.component.scss',
})
export class AddCommentComponent implements OnInit {
  public apikey: string = environment.tinymce;
  public form: FormGroup;
  public config: any;
  
  @Output() newComment: EventEmitter<string> = new EventEmitter<string>();

  constructor(private fb: FormBuilder) {
    this.form = this.formSetup();
    this.config = this.getConfiguration();
  }

  ngOnInit(): void {
      
  }

  public onSubmit(): void {
    if (this.form?.valid) {
      this.newComment.emit(this.form.get('comment')?.value);
      this.form.reset();
    }
  }

  private formSetup(): FormGroup { 
    return this.fb.group({
      comment: ['', Validators.required]
    });
  }

  private getConfiguration(): any {
    return {
      plugins: 'anchor autolink lists visualblocks wordcount checklist tinymcespellchecker autocorrect',
      toolbar: false,
      menubar: false,
      height: 150,
      content_css: './add-post.component.scss'
    }
  }

}

