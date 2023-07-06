import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent {
isLoading=true;
  users: any[] = [];
      constructor(private user: UserService, private router: Router){}
 
  showCreatePage(){
    this.router.navigate(['/users/create']);
  }

    ngOnInit(): void {
        this.getUserData();
      }
  
      getUserData(){
        console.log('liste des utilisateurs');
        this.user.getUsers().subscribe(
          res =>{
            console.log(res);
            this.users = res;
            this.isLoading = false;
  
          },
          error => {
            console.log(error);
          }
        )
      }
}
