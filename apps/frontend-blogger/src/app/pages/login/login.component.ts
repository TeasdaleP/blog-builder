import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { BackwardsComponent } from '../../components/backwards/backwards.component';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'blog-builder-login',
  standalone: true,
  imports: [CommonModule, BackwardsComponent, FormsModule, ReactiveFormsModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent implements OnInit {
  public form: FormGroup;

  constructor(private fb: FormBuilder) {
    this.form = this.formSetup();
  }

  ngOnInit(): void {
      
  }

  public onSubmit(): void {
    this.form.reset();
  }

  private formSetup(): FormGroup { 
    return this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }
}
