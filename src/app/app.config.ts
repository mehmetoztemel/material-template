import { Injectable } from "@angular/core";
import { MatCalendarCellClassFunction } from "@angular/material/datepicker";

@Injectable()
export class AppConfig {
  public Server = 'http://localhost:5604/';
  // public Server = 'http://192.168.5.128:8000/';
  public Api: string = 'api/';
  public ApiUrl = this.Server + this.Api;
  public isMobile: boolean = false;
  // public cols: number = 2;
  public grid = {
    cols: 4,
    // rowHeight: '80px',
    // gutterSize: '5px'
  };

  public dateClass: MatCalendarCellClassFunction<Date> = (cellDate, view) => {
    if (view === 'month') {
      const day = cellDate.getDay();
      return day === 6 || day === 0 ? 'set-weekends' : '';
    }
    return '';
  };
}
