import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { IFormComponent } from '../../shared/models/components/formComponent';
import { FormTypes } from '../../shared/models/components/enums/formtypes';
import { AppConfig } from '../../app.config';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-personcreate',
  templateUrl: './personcreate.component.html',
  styleUrls: ['./personcreate.component.scss']
})
export class PersonCreateComponent implements OnInit {
  createPersonForm: FormGroup;
  createForm: IFormComponent[] = [];


  loginForm: FormGroup;
  person: any;
  constructor(public appConfig: AppConfig, public dialogRef: MatDialogRef<PersonCreateComponent>, private formBuilder: FormBuilder) { }

  ngOnInit() {
    const componentInstance: any = this.dialogRef.componentInstance;
    const componentData = componentInstance?.data?.componentData;
    if (componentData) {
      console.log('Component Data:', componentData);
      this.person = componentData;
    }
    this.setForm();
  }
  get form() { return this.createPersonForm.controls; }

  setForm() {

    this.loginForm = this.formBuilder.group({
      username: ['', [
        Validators.required,
      ]],
      password: ['', [
        Validators.required,
      ]]
    });

    this.createForm = [
      { label: 'Email', type: FormTypes.text, value: "", control: 'email', hide: false, req: true, cols: 1, rows: 1 },
      { label: 'Password', type: FormTypes.text, value: "", control: 'password', hide: false, req: true, cols: 1, rows: 1 },
      { label: 'Email', type: FormTypes.text, value: "", control: 'email', hide: false, req: true, cols: 1, rows: 1 },
      { label: 'Password', type: FormTypes.text, value: "", control: 'password', hide: false, req: true, cols: 1, rows: 1 },
      { label: 'Email', type: FormTypes.text, value: "", control: 'email', hide: false, req: true, cols: 1, rows: 1 },
      { label: 'Password', type: FormTypes.text, value: "", control: 'password', hide: false, req: true, cols: 1, rows: 1 },
      { label: 'Email', type: FormTypes.text, value: "", control: 'email', hide: false, req: true, cols: 1, rows: 1 },
      { label: 'Password', type: FormTypes.text, value: "", control: 'password', hide: false, req: true, cols: 1, rows: 1 }
    ];
    this.createPersonForm = new FormGroup({
      email: new FormControl(this.person != null ? this.person.position : "", [Validators.required, Validators.email]),
      password: new FormControl(this.person != null ? this.person.name : "", [Validators.required])
    });
  }
  Test() {
    console.log(this.form)
  }

  closeDialog(): void {
    this.dialogRef.componentRef.destroy();
    this.dialogRef.close();
  }
}
