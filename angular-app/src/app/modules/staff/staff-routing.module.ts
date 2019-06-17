import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { StaffComponent } from './staff.component';
import { HomeComponent } from './components/home/home.component';
const routes: Routes = [
  {
    path: '',
    component: StaffComponent,
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'main' },
      { path: 'main', component: HomeComponent }
    ]
  }
]
@NgModule({
  declarations: [],
  exports: [RouterModule],
  imports: [RouterModule.forRoot(routes)],
})
export class StaffRoutingModule { }
