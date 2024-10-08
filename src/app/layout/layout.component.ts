import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { ChangeDetectionStrategy, Component, OnInit, signal, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { Router } from '@angular/router';
import { menuItems } from '../menu-items';
import { AppConfig } from '../app.config';

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
    this.breakpointObserver.observe([Breakpoints.XSmall, Breakpoints.Small, Breakpoints.Medium, Breakpoints.Large])
    .subscribe(result => {
      if (result.breakpoints[Breakpoints.XSmall]) {
        console.log('xs');
        this.appConfig.grid.cols = 1;
        this.appConfig.isMobile = true;
      } else if (result.breakpoints[Breakpoints.Small]) {
        console.log('s');
        this.appConfig.grid.cols = 2;
        this.appConfig.isMobile = true;
      } else if (result.breakpoints[Breakpoints.Medium]) {
        console.log('m');
        this.appConfig.grid.cols = 3;
        this.appConfig.isMobile = false;
      } else if (result.breakpoints[Breakpoints.Large]) {
        console.log('l');
        this.appConfig.grid.cols = 4;
        this.appConfig.isMobile = false;
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