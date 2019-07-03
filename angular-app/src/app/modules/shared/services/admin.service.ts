import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(
    private _http: HttpClient,
    private _router: Router
  ) { }
  iseTesti() {
    return this._http.get('api/admin/testi').pipe(map(res => res), catchError(this.errorHandler));
  }
  errorHandler(err) {
    if (err.status === 401 || err.status === 403) {
      this._router.navigate(['/login']);
      localStorage.removeItem('token');

    }
    return throwError(err)
  };
}
