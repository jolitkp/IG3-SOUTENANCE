import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-create',
  templateUrl: './user-create.component.html',
  styleUrls: ['./user-create.component.css']
})
export class UserCreateComponent {

  constructor(private router: Router){}

  goBack(){
    this.router.navigate(['/users']);
  }

 insertData(){
  console.log('bonjour');
  }
}
