import { Component, OnInit, ViewChild } from '@angular/core';
import { RoleService } from '../services/role.service';
import { AuthService } from '../services/auth.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { NzIconService } from 'ng-zorro-antd/icon';
import { EllipsisOutline } from '@ant-design/icons-angular/icons';
import { PlusOutline } from '@ant-design/icons-angular/icons';
import { NzModalService } from 'ng-zorro-antd/modal';


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

  constructor( private modal: NzModalService ,private iconRegistry: NzIconService ,private role: RoleService, private router: Router, private http: HttpClient,  private auth: AuthService, private formBuilder: FormBuilder){
    this.iconRegistry.addIcon(EllipsisOutline);
    this.iconRegistry.addIcon(PlusOutline);

  }
 
   ngOnInit(){
     this.role.getRole().subscribe(roles => {
       console.log(roles);
       this.roles = roles;
     });
    }
           
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
           deleteRole(id: any){
              this.modal.confirm({
                nzTitle: 'Êtes-vous sûr de vouloir supprimer ce rôle?',
                nzContent: 'Cette action est irréversible.',
                nzOkText: 'Oui',
                nzOnOk: () => {
                  // Appeler la méthode de suppression du rôle du service RoleService
                  this.role.deleteRole(id).subscribe(
                    () => {
                      console.log('Rôle supprimé avec succès');
                      this.role.getRole().subscribe(res =>{
                        console.log(res);
                        this.roles = res;
                      })
                      // this.roles = this.roles.filter(role => role.id !== id);

                      // Effectuer des actions supplémentaires après la suppression
                    },
                    (error) => {
                      console.error('Erreur lors de la suppression du rôle', error);
                      // Gérer les erreurs de suppression
                    }
                  );
                },
                nzCancelText: 'Non',
                nzOnCancel: () => {
                  console.log('Suppression annulée.');},
              })
            }
           
          
         
showCreate(){
  this.router.navigate(['/role/create']);
  }
}

