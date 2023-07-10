// import { Component, OnInit } from '@angular/core';
// import { ActivatedRoute } from '@angular/router';
// import { RoleService } from '../services/role.service';
// import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
// import { Router } from '@angular/router';
// import { Role } from '../role';
// // import { Role } from '../role';

// @Component({
//   selector: 'app-role-edit',
//   templateUrl: './role-edit.component.html',
//   styleUrls: ['./role-edit.component.css']
// })
// export class RoleEditComponent implements OnInit {
// id:number=0;
// formErrors: any;
// errorMessage: string='';
// RoleForm!: FormGroup;
// permissions: string[]=[];
// roleName!: string;
// rolle: Role = new Role();
// roles: any[] = [];


//   constructor( private router: Router ,private route: ActivatedRoute, private role: RoleService, private formBuilder: FormBuilder){}

//   ngOnInit(): void {
//     // console.log(this.route.snapshot.params['id']);
//     this.id = this.route.snapshot.params['id'];
//     this.initRoleForm();
//     this.getData();
    
//   }


//   initRoleForm(): void {
//     this.RoleForm = this.formBuilder.group({
//       roleName: ['', Validators.required],
//       selectedPermissions: [[]]
//     });
//   }

//   isChecked(permission: string): boolean {
//     return this.rolle.permissions.includes(permission)  }
  

//   getData():void {
//     this.role.getRolebyId(this.id).subscribe(
//       (roleData) => {
//         const data = roleData as Role
//         // console.log(data);
//         this.rolle = data;

//           // this.roleName = res.roleName;
//           // this.permissions = res.permissions;

//           this.RoleForm.patchValue({
//             roleName: this.rolle.roleName,
//             selectedPermissions: this.rolle.permissions
//       // this.RoleForm.controls['roleName'].setValue(this.rolle.roleName);
//       // this.RoleForm.controls['selectedPermissions'].setValue(this.rolle.permissions);
//       });
//       this.permissions = this.rolle.permissions;
//   },
//   (error: any) => {
//     console.error('Erreur lors de la récupération des données du rôle', error);
//   }
// );
// }

// updateRole(): void {
//   if (this.RoleForm.valid) {
//     const updatedRole: Role = {
//       id: this.id,
//       roleName: this.RoleForm.value.roleName,
//       permissions: this.RoleForm.value.selectedPermissions,
//       createdAt: this.rolle.createdAt,
//       updatedAt: new Date()

//     };
//     console.log(this.id);

//     this.role.updateRole(updatedRole).subscribe(
//       () => {
//         // console.log(updatedRole.id);
//         console.log('Rôle mis à jour avec succès');
//         this.getRoleData();
        
//         this.router.navigate(['/role']);      },
//       (error) => {
//         console.error('Erreur lors de la mise à jour du rôle', error);
//         // Gérez l'erreur de mise à jour du rôle
//       }
//     );
//   } else {
//     console.log('Le formulaire est invalide.');
//   };

//   }

//   getRoleData(): void {
//     this.role.getRoles().subscribe(
//       (roleData: Role[]) => {
//         console.log(roleData);
//         this.roles = roleData.map(role => ({
//           roleName: role.roleName,
//           permissions: role.permissions
//         }));      },
//       (error) => {
//         console.error('Erreur lors de la récupération des rôles', error);
//       }
//     );
//   }
  

//   goBack(){
//     this.router.navigate(['/role']);

//   };
// }

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RoleService } from '../services/role.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-role-edit',
  templateUrl: './role-edit.component.html',
  styleUrls: ['./role-edit.component.css']
})
export class RoleEditComponent implements OnInit {
  id: number = 0;
  formErrors: any;
  errorMessage: string = '';
  RoleForm!: FormGroup;
  permissions: string[] = [];
  roleName!: string;
  roles: any[] = [];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private role: RoleService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.initRoleForm();
    this.getData();
  }

  initRoleForm(): void {
    this.RoleForm = this.formBuilder.group({
      roleName: ['', Validators.required],
      selectedPermissions: [[]]
    });
  }

  isChecked(permission: string): boolean {
    return this.permissions.includes(permission);
  }

  getData(): void {
    this.role.getRolebyId(this.id).subscribe(
      (roleData: any) => {
        console.log(roleData);
        this.roleName = roleData.roleName;
        this.permissions = roleData.permissions;
        this.RoleForm.patchValue({
          roleName: this.roleName,
          selectedPermissions: this.permissions
        });
      },
      (error: any) => {
        console.error('Erreur lors de la récupération des données du rôle', error);
      }
    );
  }

  updateRole(): void {
    if (this.RoleForm.valid) {
      const updatedRole: any = {
        id: this.id,
        roleName: this.RoleForm.value.roleName,
        permissions: this.RoleForm.value.selectedPermissions,
        updatedAt: new Date()
      };

      console.log(this.id);

      this.role.updateRole(updatedRole).subscribe(
        () => {
          console.log('Rôle mis à jour avec succès');
          this.getRoleData();
          this.router.navigate(['/role']);
        },
        (error: any) => {
          console.error('Erreur lors de la mise à jour du rôle', error);
        }
      );
    } else {
      console.log('Le formulaire est invalide.');
    }
  }

  getRoleData(): void {
    this.role.getRoles().subscribe(
      (roleData: any[]) => {
        console.log(roleData);
        this.roles = roleData;
      },
      (error: any) => {
        console.error('Erreur lors de la récupération des rôles', error);
      }
    );
  }

  goBack(): void {
    this.router.navigate(['/role']);
  }
}
