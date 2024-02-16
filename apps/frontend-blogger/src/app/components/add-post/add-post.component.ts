import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, FormBuilder, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EditorModule } from '@tinymce/tinymce-angular';
import { environment } from '../../../environments/environment';
import { Post } from '../../interface/post.data';

@Component({
  selector: 'blog-builder-add-post',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, EditorModule],
  templateUrl: './add-post.component.html',
  styleUrl: './add-post.component.scss',
})
export class AddPostComponent implements OnInit {
  @Input() firstname: string | undefined;
  @Input() lastname: string | undefined;

  public apikey: string = environment.tinymce;
  public form: FormGroup;
  public config: any;

  @Output() newPost: EventEmitter<Post> = new EventEmitter<Post>();

  constructor(private fb: FormBuilder) {
    this.form = this.formSetup()
    this.config = this.getConfiguration();
  }

  ngOnInit(): void {
      
  }

  public onSubmit(): void {
    if (this.form?.valid) {
      this.newPost.emit(this.getPostPayload());
      this.form.reset();
    }
  }

  private getPostPayload(): Post {
    return {
      title: this.form.get('title')?.value,
      description: this.form.get('description')?.value,
      author: `${this.firstname} ${this.lastname}`
    }
  }

  private formSetup(): FormGroup { 
    return this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required]
    });
  }

  private getConfiguration(): any {
    return {
      plugins: 'anchor autolink lists visualblocks wordcount checklist tinymcespellchecker autocorrect',
      toolbar: 'undo redo | bold italic underline | spellcheckdialog | numlist bullist',
      menubar: '',
      content_css: './add-post.component.scss'
    }
  }
}
