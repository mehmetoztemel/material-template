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
      { position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H' },
      { position: 2, name: 'Helium', weight: 4.0026, symbol: 'He' },
      { position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li' },
      { position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be' },
      { position: 5, name: 'Boron', weight: 10.811, symbol: 'B' },
      { position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C' },
      { position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N' },
      { position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O' },
      { position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F' },
      { position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne' },
      { position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H' },
      { position: 2, name: 'Helium', weight: 4.0026, symbol: 'He' },
      { position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li' },
      { position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be' },
      { position: 5, name: 'Boron', weight: 10.811, symbol: 'B' },
      { position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C' },
      { position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N' },
      { position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O' },
      { position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F' },
      { position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne' }
    ];
    this.symbolOpt = Utility.getUniqueOptionsByProperty(this.data, 'symbol');

    this.cols = [
      { field: 'position', header: 'Position', type: ColumnType.text, style: '15%', filter: ColumnType.text },
      { field: 'name', header: 'Name', type: ColumnType.text, style: '25%', filter: ColumnType.date },
      { field: 'weight', header: 'Weight', type: ColumnType.num5, style: '20%', filter: ColumnType.text },
      { field: 'symbol', header: 'Symbol', type: ColumnType.text, style: '20%', filter: ColumnType.dropdown, opt: this.symbolOpt },
      { field: 'Actions', header: '', buttonLabel: '', icon: "menu", type: ColumnType.button, style: '10%', color: "primary", click: this.openDialog.bind(this) },
      { field: 'Actions1', header: '', buttonLabel: '', icon: "delete", type: ColumnType.button, style: '10%', color: "warn", click: this.silDialog.bind(this) }
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
    const dialog = this._dialog.open(EsiDialogComponent, {
      autoFocus: false,
      disableClose: true,
      data: <IDialogDataModel>{
        component: PersonCreateComponent,
        componentData: e,
        header: "Create"
      },
    });
    dialog.afterClosed().subscribe(result => {
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

  openDialog1(e: any): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;          // Dış tıklama ile kapanmayı engeller
    dialogConfig.autoFocus = true;             // Otomatik olarak odaklanmayı sağlar
    dialogConfig.width = '500px';              // Genişliği ayarlar
    dialogConfig.height = '400px';             // Yüksekliği ayarlar
    dialogConfig.data = { id: 123 };           // Veriyi iletir
    dialogConfig.hasBackdrop = true;           // Arka plan bulanıklaştırılır

    let dialogRef = this._dialog.open(PersonCreateComponent, dialogConfig);
    // açılacak olan componente data göndermek istiyorsak buradan iletebiliriz.
    // dialogRef.componentInstance.person = e;
    // Diyalog kapatıldığında sonuç alma
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log("Diyalog sonucu: ", result);
      }
    });
  }
}
export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}