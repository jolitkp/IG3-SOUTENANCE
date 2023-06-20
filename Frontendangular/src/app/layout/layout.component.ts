import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent implements OnInit{
  users: any =[];

  roles: string[] = [];
  permissions : string[] = [];

  isCollapsed = false;

  constructor(private auth: AuthService, /*private user: UserService,*/ private router: Router){}

  logout(): void {
    this.auth.logout().subscribe(
      ()=> {
      this.router.navigate(['/login'])
    },
     error=> {console.error(error);
    }
    );
  }

  ngOnInit(){
   //this.getUsers();
    // this.auth.getUserInfo().subscribe(
    //   (response) => {
    //     this.roles= response.roles;
    //     this.permissions= response.permissions     
    //    },
    //    (error)=> {
    //     console.error('Error getting user info', error);
        
    //    }
    //        )
  }

  /*getUsers(){

    this.user.getUsers().subscribe(users => {
      this.users = users;

    });
  }*/

  /*createUser(){

    this.user.createUser(userData).subscribe(() => {
      this.getUsers();
    });
  }*/

  /*blockUser(userId: number){
    this.user.blockUser(userId).subscribe(() => {
      this.getUsers();
    });
  }

  deleteUser(userId: number){
    this.user.deleteUser(userId).subscribe(() => {
      this.getUsers();
    })
  }*/

}
