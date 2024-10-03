import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ColumnType } from '../../shared/models/columntypeenum';
import { AppConfig } from '../../app.config';
import { style } from '@angular/animations';

@Component({
  selector: 'app-person',
  templateUrl: './person.component.html',
  styleUrl: './person.component.scss',
  changeDetection: ChangeDetectionStrategy.Default,
})
export class PersonComponent implements OnInit {
  cols: any[];
  displayedColumns: string[];
  dataSource = new MatTableDataSource(ELEMENT_DATA);

  @ViewChild(MatSort, { static: true })
  sort: MatSort = new MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(public appConfig: AppConfig) { }

  ngOnInit(): void {
    this.setTableCols();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
  setTableCols() {
    this.cols = [
      { field: 'position', header: 'position' },
      { field: 'name', header: 'name' },
      { field: 'weight', header: 'weight' },
      { field: 'symbol', header: 'symbol' },
    ];

    this.cols = [
      { field: 'position', header: 'Username', type: ColumnType.text, style: '10%' },
      { field: 'name', header: 'Password', type: ColumnType.text, style: '30%' },
      { field: 'weight', header: 'Name Surname', type: ColumnType.num5, style: '20%' },
      { field: 'symbol', header: 'Group', type: ColumnType.text, style: '20%' },
      { field: 'Actions', header: 'asdas', buttonLabel: 'Detail', type: ColumnType.button, style: '10%' }
    ];
    this.displayedColumns = this.cols.map(x => x.field);
    this.dataSource.sort = this.sort;
  }

}
export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}
const ELEMENT_DATA: PeriodicElement[] = [
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
];


export interface IColumns {
  field: string,
  header: string,
  colId?: string,
  type: string,
  style?: string,
  click?(data: any): void,
  icon?: string,
  disable?: string,
  max?: string,
  min?: string,
  buttonLabel?: string
}