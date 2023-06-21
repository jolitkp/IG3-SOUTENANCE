import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LayoutComponent} from "./layout.component";
import {WelcomeComponent} from "../pages/welcome/welcome.component";
import {RoleComponent} from "../role/role.component";
import {SignupComponent} from "../components/signup/signup.component";
import {ProfilComponent} from "../components/profil/profil.component";



const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: 'welcome', component: WelcomeComponent },
      {
        path: 'role',
        component: RoleComponent
      },
      {
        path: 'profil',
        component: ProfilComponent
      },

    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LayoutRoutingModule { }
