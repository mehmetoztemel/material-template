import { Injectable } from "@angular/core";
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";


@Injectable({
  providedIn: 'root'
})

export class AuthGuard {
  constructor(private router: Router) { }
  canActivate(
    route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (localStorage.getItem("Token")) {
      return true;
    }
    else {
      this.router.navigateByUrl('/auth/login', { skipLocationChange: true });
      return false;
    }
  }
}
