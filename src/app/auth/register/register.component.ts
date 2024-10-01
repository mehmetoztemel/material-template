import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
  changeDetection: ChangeDetectionStrategy.Default,
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  constructor(private router: Router) { }
  ngOnInit(): void {
    this.createForm();
  }
  get form() { return this.registerForm.controls; }
  createForm() {
    this.registerForm = new FormGroup({
      firstName: new FormControl('', [Validators.required]),
      lastName: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required,Validators.email]),
      password: new FormControl('', [Validators.required,Validators.minLength(4)]),
    });
  }
  Register() {
    // this.router.navigate(['auth/login']);

    this.router.navigateByUrl('auth/login');
  }

}
