import { Component, OnInit, ViewChild } from '@angular/core';
import { RoleService } from 'src/app/services/role.service'; 
import { AuthService } from 'src/app/services/auth.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { NzIconService } from 'ng-zorro-antd/icon';
import { EllipsisOutline } from '@ant-design/icons-angular/icons';
import { PlusOutline } from '@ant-design/icons-angular/icons';


@Component({
  selector: 'app-role-create',
  templateUrl: './role-create.component.html',
  styleUrls: ['./role-create.component.css']
})
export class RoleCreateComponent implements OnInit {

  roles: any[] = [];
 public selectedRole: any;

  isModalVisible = false;

  constructor( private iconRegistry: NzIconService ,private role: RoleService, private router: Router, private http: HttpClient,  private auth: AuthService){
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
  // goBack(){
  //   this.router.navigate(['/role']);
  // }

  showCreate(){
    this.router.navigate(['/role']);
  }
}

