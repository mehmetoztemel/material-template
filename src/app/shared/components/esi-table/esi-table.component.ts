import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { IColumns } from '../../models/columns';
import { AppConfig } from '../../../app.config';
import { MatOptionModule, provideNativeDateAdapter } from '@angular/material/core';
import { MatDatepickerInputEvent, MatDatepickerModule } from '@angular/material/datepicker';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'esi-table',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatTableModule,
    MatButtonModule,
    MatPaginatorModule,
    MatSortModule,
    MatIconModule,
    MatOptionModule,
    MatDatepickerModule,
    MatSelectModule,
  ],
  providers: [provideNativeDateAdapter()],
  templateUrl: './esi-table.component.html',
  styleUrl: './esi-table.component.scss',
  changeDetection: ChangeDetectionStrategy.Default
})
export class EsiTableComponent implements OnInit {

  @Input() value: any[];
  @Input() columns: IColumns[] = [];
  @Input() displayedColumns: string[] = [];
  @Input() isFiltered: boolean = true;
  @Input() showPaginator: boolean = true;
  dataSource: MatTableDataSource<any>;
  @Output() onFilter: EventEmitter<any> = new EventEmitter();
  @Output() dateInput: EventEmitter<MatDatepickerInputEvent<any>>


  @ViewChild(MatSort, { static: true })
  sort: MatSort = new MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;


  constructor(public appConfig: AppConfig) {

  }
  ngOnInit(): void {
    this.setData();
  }

  ngAfterViewInit() {
    if (this.showPaginator) {
      this.dataSource.paginator = this.paginator;
    }

  }

  setData() {
    this.dataSource = new MatTableDataSource(this.value);
    this.dataSource.sort = this.sort;
  }

  //#region forFilter
  applyFilter1(event: Event, colName: string) {
    let filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filteredData = this.value.filter((a: any) => {
      return (
        a[colName]
          .toString()
          .toLowerCase()
          .indexOf(filterValue.toLowerCase()) !== -1
      );
    });
    this.dataSource = new MatTableDataSource(this.dataSource.filteredData);
    this.onFilter.emit(this.dataSource.filteredData);
  }

  dateFilter1(event: any, colName: string) {
    let filterValue = event;
    this.dataSource.filteredData = this.value.filter((a: any) => {
      return (
        new Date(a[colName]).toLocaleDateString()
          .indexOf(filterValue.toLowerCase()) !== -1
      );
    });
    this.dataSource = new MatTableDataSource(this.dataSource.filteredData);
    this.onFilter.emit(this.dataSource.filteredData);
  }
  //#endregion

  //#region Düzenlemiş Filtreleme Metotları

  applyFilter(event: Event, colName: string) {
    const filterValue = (event.target as HTMLInputElement).value.trim().toLowerCase();
    // Filtreleme işlemi
    const filteredData = this.value.filter((item: Record<string, any>) => {
      const columnValue = item[colName]?.toString().toLowerCase() || '';
      return columnValue.includes(filterValue);
    });
    // MatTable'daki veriyi güncelleme
    this.dataSource = new MatTableDataSource(filteredData);
    this.dataSource.sort = this.sort;
    // Filtreleme sonrası event tetikleme
    this.onFilter.emit(filteredData);
  }
  dateFilter(event: any, colName: string) {
    const filterValue = new Date(event).toLocaleDateString();
    // Tarih filtresi uygulama
    const filteredData = this.value.filter((item: any) => {
      const itemDate = new Date(item[colName]).toLocaleDateString();
      return itemDate.indexOf(filterValue) !== -1;
    });

    // MatTable'daki veriyi güncelleme
    this.dataSource = new MatTableDataSource(filteredData);
    this.dataSource.sort = this.sort;
    // Filtreleme sonrası event tetikleme
    this.onFilter.emit(filteredData);
  }

  filterColumns(selectedValue: string, colName: string) {

    if (selectedValue != '') {
      // Seçilen değere göre filtreleme işlemi
      const filteredData = this.value.filter((item: any) => {
        return item[colName] === selectedValue;
      });

      // MatTable verisini güncelleme
      this.dataSource = new MatTableDataSource(filteredData);
      this.dataSource.sort = this.sort;
      // Filtreleme sonrası event tetikleme
      this.onFilter.emit(filteredData);
    }
    else {
      // MatTable verisini güncelleme
      this.dataSource = new MatTableDataSource(this.value);
      this.dataSource.sort = this.sort;
    }


  }

  multiplefilterColumns(selectedValues: string[], colName: string) {
    if (selectedValues.length > 0) {
      // Seçilen değerlere göre filtreleme işlemi
      const filteredData = this.value.filter((item: any) => {
        return selectedValues.includes(item[colName]);
      });

      // MatTable verisini güncelleme
      this.dataSource = new MatTableDataSource(filteredData);
      this.dataSource.sort = this.sort;

      // Filtreleme sonrası event tetikleme
      this.onFilter.emit(filteredData);
    } else {
      // Seçim olmadığında tüm veriyi göster
      this.dataSource = new MatTableDataSource(this.value);
      this.dataSource.sort = this.sort;
    }
  }

  clearSelection(dd: any, colName: string) {
    // Seçimleri temizle
    dd.value = [];
    this.multiplefilterColumns([], colName);
  }
  //#endregion
}