import { Component, OnInit, ViewChild } from '@angular/core';
import { RoleService } from '../services/role.service';
import { AuthService } from '../services/auth.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { NzIconService } from 'ng-zorro-antd/icon';
import { EllipsisOutline } from '@ant-design/icons-angular/icons';
import { PlusOutline } from '@ant-design/icons-angular/icons';


@Component({
  selector: 'app-role',
  templateUrl: './role.component.html',
  styleUrls: ['./role.component.css']
})

export class RoleComponent implements OnInit {
  roles: any[] = [];
 public selectedRole: any;
  
  RoleForm!: FormGroup;
  permissions!: string[];

  formErrors: any;
  errorMessage: string='';

  isModalVisible = false;

  constructor( private iconRegistry: NzIconService ,private role: RoleService, private router: Router, private http: HttpClient,  private auth: AuthService, private formBuilder: FormBuilder){
    this.iconRegistry.addIcon(EllipsisOutline);
    this.iconRegistry.addIcon(PlusOutline);

  }
 
   ngOnInit(){
     this.role.getRole().subscribe(roles => {
       console.log(roles);
       this.roles = roles;
     });
    }
  // ngOnInit(){
   
  //   this.RoleForm = this.formBuilder.group({
  //     roleName: '',
  //     selectedPermissions: [],
  //   });
  //   this.loadPermissions();
  // }

  // loadPermissions(){
  //   this.auth.getUserInfo().subscribe(
  //     (response: string[])=> {
  //       this.permissions = response;
  //     },
  //     (error)=> {
  //       console.log(error);
  //     }
  //   )
  // }

  // createRole(){
  //   console.log(this.RoleForm.value);
  //   const roleName = this.RoleForm.value.roleName;
  //   const selectedPermissions=  this.RoleForm.value.selectedPermissions;
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
          // this.role.createrole(roleName, selectedPermissions).subscribe(
          //   (response) => {
          //     console.log('Role créé avec succès');
          //   },
          //   (error) => {
          //     this.errorMessage = error.error.errors.roleName;
          //   }
          // );
   
   // 
    // /*this.role.createRole(this.roleName, this.selectedPermissions).subscribe(
    //   ()=>{
    //         //     this.roles= response.roles;
    // //     this.permissions= response.permissions     
    //    // console.log('Role crée')
    //   },
    //   (error)=>{
    //     console.error('Error creating role', error);
        
    //   }
    //  )*/
  //}
           
  detailRole(roleId: number): void{
      this.role.getRoleDetail(roleId).subscribe(
        (roleDetail: any) => {
          console.log(roleDetail);
            this.selectedRole = roleDetail;
            console.log(this.selectedRole);
            this.isModalVisible = true;
            },
            (error: any) => {
              console.error('Erreur lors de la récupération des détails', error);
                }
              )
  
            }
           
         
         handleCancel(): void{
           this.isModalVisible = false;
         }
         handleOk(): void{
           this.isModalVisible = false;
         }
         
           editRole(){};
           deleteRole(roleId: number){
             const confirmed = confirm('Etes vous sur de vouloir supprimer cet role ?');
             if(confirmed){
               this.role.deleteRole(roleId).subscribe(
                 () => {
                   console.log('Role supprimé avec succès');
                   this.roles = this.roles.filter(role => role.id !== roleId);
                 },
                 (error) => {
                   console.error('Erreur lors de la suppression du role', error);
                 }
               );
             }
           };
          
         
showCreate(){
  this.router.navigate(['/role/create']);
  }
}

