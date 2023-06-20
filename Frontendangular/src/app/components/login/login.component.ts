import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
//import { AuthService } from '../../services/auth.service';


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
     return this.http.post('http://127.0.0.1:8000/api/login-page', this.form).subscribe(
     
      (res:any)=>{
        //console.log(res),
        localStorage.setItem('token', JSON.stringify(res))

        //redirect to dashboard
        this.router.navigate(['/layout']);
      },
      error => this.handleError(error)
     );
  }
  
 

  handleError(error : any) {
    this.error = error.error.error;
  }
}
