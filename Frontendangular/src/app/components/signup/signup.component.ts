import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserService } from 'src/app/services/user.service';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})

export class SignupComponent {
  formData: any = {};
  public form ={
    nom: null,
    prenom: null,
    email: null,
    password: null,
    password_confirm: null,
  };

  public error : any = [];

  constructor( private user: UserService){}



  onSubmit(){
    this.user.createUser(this.formData).subscribe(
      data => console.log(data),
      error => this.handleError(error)
     );
  }

  handleError(error : any) {
    this.error = error.error.errors;
  }
}
