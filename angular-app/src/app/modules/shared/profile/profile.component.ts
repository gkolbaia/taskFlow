import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { LoadingService } from 'src/app/services/loading.service';
import { CommonService } from '../services/common.service';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  disabled: boolean = true;
  staff: any;
  element = document.querySelector('.profile');
  staffForRender: { email: string; role: string; registrationDate: Date; userName: string; };
  date: Date = new Date();
  un: boolean = true;
  em: boolean = true;
  profileImagePath: string;
  emailForm: FormGroup;
  userNameForm: FormGroup;
  constructor(
    readonly _authService: AuthService,
    private _loadingService: LoadingService,
    private _commonService: CommonService,
    private _fb: FormBuilder
  ) { }

  ngOnInit() {
    this._commonService.getStaff().subscribe(
      res => {
        this.staff = JSON.parse(JSON.stringify(res));
        this.staff.regiterDate = new Date(this.staff.regiterDate);
        this.profileImagePath = `http://localhost:3000/shared/getposter?path=${this.staff.imagePath}&auth=${this._authService.getToken()}`;
        this.emailForm = this._fb.group({
          email: this.staff.email
        });
        this.userNameForm = this._fb.group({
          userName: this.staff.userName
        })
      }
    )
  }
  displayEdit(element) {
    if ((element === 'userName' && this.un === true) || (element === 'email' && this.em === true)) {
      this.changeDisplat(element)
    }
  }
  edit(value, type, e) {
    e.stopPropagation();
    if ((type === 'email' && this.emailForm.valid) || (type === 'userName' && this.userNameForm.valid)) {
      if (value === this.staff[type]) {
        this.changeDisplat(type);
      } else {
        var formTosend = { key: type, value: value };
        this._commonService.editStaff(formTosend).subscribe(res => {
          for (const key in res) {
            if (res.hasOwnProperty(key) && key !== '_id') {
              this.staff[key] = res[key]
            }
          }
          this.changeDisplat(type);
        });
      }
    }
  };
  changeDisplat(element) {
    if (element === 'userName') {
      this.un = !this.un;
    } else if (element === 'email') {
      this.em = !this.em;
    }
  }
  onFileChange(e) {
    var image = new FormData();
    image.append('image', e.target.files[0], this.staff['userName'] + '.' + e.target.files[0].name.split('.')[e.target.files[0].name.split('.').length - 1]);
    this._commonService.editProfileImage(image).subscribe(
      res => {
        this.profileImagePath = `http://localhost:3000/shared/getposter?path=${res['imagePath']}&auth=${this._authService.getToken()}`
      },
      err => { console.log(err); }
    )
  }
}
