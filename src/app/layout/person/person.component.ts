import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { EsiDialogComponent } from '../../shared/components/esi-dialog/esi-dialog.component';
import { IColumns } from '../../shared/models/components/columns';
import { IDialogDataModel } from '../../shared/models/components/dialogDataModel';
import { IDropdownOption } from '../../shared/models/components/dropdownOption';
import { ColumnType } from '../../shared/models/components/enums/columnTypeEnum';
import { Utility } from '../../shared/Utility';
import { PersonCreateComponent } from '../personcreate/personcreate.component';

@Component({
  selector: 'app-person',
  templateUrl: './person.component.html',
  styleUrl: './person.component.scss',
  changeDetection: ChangeDetectionStrategy.Default,
})
export class PersonComponent implements OnInit {
  cols: IColumns[];
  displayedColumns: string[]
  data: PeriodicElement[] = [];
  symbolOpt: IDropdownOption[] = [];
  constructor(private _dialog: MatDialog) { }
  ngOnInit(): void {
    this.setTableCols();
  }

  setTableCols() {
    this.data = [
      { position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H', date: new Date("2024-09-09") },
      { position: 2, name: 'Helium', weight: 4.0026, symbol: 'He', date: new Date() },
      { position: 3, name: 'Hydrogen', weight: 6.941, symbol: 'Li', date: new Date("2024-09-09") },
      { position: 4, name: 'Hydrogen', weight: 9.0122, symbol: 'Be', date: new Date("2024-09-09") },
      { position: 5, name: 'Boron', weight: 10.811, symbol: 'B', date: new Date() },
      { position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C', date: new Date() },
      { position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N', date: new Date() },
      { position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O', date: new Date() },
      { position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F', date: new Date() },
      { position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne', date: new Date() },
      { position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H', date: new Date("2024-09-09") },
      { position: 2, name: 'Helium', weight: 4.0026, symbol: 'He', date: new Date() },
      { position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li', date: new Date() },
      { position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be', date: new Date() },
      { position: 5, name: 'Boron', weight: 10.811, symbol: 'B', date: new Date() },
      { position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C', date: new Date() },
      { position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N', date: new Date() },
      { position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O', date: new Date() },
      { position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F', date: new Date() },
      { position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne', date: new Date() }
    ];
    this.symbolOpt = Utility.getUniqueOptionsByProperty(this.data, 'symbol');

    this.cols = [
      { field: 'position', header: 'Position', type: ColumnType.text, style: '20%', filter: ColumnType.date },
      { field: 'name', header: 'Name', type: ColumnType.text, style: '20%', filter: ColumnType.dropDown },
      { field: 'weight', header: 'Weight', type: ColumnType.num5, style: '20%', filter: ColumnType.text },
      { field: 'symbol', header: 'Symbol', type: ColumnType.text, style: '20%', filter: ColumnType.multiSelect, opt: this.symbolOpt },
      // { field: 'date', header: 'Date', type: ColumnType.date, style: '20%', filter: ColumnType.date },
      { field: 'Actions', header: 'Detail', buttonLabel: '', icon: "menu", type: ColumnType.button, style: '5%', color: "primary", click: this.openDialog.bind(this) },
      { field: 'Actions1', header: 'Delete', buttonLabel: '', icon: "delete", type: ColumnType.button, style: '5%', color: "warn", click: this.silDialog.bind(this), hideColumn: true }
    ];

    //#region Option GroupBy
    // const uniqueSymbols = Array.from(new Set(this.data.map(element => element.symbol)));
    // uniqueSymbols.forEach(symbol => {
    //   this.symbolOpt.push({ viewValue: symbol, value: symbol });
    // });
    //#endregion
    this.displayedColumns = this.cols.map(x => x.field);
  }
  openDialog(e: any) {
    let header = e == null ? "Create" : "Detail";
    const dialog = this._dialog.open(EsiDialogComponent, {
      autoFocus: false,
      disableClose: true,
      hasBackdrop: true,
      data: <IDialogDataModel>{
        component: PersonCreateComponent,
        componentData: e,
        header: header
      }
    });
    dialog.afterClosed().subscribe(result => { });
  }
  openDialog1(e: any): void {
    let header = e == null ? "Create" : "Detail";
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;          // Dış tıklama ile kapanmayı engeller
    dialogConfig.autoFocus = true;             // Otomatik olarak odaklanmayı sağlar
    dialogConfig.width = '500px';              // Genişliği ayarlar
    dialogConfig.height = '400px';             // Yüksekliği ayarlar
    dialogConfig.data = <IDialogDataModel>{
      header: header,
      componentData: e
    };
    dialogConfig.hasBackdrop = true;

    let dialogRef = this._dialog.open(PersonCreateComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log("Diyalog sonucu: ", result);
      }
    });
  }

  silDialog(e: any) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;          // Dış tıklama ile kapanmayı engeller
    dialogConfig.autoFocus = false;             // Otomatik olarak odaklanmayı sağlar
    dialogConfig.data = <IDialogDataModel>{
      label: "Kayıt silinecektir onaylıyor musunuz?",
      button1: "Evet",
      button2: "Hayır"
    };
    let dialogRef = this._dialog.open(EsiDialogComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(result => {
      // console.log(result);
    });
  }


}
export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
  date: Date;
}