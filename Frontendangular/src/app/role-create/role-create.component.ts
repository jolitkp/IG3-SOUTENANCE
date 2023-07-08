import { Component, OnInit, ViewChild } from '@angular/core';
import { RoleService } from '../services/role.service';
import { AuthService } from '../services/auth.service';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { NzIconService } from 'ng-zorro-antd/icon';


@Component({
  selector: 'app-role-create',
  templateUrl: './role-create.component.html',
  styleUrls: ['./role-create.component.css']
})
export class RoleCreateComponent implements OnInit {

  roles: any[] = [];

  RoleForm!: FormGroup;
  permissions: string[]=[];

  formErrors: any;
  errorMessage: string='';

constructor(private iconRegistry: NzIconService ,private role: RoleService, private router: Router, private http: HttpClient,  private auth: AuthService, private formBuilder: FormBuilder){}
 
ngOnInit(){
    this.RoleForm = this.formBuilder.group({
      roleName: '',
      selectedPermissions: [],
        
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

    this.role.createrole(roleName, selectedPermissions).subscribe(
        (response) => {
          console.log('Role créé avec succès');
          this.router.navigate(['/role']);
        },
        (error) => {
          this.errorMessage = error.error.errors.roleName;
        }
      );

}
 goBack(){
   this.router.navigate(['/role']);
 }

}
