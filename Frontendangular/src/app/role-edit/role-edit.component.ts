import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RoleService } from '../services/role.service';
import { AuthService } from '../services/auth.service';
import { FormArray, FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Role } from '../role';

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
permission: string[]=[];
selectedPermissions: any[]=[];
roleName!: string;
rolle!: Role;
roles: any[] = [];
allPermissions: string[] = [];


  constructor( private auth: AuthService ,private router: Router ,private route: ActivatedRoute, private role: RoleService, private formBuilder: FormBuilder){}

  ngOnInit(): void {

    console.log("Length of allPermissions:", this.allPermissions.length);
    console.log("Length of selectedPermissions:", this.selectedPermissions.length);

    this.id = this.route.snapshot.params['id'];
    this.initRoleForm();
    this.getAllPermissions();
    this.getData();
    
  }
//récupérer toutes les permissions et initialise une liste de cases à cocher
  getAllPermissions(): void {
    this.auth.getUserInfo().subscribe(
      (permissions: string[]) => {
        console.log("Permissions received:", permissions);
        this.allPermissions = permissions;
        console.log("Length of selectedPermissions after mapping:", this.allPermissions);
        this.selectedPermissions = this.allPermissions.map(permission => new FormControl(false));
        console.log("Length of selectedPermissions after mapping:", this.selectedPermissions.length);
      },
      (error: any) => {
        console.error('Erreur lors de la récupération des permissions', error);
      }
    );
  }

// initialiser le formulaire 
  initRoleForm(): void {
    this.RoleForm = this.formBuilder.group({
      roleName: ['', Validators.required],
      selectedPermissions: this.formBuilder.array(
        this.allPermissions.map(() => new FormControl(false))
      ) // Créez un FormArray vide pour les permissions sélectionnées
    });
  }

  // isChecked(permission: string): boolean {
  //   return this.rolle.permissions.includes(permission)  }
  
//récupére et met à jour le formulaire par id sélectionné
  getData():void {
    console.log("ID:", this.id);
    this.role.getRolebyId(this.id).subscribe(
      (roleData) => {
        const data = roleData as Role
        if (!data) {
          console.error('Erreur: données de rôle non disponibles');
          return;
        }
        this.rolle = data;
        console.log("Role data received:", data);

          this.RoleForm.patchValue({
            roleName: data.roleName,
            //selectedPermissions: data.permissions
      });
      this.permissions = data.permissions;
      console.log("Length of permissions:", this.permissions.length);
      this.setCheckboxState();
  },
  (error: any) => {
    console.error('Erreur lors de la récupération des données du rôle', error);
  }
);
}

//défini l'etat des cases à cocher en fonction des permissios attribués 
setCheckboxState(): void {
  const assignedPermissions = this.rolle?.permissions;
  console.log("Assigned permissions:", assignedPermissions);
  if (this.selectedPermissions) {
  this.selectedPermissions.forEach((formControl: FormControl, index: number) => {
    const permission = this.allPermissions[index];
    console.log("Permissions:", permission);
    if (assignedPermissions.includes(permission)) {
      formControl.setValue(true);
    } else {
      formControl.setValue(false);
    }  
  });
}
}
//mis à jour
updateRole(): void {
  console.log("Selected permissions:", this.selectedPermissions);
  if (this.RoleForm.valid) {
    const selectPermissions = this.selectedPermissions
    .map((formControl: FormControl, index: number) => (formControl.value ? this.allPermissions[index] : null))
    .filter((permission: string | null) => permission !== null);

      const updatedRole: Role = {
      id: this.id,
      roleName: this.RoleForm.value.roleName,
      permissions:selectPermissions,
      // createdAt: this.rolle.createdAt,
      // updatedAt: new Date()

    };
    console.log(updatedRole);

    this.role.updateRole(updatedRole).subscribe(
      () => {
        // console.log(updatedRole.id);
        console.log('Rôle mis à jour avec succès');
        this.getRoleData();
        
        this.router.navigate(['/role']);      },
      (error) => {
        console.error('Erreur lors de la mise à jour du rôle', error);
        // Gérez l'erreur de mise à jour du rôle
      }
    );
  } else {
    console.log('Le formulaire est invalide.');
  };

  }
//récupère les données
  getRoleData(): void {
    console.log("Fetching role data...");
    this.role.getRoles().subscribe(
      (roleData: Role[]) => {
        console.log(roleData);
        this.roles = roleData.map(role => ({
          roleName: role.roleName,
          permissions: role.permissions
        }));      },
      (error) => {
        console.error('Erreur lors de la récupération des rôles', error);
      }
    );
  }
  

  goBack(){
    this.router.navigate(['/role']);

  };
}

