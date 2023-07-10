import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RoleService } from 'src/app/services/role.service';
import { UserService } from 'src/app/services/user.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { forkJoin } from 'rxjs';


@Component({
  selector: 'app-user-create',
  templateUrl: './user-create.component.html',
  styleUrls: ['./user-create.component.css']
})
export class UserCreateComponent implements OnInit {

  userForm!: FormGroup;
  roles: any[]=[];
  users: any[] = [];

  constructor(private router: Router, private role: RoleService, private fb: FormBuilder, private user: UserService){}

  ngOnInit(): void {
    this.initForm();
    this.getRoles();
  }

  initForm(): void {
    this.userForm = this.fb.group({
      nom: ['', [Validators.required]],
      prenom: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      confirmPassword: ['', [Validators.required]],
      role: ['', [Validators.required]],
    });
/*
    // this.userForm.get('password')?.valueChanges.subscribe((password) => {
    //   const hashedPassword = hashSync(password, 10);
    //   this.userForm.patchValue({ password: hashedPassword }, { emitEvent: false });
    // });
    */
  }
  
  getRoles(): void {
    this.role.getRole().subscribe(
      (roles) => {
        this.roles = roles;
      },
      (error: any) => {
        console.error('Erreur lors de la récupération des rôles :', error);
      }
    );
  }
  

  goBack(){
    this.router.navigate(['/users']);
  }

  createUser(): void{
    if (this.userForm.invalid) {
      return;
    }
  
    const user = this.userForm.value;
    const selectedRoleId = this.userForm.value.role;

    this.user.addUser(user).subscribe(
      (response: any) => {
        // Traite la réponse du service en cas de succès
        console.log('Utilisateur ajouté avec succès');

        // Assigner le rôle à l'utilisateur
        console.log(selectedRoleId);
        this.user.assignRole(response.id, selectedRoleId).subscribe(
          () => {
            console.log(response.id);
            console.log(selectedRoleId);
            console.log('Rôle assigné avec succès');
            this.getUseData();
        this.userForm.reset();
        this.router.navigate(['/users']);

      },
      (error: any) => {
        console.error('Erreur lors de l\'assignation du rôle :', error);
      }
    );
  },
      (error: any) => {
        // Traite l'erreur renvoyée par le service en cas d'échec
        console.error('Erreur lors de l\'ajout de l\'utilisateur :', error);
      }
    );
  
  }
  getUseData(): void {
    this.user.getUsers().subscribe(
      (users: any[]) => {
        console.log(users);
        this.users = users.map((user) => ({
          ...user,
          roleId: user.role?.id,
          roleName: '',
        }));

        for (const user of this.users) {
          console.log(user.roleId);
        };

        const requests = this.users.map((user) =>
        this.role.getRoleNameById(user.roleId)
      );
      forkJoin(requests).subscribe(
        (roleNames: string[]) => {
          roleNames.forEach((roleName, index) => {
            this.users[index].roleName = roleName;
          });
        },
        (error: any) => {
          console.error('Erreur lors de la récupération des noms de rôle :', error);
        }
      );
    },
   (error: any) => {
        console.error('Erreur lors de la récupération des utilisateurs :', error);
      }
    //   }
    );
  }
    

}
