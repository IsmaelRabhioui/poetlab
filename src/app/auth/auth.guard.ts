import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router
} from '@angular/router';
import { Observable } from 'rxjs';
import { CanActivate } from '@angular/router/src/utils/preactivation';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  path: ActivatedRouteSnapshot[];
  route: ActivatedRouteSnapshot;

  constructor(private _router: Router) {}

  canActivate(): boolean {
    if (
      (localStorage.getItem('token') != null &&
        localStorage.getItem('logout') != 'true') ||
      sessionStorage.getItem('token') != null
    ) {
      return true;
    } else {
      this._router.navigateByUrl('/user/login');
      return false;
    }
  }
}
