import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { faPen, faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

import { AuthService } from '@auth/services/auth.service';
import { RequestStatus } from '@models/status.model';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent implements OnInit {

  form = this.formBuilder.nonNullable.group({
    email: ['', [Validators.email, Validators.required]],
    password: ['', [ Validators.required, Validators.minLength(6)]],
  });
  faPen = faPen;
  faEye = faEye;
  faEyeSlash = faEyeSlash;
  showPassword = false;
  statusCheckEmail: RequestStatus = 'init';
  statusLogin: RequestStatus = 'init';
  userExists = false;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  isAvailable() {
    if (this.form.controls.email.valid) {
      this.statusCheckEmail = 'loading';
      const email = this.form.controls.email.value;
      this.authService.isAvailable(email)
      .subscribe({
        next: (rta) => {
          this.statusCheckEmail = 'success';
          if (!rta.isAvailable) {
            // TODO: redirect to register page
          }
          this.userExists = true;
        },
        error: () => {
          this.statusCheckEmail = 'error';
        }
      })
    } else {
      this.form.controls.email.markAsTouched();
    }

  }

  doLogin() {
    if (this.form.valid) {
      this.statusLogin = 'loading';
      const { email, password } = this.form.getRawValue();
      this.authService.login(email, password)
      .subscribe({
        next: () => {
          this.statusLogin = 'success';
          this.router.navigate(['/app']);
        },
        error: () => {
          this.statusLogin = 'error';
          // TODO: show message
        }
      });
    } else {
      this.form.markAllAsTouched();
    }
  }

}
