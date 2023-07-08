import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RoleService } from '../services/role.service';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Role } from '../role';
// import { Role } from '../role';

@Component({
  selector: 'app-role-edit',
  templateUrl: './role-edit.component.html',
  styleUrls: ['./role-edit.component.css']
})
export class RoleEditComponent implements OnInit {
id:number=0;
formErrors: any;
errorMessage: string='';
RoleForm!: FormGroup;
permissions: string[]=[];
roleName!: string;
rolle = new Role();

  constructor( private router: Router ,private route: ActivatedRoute, private role: RoleService, private formBuilder: FormBuilder){}

  ngOnInit(): void {
    console.log(this.route.snapshot.params['id']);
    this.id = this.route.snapshot.params['id'];
    this.initRoleForm();
    this.getData();
    
  }

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

  initRoleForm(): void {
    this.RoleForm = this.formBuilder.group({
      roleName: new FormControl(['', Validators.required]),
      selectedPermissions: new FormControl([])
    });
  }

  isChecked(permission: string): boolean{
    return this.rolle.permissions.includes(permission);
  }

  getData():void {
    this.role.getRolebyId(this.id).subscribe(
      (res) => {
        const data = res as Role
        console.log(data);
        this.rolle= data;
          // this.roleName = res.roleName;
          // this.permissions = res.permissions;

          // this.RoleForm.patchValue({
          //   roleName: this.rolle.roleName,
          //   selectedPermissions: this.rolle.permissions
      this.RoleForm.controls['roleName'].setValue(this.rolle.roleName);
      this.RoleForm.controls['selectedPermissions'].setValue(this.rolle.permissions);
    //  });
      // this.permissions = res.allPermissions;
  },
  (error: any) => {
    console.error('Erreur lors de la récupération des données du rôle', error);
  }
);
}

updateRole(): void {
  if (this.RoleForm.valid) {
    const updatedRole: Role = {
      id: this.rolle.id,
      roleName: this.RoleForm.value.roleName,
      permissions: this.RoleForm.value.selectedPermissions,
      createdAt: this.rolle.createdAt,
      updatedAt: new Date()

    };

    this.role.updateRole(updatedRole).subscribe(
      () => {
        console.log(updatedRole);
        console.log('Rôle mis à jour avec succès');
        // Effectuez d'autres actions si nécessaire
      },
      (error) => {
        console.error('Erreur lors de la mise à jour du rôle', error);
        // Gérez l'erreur de mise à jour du rôle
      }
    );
  } else {
    console.log('Le formulaire est invalide.');
  };

  }

  goBack(){
    this.router.navigate(['/role']);

  };
}
