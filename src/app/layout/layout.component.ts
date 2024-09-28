import { BreakpointObserver } from '@angular/cdk/layout';
import { ChangeDetectionStrategy, Component, OnInit, signal, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { Router } from '@angular/router';
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
  isMobile = true;
  isCollapsed = false;
  userInfo: string;
  menuItems = menuItems;
  constructor(private observer: BreakpointObserver, private router: Router) { }

  ngOnInit() {
    this.userInfo = localStorage.getItem("userName");
    this.observer.observe(['(max-width: 800px)']).subscribe((screenSize) => {
      if (screenSize.matches) {
        this.isMobile = true;
      } else {
        this.isMobile = false;
      }
    });
  }

  toggleMenu() {
    if (this.isMobile) {
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