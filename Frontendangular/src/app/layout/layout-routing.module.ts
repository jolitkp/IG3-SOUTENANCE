import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LayoutComponent} from "./layout.component";
import {WelcomeComponent} from "../pages/welcome/welcome.component";
import {RoleComponent} from "../role/role.component";
import {SignupComponent} from "../components/signup/signup.component";
import {ProfilComponent} from "../components/profil/profil.component";
import { UsersComponent } from '../components/users/users.component';
import { UserCreateComponent } from '../components/user-create/user-create.component';
import { RoleCreateComponent } from '../role-create/role-create.component';



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
      {
        path: 'users',
        component: UsersComponent
      },
      {
        path: 'users/create',
        component: UserCreateComponent
      },
      {
        path: 'role/create',
        component: RoleCreateComponent
      },

    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LayoutRoutingModule { }
