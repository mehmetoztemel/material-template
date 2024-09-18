import { Injectable } from "@angular/core";
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";


@Injectable({
  providedIn: 'root'
})

export class AuthGuard  {
  constructor(private router: Router) { }
  canActivate(
    route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (localStorage.getItem("token")) {
      return true;
    }
    else {
      // this.router.navigate(['/auth/login'], { skipLocationChange: true });
      this.router.navigateByUrl('/auth/login', { skipLocationChange: true });
      return false;
    }
  }
}
