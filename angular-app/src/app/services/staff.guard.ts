import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class StaffGuard implements CanActivate {

  constructor(
    private _service: AuthService,
    private _router: Router
  ) {

  }
  canActivate() {
    return this.checkStaffLogin();
  }
  checkStaffLogin() {
    return this._service.isStaffLogggedIn.pipe(tap(isLoggedIn => {
      if (isLoggedIn) { return }
      this._router.navigate(['/'])
    }))
  }
}
