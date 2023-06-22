//import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

    email: string='';
    password: string='';


  public error = null;

  constructor(private auth: AuthService, private router:Router){}



  onSubmit() {
    this.auth.login(this.email, this.password)
    .subscribe(
     
      (response:any)=>{
        //console.log(res),
        const accessToken = response['access_token'];
        localStorage.setItem('accessToken', accessToken); // Stockage du jeton d'accès dans localStorage
       //redirect to dashboard
       this.router.navigate(['/layout']);
      },
      error =>{
         this.handleError(error)

         if (error.status === 401) {
          // Mauvaises informations d'identification
          console.log('Invalid credentials');
        } else {
          // Autre erreur
          console.log('An error occurred');
        }
      }
     );
  }



  handleError(error : any) {
    this.error = error.error.error;
  }
}
