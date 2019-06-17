import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router } from '@angular/router';
import { LoadingService } from 'src/app/services/loading.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  registerForm: FormGroup;
  header: string = 'Login'
  constructor(
    private loadingService: LoadingService,
    private _fb: FormBuilder,
    private _service: AuthService,
    private _flashMessages: FlashMessagesService,
    private _router: Router

  ) {
    this.loginForm = this._fb.group({
      userName: null,
      password: null
    });
    this.registerForm = this._fb.group({
      userName: null,
      email: null,
      password: null,
      repeatPassword: null,
      role: null
    })
  }

  ngOnInit() {
    if (this._service.getToken()) {
      this._service.getUser().subscribe(
        res => {
          if (res) {
            this._router.navigate(['/home']);
          };
        }
      )
    }
  };
  onLoginSubmit() {
    if (this.loginForm.valid) {
      this._service.login(this.loginForm.value).subscribe(
        res => {
          localStorage.setItem('token', res['token']);
          if (res['user']['role'] === 'manager') {
            this._router.navigate(['/home'])
          } else if (res['user']['role'] === 'staff') {
            this._router.navigate(['/main'])
          }
        },
        err => {
          this._flashMessages.show(err.error, { cssClass: 'alert-danger', timeout: 1500 });
        })
    } else {
      this._flashMessages.show('Fill in Fields', { cssClass: 'alert-danger', timeout: 1500 })
    }
  };
  onRegisterSubmit() {
    if (this.registerForm.valid) {
      if (this.registerForm.value.password === this.registerForm.value.repeatPassword) {
        this._service.register(this.registerForm.value).subscribe(
          res => {
            localStorage.setItem('token', res['token']);
            if (res['user']['role'] === 'manager') {
              this._router.navigate(['/home'])
            } else {
              //aq chveulebrivi tanamshromeli
            }

          },
          err => {
            this._flashMessages.show(err.error, {
              cssClass: 'alert-danger', timeout: 2500
            })
          }
        )
      } else {
        this._flashMessages.show('Password Does Not Match', {
          cssClass: 'alert-danger', timeout: 1500
        });
      }
    } else {
      this._flashMessages.show('Fill In All Fields', {
        cssClass: 'alert-danger', timeout: 1500
      })
    }
  };
  logChange(value) {
    if (value === 0) {
      this.header = "Login"
    } else {
      this.header = "Registration"
    }
  };
}
