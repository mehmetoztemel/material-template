import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { AppConfig } from '../../app.config';
import { FormTypes } from '../../shared/models/components/enums/formtypes';
import { IFormComponent } from '../../shared/models/components/formComponent';

@Component({
  selector: 'app-personcreate',
  templateUrl: './personcreate.component.html',
  styleUrls: ['./personcreate.component.scss']
})
export class PersonCreateComponent implements OnInit {
  createPersonForm: FormGroup;
  createForm: IFormComponent[] = [];
  person: any;
  constructor(public appConfig: AppConfig, public dialogRef: MatDialogRef<PersonCreateComponent>) { }

  ngOnInit() {
    const componentInstance = this.dialogRef.componentInstance as { data?: { componentData?: any } };
    const componentData = componentInstance?.data?.componentData;
    if (componentData) {
      // console.log('Component Data:', componentData);
      this.person = componentData;
    }

    this.setForm();
  }
  get form() { return this.createPersonForm.controls; }

  setForm() {
    this.createForm = [
      { label: 'Email', type: FormTypes.text, value: "", control: 'email', hide: false, req: true },
      { label: 'Password', type: FormTypes.text, value: "", control: 'password', hide: false, req: true },
    ];

    this.createPersonForm = new FormGroup({
      email: new FormControl(this.person != null ? this.person.position : "", [Validators.required, Validators.email]),
      password: new FormControl(this.person != null ? this.person.name : "", [Validators.required])
    });
  }
  Test() {
    console.log(this.form)
  }

}
