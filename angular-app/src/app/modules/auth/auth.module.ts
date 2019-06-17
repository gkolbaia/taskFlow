import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './components/login/login.component';
import { FlashMessagesModule } from 'angular2-flash-messages';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/material/material.module';
import { AuthComponent } from './auth.component';
import { authRoutingModule } from './auth-routing.module';



@NgModule({
  declarations: [
    LoginComponent,
    AuthComponent
  ],
  imports: [
    CommonModule,
    FlashMessagesModule.forRoot(),
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    authRoutingModule

  ]
})
export class AuthModule { }
