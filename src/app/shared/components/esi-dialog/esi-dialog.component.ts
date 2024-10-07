import { ChangeDetectionStrategy, Component, ComponentFactoryResolver, ComponentRef, Inject, OnInit, Type, ViewChild, ViewContainerRef } from '@angular/core';
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

  @ViewChild('dynamicComponentContainer', { read: ViewContainerRef, static: false }) container: ViewContainerRef;
  componentRef: ComponentRef<any>;
  ngOnInit() {

  }

  ngAfterViewInit() {
    if (this.data.component && this.container) {
      this.container.clear(); // Önceki bileşenleri temizler
      this.componentRef = this.container.createComponent(this.data.component as Type<any>);
    }
  }
  ngOnDestroy() {
    if (this.componentRef) {
      this.componentRef.destroy();
    }
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
      console.log('2');
      
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
