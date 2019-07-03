import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router } from '@angular/router';
import { LoadingService } from 'src/app/services/loading.service';
import { CommonService } from 'src/app/modules/shared/services/common.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  imageUrl: string | ArrayBuffer
  image: File;
  loginForm: FormGroup;
  registerForm: FormGroup;
  header: string = 'Login'
  constructor(
    private loadingService: LoadingService,
    private _fb: FormBuilder,
    private _service: AuthService,
    private _flashMessages: FlashMessagesService,
    private _router: Router,
    private _commonService: CommonService

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
      role: null,
      image: null
    })
  }

  ngOnInit() {
    if (this._service.getToken()) {
      this._commonService.getStaff().subscribe(
        res => {
          if (res && res['role'] === 'manager') {
            this._router.navigate(['/home']);
          } else if (res && res['role'] === 'staff') {
            this._router.navigate(['/staff/home']);
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
            this._router.navigate(['staff/home'])
          }
        },
        err => {
          console.log(err);
          this._flashMessages.show(err.error.message, { cssClass: 'alert-danger', timeout: 1500 });
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
            var image = new FormData();
            console.log(this.image);
            image.append('image', this.image, this.registerForm.value['userName'] + '.' + this.image.name.split('.')[this.image.name.split('.').length - 1]);
            this._service.uploadStaffImage(image).subscribe(image => {
              localStorage.setItem('token', res['token']);
              if (res['staff']['role'] === 'manager') {
                this._router.navigate(['/home'])
              } else {
                this._router.navigate(['/staff/home'])
              }
            })
          },
          err => {
            this._flashMessages.show(err.error.message, {
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
  onFileChange(e) {
    if (e.target.files) {
      if (this.checkImageType(e.target.files[0])) {
        this.image = e.target.files[0];
        this.renderImage(e);
      } else {
        this._flashMessages.show('images Only', {
          cssClass: 'alert-danger', timeout: 1500
        })
      }
    };
  };
  checkImageType(file) {
    const fileTypes = /jpeg|jpg|png|gif/;
    const type = fileTypes.test(file.name);
    if (type) {
      return true;
    } else {
      return false
    }
  };
  renderImage(e) {
    var self = this;
    var file = e.target.files[0];
    var reader = new FileReader();
    reader.onload = function () {
      self.imageUrl = reader.result;
    }
    reader.readAsDataURL(file);
  }
}
