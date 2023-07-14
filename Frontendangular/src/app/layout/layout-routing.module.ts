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
import { RoleEditComponent } from '../role-edit/role-edit.component';
import { ProjetCreationComponent} from'../projet-creation/projet-creation.component';
import { FormulaireComponent } from '../formulaire/formulaire.component';
import { CreationProjetComponent } from '../creation-projet/creation-projet.component';
const routes: Routes = [
  {
  
    path: '',
    component: LayoutComponent,
    children: [
      { path: 'welcome', component: WelcomeComponent },
      { path: 'formulaire', component: FormulaireComponent },

      {
        path: 'role',
        component: RoleComponent
      },
      {
      path: 'creation-projet',
      component: CreationProjetComponent
      },
      {
        path: 'projet-creation',
        component: ProjetCreationComponent
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
      {
        path: 'role/edit/:id',
        component: RoleEditComponent
      },

    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LayoutRoutingModule { }
