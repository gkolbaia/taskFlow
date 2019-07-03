import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-staff',
  templateUrl: './staff.component.html',
  styleUrls: ['./staff.component.css']
})
export class StaffComponent implements OnInit {

  constructor(
    private _authService: AuthService,
    private _router: Router
  ) { }

  ngOnInit() {
  }
  logout() {
    this._authService.logout().subscribe(
      res => {
        this._router.navigate(['login']);
        localStorage.removeItem('token');
      }
    )
  }
  get isProfileActive() {
    return location.pathname === '/staff/profile';
  }
}
