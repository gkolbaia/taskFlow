import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { LoadingService } from 'src/app/services/loading.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  user: any;
  constructor(
    private _loadingService: LoadingService,
    private _service: AuthService,
    private _router: Router
  ) { }

  ngOnInit() {
    this._service.getUser().subscribe(
      res => {
        this._loadingService.showLoading();
        this.user = JSON.parse(JSON.stringify(res))
        this._loadingService.hideLoading()
      },
      err => {
        console.log(err);
      }
    )
  };
  logout() {
    this._service.logout().subscribe(res => {
      localStorage.removeItem('token');
      this._router.navigate(['/']);
    });
  };
}
