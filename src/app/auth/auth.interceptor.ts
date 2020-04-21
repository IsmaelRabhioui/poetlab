import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private _router: Router) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    var storage =
      localStorage.getItem('token') == null ? sessionStorage : localStorage;
    if (storage.getItem('token') != null) {
      const clonedReq = req.clone({
        headers: req.headers.set(
          'Authorization',
          'Bearer ' + storage.getItem('token')
        )
      });
      return next.handle(clonedReq).pipe(
        tap(
          succ => {},
          err => {
            if (err.status == 401 || err.status == 500 || err.status == 504) {
              storage.removeItem('token');
              storage.removeItem('username');
              storage.setItem('rememberMe', 'false');
              this._router.navigateByUrl('/user/login');
            }
          }
        )
      );
    } else {
      return next.handle(req.clone());
    }
  }
}
