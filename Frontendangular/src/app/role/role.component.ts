import { Component, OnInit } from '@angular/core';
import { RoleService } from '../services/role.service';
import { AuthService } from '../services/auth.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-role',
  templateUrl: './role.component.html',
  styleUrls: ['./role.component.css']
})
export class RoleComponent implements OnInit {
  RoleForm!: FormGroup;
  permissions!: string[];

  constructor(private role: RoleService, private http: HttpClient,  private auth: AuthService, private formBuilder: FormBuilder){}

  ngOnInit(){
    this.RoleForm = this.formBuilder.group({
      roleName: [''],
      selectedPermissions: [[]],
    });
    this.loadPermissions();
  }

  loadPermissions(){
    this.auth.getUserInfo().subscribe(
      (response: string[])=> {
        this.permissions = response;
      },
      (error)=> {
        console.log(error);
      }
    )
  }

  createRole(){
    console.log(this.RoleForm.value);
    const roleName = this.RoleForm.value.roleName;
    const selectedPermissions=  this.RoleForm.value.selectedPermissions;
   /* const roleData={
      roleName : roleName,
      selectedPermissions: selectedPermissions
    };

    this.http.post('http://localhost:8000/api/roles', roleData).subscribe(
      (response)=>{
        console.log('Role créé avec succès');
      },
      (error)=>{
        console.log('une erreur est survenue')
      }
    );*/
    this.role.createrole(roleName, selectedPermissions).subscribe(
      (response) => {
        console.log('Role créé avec succès');
      },
      (error) => {
        console.log('Une erreur est survenue');
      }
    );
   
   // 
    /*this.role.createRole(this.roleName, this.selectedPermissions).subscribe(
      ()=>{
            //     this.roles= response.roles;
    //     this.permissions= response.permissions     
       // console.log('Role crée')
      },
      (error)=>{
        console.error('Error creating role', error);
        
      }
    )*/
  }
}
