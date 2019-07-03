import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { LoadingService } from 'src/app/services/loading.service';
import { CommonService } from 'src/app/modules/shared/services/common.service';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  staff: any;
  constructor(
    readonly _authService: AuthService,
    private _router: Router,
    private _loadingService: LoadingService,
    private _commonService: CommonService,
    private http: HttpClient
  ) { }

  ngOnInit() {
    this._commonService.getStaff().subscribe(res => {
      this.staff = JSON.parse(JSON.stringify(res));
      // this._authService.sessionNest.subscribe(res => { console.log(res); })
    });
  }
  logout() {
    this._authService.logout().subscribe(res => {
      localStorage.removeItem('token');
      this._router.navigate(['/'])
    })
  }

}
