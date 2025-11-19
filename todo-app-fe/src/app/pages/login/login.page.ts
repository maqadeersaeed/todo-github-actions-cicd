import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { ReactiveFormsModule, FormBuilder, Validators, FormGroup } from '@angular/forms';

import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { AuthService } from '../../services/auth.service';
import { ToastService } from '../../services/toast.service';
import { AuthApiService } from '../../services/auth-api.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    RouterLink,
    InputTextModule,
    PasswordModule,
    ButtonModule,
    CardModule
  ],
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {

  form!: FormGroup; // declare only

  constructor(
  private fb: FormBuilder,
  private router: Router,
  // private auth: AuthService,
  private authApi: AuthApiService,
  private toast: ToastService
) {

    // initialize inside constructor → strict-safe
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  submit() {
  if (this.form.invalid) {
    this.toast.error("Email and password are required");
    return;
  }

  /*
  const { email, password } = this.form.value;
  const ok = this.authApi.login(email!, password!);
  if (!ok) {
    this.toast.error("Invalid credentials");
    return;
  }
  */

  this.authApi.login(this.form.value).subscribe({
    next: () => {
      this.toast.success("Login successful");
      this.router.navigate(['/tasks']);
    },
    error: err => {
      this.toast.error(err.error?.message || "Login failed");
    }
  });


  this.toast.success("Welcome back!");
  this.router.navigate(['/tasks']);
}

}
