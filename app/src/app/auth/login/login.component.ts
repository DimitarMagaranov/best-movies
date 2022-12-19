import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private authService: AuthService
  ) {}

  loginHandler(form: NgForm): void {
    if (form.invalid) {
      return;
    }

    const { email, password } = form.value;

    this.authService.login(email, password).subscribe({
      next: () => {
        const returnUrl =
        this.activatedRoute.snapshot.queryParams['returnUrl'] || '/';
        this.router.navigate([returnUrl]);
      },
      error: (err) => {
        this.errorMessage = err.error.message;
        this.isLoginFailed = true;
      }
    })
  }

  closeAlert() {
    this.isLoginFailed = false;
  }
}
