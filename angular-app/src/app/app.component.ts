import { Component, OnInit } from '@angular/core';
import { LoadingService } from './services/loading.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'angular-app';
  loading: boolean = false;
  constructor(
    private _loadingService: LoadingService
  ) {

  }
  ngOnInit() {
    this._loadingService.loading.subscribe(
      loading => {
      this.loading = loading
      }
    )
  }
}
