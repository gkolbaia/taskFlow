import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, catchError } from "rxjs/operators";
import { of, throwError } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private _http: HttpClient,
    private _router: Router
  ) { }
  getToken() {
    return localStorage.getItem('token');
  };
  register(registerForm) {
    return this._http.post('api/auth/register', registerForm)
  };
  login(loginForm) {
    return this._http.post('api/auth/login', loginForm).pipe(map(res => res), catchError(this.errorHandler));
  };
  // loginNest(loginForm) {
  //   return this._http.post('http://localhost:3000/auth/login', loginForm).pipe(map(res => res), catchError(this.errorHandler));
  // }
  get session() {
    return this._http.get('api/auth/permission');
  };
  // get sessionNest() {
  //   return this._http.get('http://localhost:3000/auth/permission').pipe(map(res => {
  //     return res;
  //   }
  //   ), catchError(this.errorHandler));
  // }
  get isLoggedIn() {
    return this.session.pipe(map(this.checklogin), catchError(() => of(false)))
  };
  checklogin(res) {
    if (res['permission'] && res['role'] === 'manager') {
      return true
    } else if (res['role'] === 'staff') {
      window.location.href = '/staff/main';
      return false
    } else {
      window.location.href = '/';
      return false
    }
  };
  get isStaffLogggedIn() {
    return this.session.pipe(map(this.checkLoginStaff), catchError(() => of(false)))
  }
  checkLoginStaff(res) {
    if (res['permission'] && res['role'] === 'staff') {
      return true;
    } else {
      if (res['role'] === 'manager') {
        window.location.href = '/home'
      } else {
        window.location.href = '/'
        return false
      }
    }
  }
  errorHandler(err) {
    if (err.status === 401 || err.status === 403) {
      localStorage.removeItem('token');
      this._router.navigate(['/']);
    }
    return throwError(err)
  };
  logout() {
    return this._http.get('api/auth/logout').pipe(map(res => res), catchError(this.errorHandler))
  };
  uploadStaffImage(image) {
    return this._http.post('api/auth/imageUpload', image).pipe(map(res => res), catchError(this.errorHandler))
  }
  // nestUpload(image){
  //   return this._http.post('http://localhost:3000', image).pipe(map(res => res), catchError(this.errorHandler))
  // }
}
