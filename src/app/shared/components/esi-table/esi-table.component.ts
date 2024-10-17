import { CommonModule, DatePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatOptionModule, provideNativeDateAdapter } from '@angular/material/core';
import { MatDatepicker, MatDatepickerInputEvent, MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
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
    MatFormFieldModule,
    FormsModule,
    MatInputModule
  ],
  providers: [provideNativeDateAdapter(),DatePipe],
  templateUrl: './esi-table.component.html',
  styleUrl: './esi-table.component.scss',
  changeDetection: ChangeDetectionStrategy.Default
})
export class EsiTableComponent implements OnInit {

  dropdownOptions: IDropdownOption[] = [];
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
  filterState: { [key: string]: any } = {};

  constructor(public appConfig: AppConfig,private datePipe : DatePipe) {

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
  textFilter(event: Event, colName: string) {
    const filterValue = (event.target as HTMLInputElement).value.trim().toLowerCase();
    const filteredData = this.value.filter((item: Record<string, any>) => {
      const columnValue = item[colName]?.toString().toLowerCase() || '';
      return columnValue.includes(filterValue);
    });
    this.setData(filteredData);
    this.onFilter.emit(filteredData);
  }

  dateFilter(event: Date | null, colName: string) {
    if (event) {
      const filterValue = this.datePipe.transform(event, 'yyyy-MM-dd');
      this.filterState[colName] = filterValue;
    } else {
      delete this.filterState[colName];
    }
    this.applyFilters();
  }

  clearDateFilter(input: HTMLInputElement, picker: MatDatepicker<any>, colName: string) {
    console.log(picker);

    picker.select(null);
    input.value = '';
    delete this.filterState[colName];
    this.applyFilters();
  }

  dropDownFilterColumns(selectedValue: any, colName: string) {
    if (selectedValue !== '') {
      this.filterState[colName] = selectedValue;
    } else {
      delete this.filterState[colName];
    }
    this.applyFilters();
  }

  multiSelectFilterColumns(selectedValues: string[], colName: string) {
    if (selectedValues.length > 0) {
      this.filterState[colName] = selectedValues;
    }
    else {
      delete this.filterState[colName];
    }
  }

  applyFilters(matSelect? : MatSelect) {
    let filteredData = [...this.value];
    // type'ı 'date' olan column'un field adını bul
    const dateColumn = this.columns.find(col => col.type === ColumnType.date)?.field;

    for (const colName in this.filterState) {
      const filterValue = this.filterState[colName];
      if (Array.isArray(filterValue)) {
        // Çoklu seçim filtresi uygula
        filteredData = filteredData.filter((item: any) => filterValue.includes(item[colName]));
      } else {
        if (colName === dateColumn) {
          // Tarih filtresini uygula
          filteredData = filteredData.filter((item: any) => {
            const itemDate = new Date(item[colName]).toLocaleDateString();
            const filterDate = new Date(filterValue).toLocaleDateString();
            // Tarihlerin aynı olup olmadığını kontrol et
            return itemDate === filterDate;
          });
        } else {
          // Metin veya dropdown filtresi uygula
          filteredData = filteredData.filter((item: any) =>
            item[colName]?.toString().toLowerCase().includes(filterValue.toLowerCase())
          );
        }
      }
    }
    matSelect?.close()
    this.setData(filteredData);
    this.onFilter.emit(filteredData);
  }
  clearDropDownSelection(matSelect: MatSelect, colName: string) {    
    if (Array.isArray(matSelect.value)) {
      matSelect.value = [];
    }
    else {
      matSelect.value = null;
    }
    delete this.filterState[colName];
    this.applyFilters(matSelect);
  }

  dropDownSearch(event: Event, col: IColumns) {
    this.updateDropdownOptions();
    const filterValue = (event.target as HTMLInputElement).value.toLowerCase();
    this.dropDownOptionsMap[col.field] = this.dropDownOptionsMap[col.field].filter(option => {
      const viewValue = option.viewValue ? option.viewValue.toString().toLowerCase() : '';
      return viewValue.includes(filterValue);
    });
  }

  //#endregion
}