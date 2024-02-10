import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BackwardsComponent } from '../../components/backwards/backwards.component';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'blog-builder-signup',
  standalone: true,
  imports: [CommonModule, BackwardsComponent, FormsModule, ReactiveFormsModule, RouterModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss',
})
export class SignupComponent implements OnInit {
  public form: FormGroup;
  
  constructor(private fb: FormBuilder) {
    this.form = this.formSetup()
  }

  ngOnInit(): void {
      
  }

  public onSubmit(): void {
    this.form.reset();
  }

  private formSetup(): FormGroup { 
    return this.fb.group({
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }
}
