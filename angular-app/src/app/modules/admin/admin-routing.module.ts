import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AdminComponent } from './admin.component';
import { HomeComponent } from './components/home/home.component';
import { AuthGuardGuard } from 'src/app/services/auth-guard.guard';
import { ProfileComponent } from '../shared/profile/profile.component';
import { AddtaskComponent } from './components/addtask/addtask.component';


const routes: Routes =
  [
    {
      path: 'home',
      component: AdminComponent,
      canActivate: [AuthGuardGuard],
      children: [
        { path: '', component: HomeComponent },
        { path: 'profile', component: ProfileComponent },
        { path: 'addtask', component: AddtaskComponent }
      ],
    }
  ];

@NgModule
  (
    {
      exports: [RouterModule],
      imports: [RouterModule.forRoot(routes)],
    }
  )
export class AdminRoutingModule {

}
