import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, UntypedFormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../shared/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  changeDetection: ChangeDetectionStrategy.Default,
})

export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  constructor(private router: Router, private authService: AuthService) { }
  ngOnInit(): void {
    this.createForm();
  }
  get form() { return this.loginForm.controls; }
  createForm() {
    const userEmail = localStorage.getItem('Email');
    const rememberMe = localStorage.getItem("rememberMe");
    this.loginForm = new FormGroup({
      email: new FormControl(userEmail != null?  localStorage.getItem("Email") :"" , [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required]),
      rememberMe: new FormControl(rememberMe == null ? false : true)
    });
  }

  Login() {
    const rememberMe = this.form.rememberMe.value;
    if (rememberMe) {
      localStorage.setItem("Email", "admin@admin.com");
      localStorage.setItem("rememberMe", rememberMe);
    }
    else {
      localStorage.removeItem("Email");
      localStorage.removeItem("rememberMe");
    }
    localStorage.setItem("UserInfo", "admin");
    localStorage.setItem("Token", "admin");
    this.router.navigateByUrl('');
  }

  Register() {
    this.router.navigateByUrl('auth/register');
  }

}