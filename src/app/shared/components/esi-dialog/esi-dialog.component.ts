import { ChangeDetectionStrategy, Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { EsiTableComponent } from '../esi-table/esi-table.component';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { EsiFormComponent } from '../esi-form/esi-form.component';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-esi-dialog',
  templateUrl: './esi-dialog.component.html',
  styleUrls: ['./esi-dialog.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    MatDialogModule,
    MatCardModule,
    EsiTableComponent,
    EsiFormComponent,
    MatButtonModule
  ],
  changeDetection: ChangeDetectionStrategy.Default,
})
export class EsiDialogComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<EsiDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }


  ngOnInit() {
    console.log('Dialog got', this.data);
  }

  closeDialog() {
    this.dialogRef.close();
  }

  onSave() {
    if (this.data.formGroup) {
      console.log("1");

      this.dialogRef.close(this.data.formGroup.value);
    }
    else if (this.data.card.formGroup) {
      this.dialogRef.close(this.data.card.formGroup.value);
    }

    else if (this.data.label) {
      console.log("3");
      this.dialogRef.close(true);
    }
    else if (this.data.card.label) {
      console.log("4");
      this.dialogRef.close(true);
    }
  }
}
