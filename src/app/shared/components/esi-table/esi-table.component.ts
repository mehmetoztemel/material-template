import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input, OnInit, ViewChild } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { IColumns } from '../../models/columns';
import { AppConfig } from '../../../app.config';

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
    MatIconModule
  ],
  templateUrl: './esi-table.component.html',
  styleUrl: './esi-table.component.scss',
  changeDetection: ChangeDetectionStrategy.Default
})
export class EsiTableComponent implements OnInit {

  @Input() value: any[];
  @Input() columns: IColumns[] = [];
  @Input() displayedColumns: string[] = [];
  dataSource: MatTableDataSource<any>;
  @ViewChild(MatSort, { static: true })
  sort: MatSort = new MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;


  constructor(public appConfig: AppConfig) {

  }
  ngOnInit(): void {
    this.setData();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  setData() {
    this.dataSource = new MatTableDataSource(this.value);

    this.dataSource.sort = this.sort;
  }
}
