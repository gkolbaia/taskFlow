import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { StaffComponent } from './staff.component';
import { HomeComponent } from './components/home/home.component';
import { StaffGuard } from 'src/app/services/staff.guard';
import { ProfileComponent } from '../shared/profile/profile.component';
const routes: Routes = [
  {
    path: 'staff',
    component: StaffComponent,
    canActivate: [StaffGuard],
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'home' },
      { path: 'home', component: HomeComponent },
      { path: 'profile', component: ProfileComponent },
    ]
  }
]
@NgModule({
  declarations: [],
  exports: [RouterModule],
  imports: [RouterModule.forRoot(routes)],
})
export class StaffRoutingModule { }
