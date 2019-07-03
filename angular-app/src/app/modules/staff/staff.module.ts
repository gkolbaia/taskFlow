import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './components/home/home.component';
import { StaffRoutingModule } from '../staff/staff-routing.module';
import { StaffComponent } from './staff.component';
import { MaterialModule } from 'src/app/material/material.module';

@NgModule({
  declarations: [
    HomeComponent,
    StaffComponent,
  ],
  imports: [
    CommonModule,
    MaterialModule,
    StaffRoutingModule,
  ]
})
export class StaffModule { }
