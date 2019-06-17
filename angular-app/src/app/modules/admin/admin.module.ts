import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from 'src/app/material/material.module';
import { HomeComponent } from '../admin/components/home/home.component';
import { AdminComponent } from './admin.component';
import { AdminRoutingModule } from './admin-routing.module';


@NgModule({
  declarations: [
    HomeComponent,
    AdminComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    AdminRoutingModule
  ]
})
export class AdminModule { }
