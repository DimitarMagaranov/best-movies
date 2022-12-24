import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { appEmailValidator } from 'src/app/shared/validators/app-email-validator';
import { sameValueGroupValidator } from 'src/app/shared/validators/match-password-group-validator';
import { AuthService } from '../auth.service';
import {environment} from '../../../environments/environment';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['../login/login.component.scss', './register.component.scss'],
})
export class RegisterComponent {
  isRegisterFailed = false;
  errorMessage = '';

  recaptchaSiteKey = environment.recaptchaSiteKey;
  captchaResolved : boolean = false;

  form = this.fb.group({
    username: ['', [Validators.required, Validators.minLength(5)]],
    email: ['', [Validators.required, appEmailValidator()]],
    pass: this.fb.group(
      {
        password: ['', [Validators.required, Validators.minLength(5)]],
        rePassword: [],
      },
      {
        validators: [sameValueGroupValidator('password', 'rePassword')],
      }
    ),
  });

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {}

  checkCaptcha(captchaResponse : string) {
    this.captchaResolved = (captchaResponse && captchaResponse.length > 0) ? true : false
}

  registerHandler(): void {
    if (this.form.invalid) {
      return;
    }

    const {
      username,
      email,
      pass: { password, rePassword } = {},
    } = this.form.value;
    this.authService
      .register(username!, email!, password!, rePassword!)
      .subscribe({
        next: () => {
          this.router.navigate(['/']);
        },
        error: (err) => {
          this.errorMessage = err.error.message;
          this.isRegisterFailed = true;
          if (this.errorMessage.includes('Username')) {
            this.form.get('username')?.reset();
          }
          if (this.errorMessage.includes('Email')) {
            this.form.get('email')?.reset();
          }
        }
      });
  }

  closeAlert() {
    this.isRegisterFailed = false;
  }
}
