import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AppConfig } from '../../app.config';
import { IDialogDataModel } from '../../shared/models/components/dialogDataModel';
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
  constructor(public appConfig: AppConfig, @Inject(MAT_DIALOG_DATA) public dialogData:IDialogDataModel) { }

  ngOnInit() {
    if (this.dialogData?.componentData) {
      this.person = this.dialogData.componentData;
      console.log(this.person);
    }
    this.setForm();
  }
  get form() { return this.createPersonForm.controls; }

  setForm() {
    this.createForm = [
      { label: 'Email', type: FormTypes.text, control: 'email', hide: false, req: true },
      { label: 'Password', type: FormTypes.text, control: 'password', hide: false, req: true },
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
