import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatOptionModule, provideNativeDateAdapter } from '@angular/material/core';
import { MatDatepickerInputEvent, MatDatepickerModule } from '@angular/material/datepicker';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSelect, MatSelectModule } from '@angular/material/select';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { AppConfig } from '../../../app.config';
import { IColumns } from '../../models/components/columns';
import { IDropdownOption } from '../../models/components/dropdownOption';
import { ColumnType } from '../../models/components/enums/columnTypeEnum';

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

  dropdownOptions: IDropdownOption[] = [];
  closeIcon: boolean = false;
  @Input() value: any[];
  @Input() columns: IColumns[] = [];
  @Input() displayedColumns: string[] = [];
  @Input() isFiltered: boolean = true;
  @Input() showPaginator: boolean = true;
  dataSource: MatTableDataSource<any>;
  @Output() onFilter: EventEmitter<any> = new EventEmitter();
  @Output() dateInput: EventEmitter<MatDatepickerInputEvent<any>>
  dropDownOptionsMap: { [key: string]: IDropdownOption[] } = {};

  @ViewChild(MatSort, { static: true })
  sort: MatSort = new MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  filterState: { [key: string]: any[] } = {};

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

  setData(source?: any[]) {
    if (source == null) {
      this.dataSource = new MatTableDataSource(this.value);
      this.dataSource.sort = this.sort;
    }
    else {
      this.dataSource = new MatTableDataSource(source);
      this.dataSource.sort = this.sort;
    }
    this.updateDropdownOptions();
    this.dataSource.paginator = this.paginator;
  }

  updateDropdownOptions() {
    this.columns.forEach(column => {
      if (column.filter === ColumnType.dropDown || column.filter === ColumnType.multiSelect) {
        let dropdownOptions: IDropdownOption[] = [];
        if (column.opt?.length > 0) {
          dropdownOptions = column.opt
            .filter(opt => this.dataSource.data.some((x: any) => x[column.field] === opt.value))
            .map(opt => ({
              viewValue: opt.value,
              value: opt.value
            }));
        }
        else {
          const uniqueValues = Array.from(
            new Set(this.dataSource.data.map((x: any) => x[column.field]))
          ).filter(value => value != null && value !== "");

          dropdownOptions = uniqueValues.map(option => ({
            viewValue: option,
            value: option
          }));
        }
        this.dropDownOptionsMap[column.field] = dropdownOptions;
      }
    });
  }

  //#region Düzenlemiş Filtreleme Metotları
  applyFilter(event: Event, colName: string) {
    const filterValue = (event.target as HTMLInputElement).value.trim().toLowerCase();
    const filteredData = this.value.filter((item: Record<string, any>) => {
      const columnValue = item[colName]?.toString().toLowerCase() || '';
      return columnValue.includes(filterValue);
    });
    this.setData(filteredData);
    this.onFilter.emit(filteredData);
  }

  dateFilter(event: any, colName: string) {
    const filterValue = new Date(event).toLocaleDateString();
    const filteredData = this.value.filter((item: any) => {
      const itemDate = new Date(item[colName]).toLocaleDateString();
      return itemDate.indexOf(filterValue) !== -1;
    });
    this.setData(filteredData);
    this.onFilter.emit(filteredData);
  }

  dropDownFilterColumns(selectedValue: any, colName: string) {
    if (selectedValue !== '') {
      this.closeIcon = true;
      this.filterState[colName] = selectedValue;
    } else {
      delete this.filterState[colName];
      this.closeIcon = false;
    }
    this.applyFilters();
  }

  multiSelectFilterColumns(selectedValues: string[], colName: string) {
    if (selectedValues.length > 0) {
      this.closeIcon = true;
      if(this.filterState[colName] == null ){
        this.filterState[colName] = []
      }
      this.filterState[colName].push( selectedValues);
    } 
    else {
      delete this.filterState[colName];
      this.closeIcon = false;
    }
    this.applyFilters();
  }

  applyFilters() {
    let filteredData = this.value;
    for (const colName in this.filterState) {
      const filterValue = this.filterState[colName];
      console.log(filterValue);
      
      if (Array.isArray(filterValue)) {
        filteredData = filteredData.filter((item: any) => filterValue.includes(item[colName]));
      } else {
        filteredData = filteredData.filter((item: any) => item[colName] === filterValue);
      }
    }
    this.setData(filteredData);
    this.onFilter.emit(filteredData);
  }

  clearDropDownSelection(dropDown: MatSelect, colName: string) {
    dropDown.value = null;
    delete this.filterState[colName];
    this.applyFilters();
  }

  //#endregion


}