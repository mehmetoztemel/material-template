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
    const gridConfig = {
      [Breakpoints.XSmall]: { cols: 1, colspan: 1, isMobile: true, label: 'xs' },
      [Breakpoints.Small]: { cols: 2, colspan: 2, isMobile: true, label: 's' },
      [Breakpoints.Medium]: { cols: 2, colspan: 1, isMobile: false, label: 'm' },
      [Breakpoints.Large]: { cols: 2, colspan: 1, isMobile: false, label: 'l' },
      [Breakpoints.XLarge]: { cols: 2, colspan: 1, isMobile: false, label: 'xl' },
    };

    this.breakpointObserver.observe(Object.keys(gridConfig))
    .subscribe(result => {
      if (result.matches) {
        if (result.breakpoints[Breakpoints.XSmall]) {
          this.setAppConfig(gridConfig[Breakpoints.XSmall]);
        }
        else if (result.breakpoints[Breakpoints.Small]) {
          this.setAppConfig(gridConfig[Breakpoints.Small]);
        }
        else if (result.breakpoints[Breakpoints.Medium]) {
          this.setAppConfig(gridConfig[Breakpoints.Medium]);
          this.isCollapsed=true;
        }
        else if (result.breakpoints[Breakpoints.Large]) {
          this.setAppConfig(gridConfig[Breakpoints.Large]);
          this.isCollapsed=false;
        }
        else if (result.breakpoints[Breakpoints.XLarge]) {
          this.setAppConfig(gridConfig[Breakpoints.XLarge]);
          this.isCollapsed=false;
        }
      }
    });

    // this.observer.observe(['(max-width: 800px)']).subscribe((screenSize) => {
    //   if (screenSize.matches) {
    //     this.appConfig.isMobile = true;
    //     this.appConfig.cols = 1;
    //   } else {
    //     this.appConfig.isMobile = false;
    //     this.appConfig.cols = 2;
    //   }
    // });

    // this.breakpointObserver.observe([
    //   Breakpoints.XSmall,
    //   Breakpoints.Small,
    //   Breakpoints.Medium,
    //   Breakpoints.Large,
    //   Breakpoints.XLarge
    // ]).subscribe(result => {
    //     if (result.matches) {
    //       if (result.breakpoints[Breakpoints.XSmall] || result.breakpoints[Breakpoints.Small]) {
    //         // console.log('xs or s');
    //         this.appConfig.isMobile = true;
    //       } else if (result.breakpoints[Breakpoints.Medium]) {
    //         // console.log('m or l');
    //         this.appConfig.isMobile = false;
    //         this.isCollapsed=true;
    //       } else if (result.breakpoints[Breakpoints.Large] || result.breakpoints[Breakpoints.XLarge]) {
    //         // console.log('xl');
    //         this.appConfig.isMobile = false;
    //         this.isCollapsed=false;
    //       }
    //     }
    //   });
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

  private setAppConfig(config: any, logLabel: string = '') {
    this.appConfig.gridConfig.cols = config.cols;
    this.appConfig.gridConfig.colspan = config.colspan;
    this.appConfig.isMobile = config.isMobile;
  }

  LogOut() {
    const rememberMe = localStorage.getItem("rememberMe");
    if (rememberMe == null) {
      localStorage.clear();
    }
    this.router.navigateByUrl('auth/login');
  }
}