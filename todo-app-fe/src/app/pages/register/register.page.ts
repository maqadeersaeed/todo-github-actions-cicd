import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormBuilder, Validators, ReactiveFormsModule, FormGroup } from '@angular/forms';

import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { AuthService } from '../../services/auth.service';
import { ToastService } from '../../services/toast.service';
import { TaskService } from '../../services/task.service';
import { AuthApiService } from '../../services/auth-api.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    RouterLink,
    InputTextModule,
    PasswordModule,
    ButtonModule,
    CardModule
  ],
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage {

  form!: FormGroup;
  


  constructor(
    private fb: FormBuilder, 
    private router: Router,
    // private auth: AuthService,
    private authApi: AuthApiService,
    private toast: ToastService,
    private taskService: TaskService
  ) {
    this.form = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required]
    });
  }

  submit() {
    if (this.form.invalid) {
      this.toast.error("All fields are required");
      return;
    }

    const { password, confirmPassword } = this.form.value;
    if (password !== confirmPassword) {
      this.toast.error("Passwords do not match");
      return;
    }

    // this.auth.register(this.form.value);
    // this.toast.success("Account created");
    // this.router.navigate(['/login']);

    const data = this.form.value;
    this.authApi.register(data).subscribe({
      next: () => {
        this.toast.success("Account created");
        this.router.navigate(['/login']);
      },
      error: err => {
        this.toast.error(err.error?.message || "Registration failed");
      }
    });

    
  }

}
