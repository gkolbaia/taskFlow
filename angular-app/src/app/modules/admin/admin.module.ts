import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from 'src/app/material/material.module';
import { HomeComponent } from '../admin/components/home/home.component';
import { AdminComponent } from './admin.component';
import { AdminRoutingModule } from './admin-routing.module';
import { AddtaskComponent } from './components/addtask/addtask.component';


@NgModule({
  declarations: [
    HomeComponent,
    AdminComponent,
    AddtaskComponent,

  ],
  imports: [
    CommonModule,
    MaterialModule,
    AdminRoutingModule
  ]
})
export class AdminModule { }
