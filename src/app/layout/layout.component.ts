import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { ChangeDetectionStrategy, Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { Router } from '@angular/router';
import { AppConfig } from '../app.config';
import { menuItems } from '../menu-items';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss',
  changeDetection: ChangeDetectionStrategy.Default,
})
export class LayoutComponent implements OnInit {

  @ViewChild(MatSidenav)
  sidenav!: MatSidenav;
  isCollapsed = false;
  userInfo: string;
  menuItems = menuItems;

  constructor(private breakpointObserver: BreakpointObserver, private router: Router, public appConfig: AppConfig) { }

  ngOnInit() {
    this.userInfo = localStorage.getItem("userName");
    // this.observer.observe(['(max-width: 800px)']).subscribe((screenSize) => {
    //   if (screenSize.matches) {
    //     this.appConfig.isMobile = true;
    //     this.appConfig.cols = 1;
    //   } else {
    //     this.appConfig.isMobile = false;
    //     this.appConfig.cols = 2;
    //   }
    // });
    this.breakpointObserver.observe([
      Breakpoints.XSmall,
      Breakpoints.Small,
      Breakpoints.Medium,
      Breakpoints.Large,
      Breakpoints.XLarge
    ])
      .subscribe(result => {
        if (result.matches) {
          if (result.breakpoints[Breakpoints.XSmall] || result.breakpoints[Breakpoints.Small]) {
            // console.log('xs or s');
            this.appConfig.grid.cols = 1;
            this.appConfig.isMobile = true;
          } else if (result.breakpoints[Breakpoints.Medium] || result.breakpoints[Breakpoints.Large]) {
            // console.log('m or l');
            this.appConfig.grid.cols = 2;
            this.appConfig.isMobile = false;
          } else if (result.breakpoints[Breakpoints.XLarge]) {
            // console.log('xl');
            this.appConfig.grid.cols = 3;
            this.appConfig.isMobile = false;
          }
        }
      });
  }

  toggleMenu() {
    if (this.appConfig.isMobile) {
      this.sidenav.toggle();
      this.isCollapsed = false;
    } else {
      this.sidenav.open();
      this.isCollapsed = !this.isCollapsed;
    }
  }

  LogOut() {
    const rememberMe = localStorage.getItem("rememberMe");
    if (rememberMe == null) {
      localStorage.clear();
    }
    this.router.navigateByUrl('auth/login');
  }
}