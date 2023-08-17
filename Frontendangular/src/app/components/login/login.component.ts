import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
//import { AuthService } from '../../services/auth.service';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {


  public form = {
    email: null,
    password: null
  };

  public error = null;

  constructor( private http: HttpClient, private router:Router){}



  onSubmit() {
    let data = {
      "grant_type":"password",
      "client_id":2,
      "client_secret":"eqo4IURYUx4sh5BEpj3S4Cpv8BfaFFMfXhf6fT9N",
      "username":this.form.email,
      "password":this.form.password
    };
     return this.http.post(environment.publicUrl+'oauth/token', data).subscribe(

      (res:any)=>{
        //console.log(res),
        localStorage.setItem('token', JSON.stringify(res))

        //redirect to dashboard
        this.router.navigate(['/welcome']);
      },
      error => this.handleError(error)
     );
  }



  handleError(error : any) {
    this.error = error.error.error;
  }
}
