import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormsModule, FormGroup } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'esi-form',
  standalone: true,
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    ReactiveFormsModule,
    FormsModule,
    MatSelectModule,
    MatDatepickerModule,
    MatCheckboxModule,
  ],
  providers:[provideNativeDateAdapter()],
  templateUrl: './esi-form.component.html',
  styleUrl: './esi-form.component.scss',
  changeDetection: ChangeDetectionStrategy.Default,
})

export class EsiFormComponent implements OnInit {
  @Input() formGroup: FormGroup;

  @Input() forms: any;
  constructor(){

  }
  
  ngOnInit(): void {
  }
}


