import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { LoginComponent } from './components/login/login.component';
import { AuthComponent } from './auth.component';



const routes: Routes =
  [
    {
      path: '',
      component: AuthComponent,
      children: [
        { path: '', pathMatch: 'full', redirectTo: 'login' },
        { path: 'login', component: LoginComponent },
      ]
    }
  ]

@NgModule
  (
    {
      exports: [RouterModule],
      imports: [RouterModule.forRoot(routes)],
    }
  )
export class authRoutingModule {

}
