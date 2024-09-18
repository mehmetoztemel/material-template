import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ILoginRequest } from '../../shared/models/loginrequest';
import { AuthService } from '../../shared/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
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
      email: new FormControl('admin@admin.com', [Validators.required]),
      password: new FormControl('admin', [Validators.required]),
    });
  }

  Login() {
    // let loginRequestModel: ILoginRequest = <ILoginRequest>{
    //   UserName: this.form.username.value,
    //   Password: this.form.password.value
    // };

    // this.authService.auth(loginRequestModel).subscribe(x=> {
    //   localStorage.setItem("token", x.AccessToken)
    //   localStorage.setItem("userName",loginRequestModel.UserName)
    //   this.router.navigate([''], { skipLocationChange: true });
    // });
    localStorage.setItem("userName","test")
    localStorage.setItem("token", "test")
    // this.router.navigate([''], { skipLocationChange: true });
    this.router.navigateByUrl('');
  }

  Register(){
    localStorage.setItem("userName","test")
    localStorage.setItem("token", "test")
    // this.router.navigate(['/auth/register']);
    this.router.navigateByUrl('auth/register');
  }

}
