import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { ProfilComponent } from './components/profil/profil.component';
import { RequestResetComponent } from './components/password/request-reset/request-reset.component';
import { ResponseResetComponent } from './components/password/response-reset/response-reset.component';
import { LayoutComponent } from './layout/layout.component';
import { RoleComponent } from './role/role.component';



const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'login' },
  { path: 'welcome', loadChildren: () => import('./app.module').then(m => m.AppModule) },
  { path: 'projet-creation', loadChildren: () => import('././main/main.module').then(m => m.MainModule) },

  {
    path: 'login',
    component: LoginComponent
    
  },
 
  {
    path: 'layout',
    component: LayoutComponent
  },

  {
    path: 'role',
    component: RoleComponent
  },

  {
    path: 'signup',
    component: SignupComponent
  },

  {
    path: 'profil',
    component: ProfilComponent
  },

  {
    path: 'request-password-reset',
    component: RequestResetComponent
  },

  {
    path: 'response-password-reset',
    component: ResponseResetComponent
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
