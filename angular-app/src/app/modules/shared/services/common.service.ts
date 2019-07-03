import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { throwError } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class CommonService {

  constructor(
    private _http: HttpClient,
    private _router: Router
  ) { }
  editStaff(staff) {
    return this._http.post('api/shared/editstaff', staff).pipe(map(res => res, catchError(this.errorHandler)));
  }
  getStaff() {
    return this._http.get('api/shared/getuser').pipe(map(res => res, catchError(this.errorHandler)))
  };
  errorHandler(err) {
    if (err.status === 401 || err.status === 403) {
      this._router.navigate(['/login']);
      localStorage.removeItem('token');

    }
    return throwError(err)
  };
  capitalizeLetters(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };
  editProfileImage(image) {
    return this._http.post('api/shared/editimage', image).pipe(map(res => res), catchError(this.errorHandler));
  }

}
