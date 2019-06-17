import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './modules/admin/components/home/home.component';
import { AuthGuardGuard } from './services/auth-guard.guard';
import { AuthComponent } from './modules/auth/auth.component';

const routes: Routes = [
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
