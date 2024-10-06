import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { IColumns } from '../../shared/models/columns';
import { FormTipleri, IDialogDataModel, IFormComponent } from '../../shared/models/dialogData';
import { EsiDialogComponent } from '../../shared/components/esi-dialog/esi-dialog.component';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ColumnType } from '../../shared/models/enums/columnTypeEnum';
import { IDropdownOption } from '../../shared/models/dropdownOption';

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
  openNewDialog: boolean = false;
  newsForm: FormGroup;
  symbolOpt: IDropdownOption[] = [];

  constructor(private _dialog: MatDialog) { }
  ngOnInit(): void {
    this.setTableCols();
    this.createForm();
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
    this.cols = [
      { field: 'position', header: 'Position', type: ColumnType.text, style: '15%', filter: ColumnType.text },
      { field: 'name', header: 'Name', type: ColumnType.text, style: '25%', filter: ColumnType.text },
      { field: 'weight', header: 'Weight', type: ColumnType.num5, style: '20%', filter: ColumnType.text },
      { field: 'symbol', header: 'Symbol', type: ColumnType.text, style: '20%', filter: ColumnType.multiSelect, opt: this.symbolOpt },
      { field: 'Actions', header: 'asdas', buttonLabel: 'Detail', type: ColumnType.button, style: '10%', color: "primary" }
    ];

    const uniqueSymbols = Array.from(new Set(this.data.map(element => element.symbol)));
    uniqueSymbols.forEach(symbol => {
      this.symbolOpt.push({ viewValue: symbol, value: symbol });
    });

    this.displayedColumns = this.cols.map(x => x.field);
  }
  get form() { return this.newsForm.controls; }
  kayitForm: IFormComponent[] = [];
  createForm() {

    this.kayitForm = [
      { label: 'Email', type: FormTipleri.email, value: '', control: 'email', hide: false, req: true },
      { label: 'Password', type: FormTipleri.password, value: '', control: 'password', hide: false, req: true }
    ];

    this.newsForm = new FormGroup({
      email: new FormControl("", [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required])
    });
  }

  openDialog() {
    const dialog = this._dialog.open(EsiDialogComponent, {
      width: '800px',
      data: <IDialogDataModel>{
        header: "Dialog Header",
        // card: <IDialogDataModel>{
        //   header: "Test1",
        //   formGroup: this.newsForm,
        //   formType: this.kayitForm,
        //   label: "dasdasdasd"
        // },
        col: this.cols,
        table: this.data,
        dspCol: this.displayedColumns
      }
    });
    dialog.afterClosed().subscribe(result => {
      console.log(result);
    });
  }
}
export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}
