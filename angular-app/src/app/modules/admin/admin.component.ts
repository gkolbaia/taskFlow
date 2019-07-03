import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  shouldRun:boolean = true
  constructor(
    private _authService: AuthService,
    private _router:Router
  ) { }

  ngOnInit() {
  }
  logout(){
    this._authService.logout().subscribe((res) => {
      this._router.navigate(['login']);
      localStorage.removeItem('token');
    })
  }
  get isProfileActive(){
    return location.pathname === '/home/profile';
  };
  get isAddTaskActive(){
    return location.pathname === '/home/addtask';
  };
}
