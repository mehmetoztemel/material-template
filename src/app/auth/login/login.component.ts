import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
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
  constructor(private router: Router, private authService : AuthService) { }
  ngOnInit(): void {
    this.createForm();
  }
  get form() { return this.loginForm.controls; }
  createForm() {
    this.loginForm = new FormGroup({
      email: new FormControl('admin@admin.com', [Validators.required,Validators.email]),
      password: new FormControl('admin', [Validators.required]),
    });
  }

  Login() {
    localStorage.setItem("userName","test")
    localStorage.setItem("token", "test")
    this.router.navigateByUrl('');
  }

  Register(){
    localStorage.setItem("userName","test")
    localStorage.setItem("token", "test")
    this.router.navigateByUrl('auth/register');
  }

}
