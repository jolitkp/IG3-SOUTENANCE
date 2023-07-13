import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { NzModalService } from 'ng-zorro-antd/modal';


@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent {
isLoading=true;
  users: any[] = [];
      constructor(  private modal: NzModalService,private user: UserService, private router: Router){}
 
  showCreatePage(){
    this.router.navigate(['/users/create']);
  }

    ngOnInit(): void {
        this.getUserData();
      }
  
      getUserData(){
        console.log('liste des utilisateurs');
        this.user.getUsers().subscribe(
          (users: any[]) => {
            this.users = users.map((user) => ({
              ...user,
              isBlocked: user.blocked_at !== null, // Ajout de la propriété isBlocked
            }));

            this.users.forEach(user => {
              this.user.getUserRole(user.id).subscribe(
                roleRes => {
                  user.role = roleRes.name; // Ajoute la propriété 'role' au tableau users avec le nom du rôle
                },
                error => {
                  console.log(error);
                }
              );
            })

            this.isLoading = false;
  
          },
          error => {
            console.log(error);
          }
        )
      }

      deleteUser(id: any){
        this.modal.confirm({
          nzTitle: 'Êtes-vous sûr de vouloir supprimer cet utilisateur?',
          nzContent: 'Cette action est irréversible.',
          nzOkText: 'Oui',
          nzOnOk: () => {
            // Appeler la méthode de suppression de l'utilisateur du service UserService
            this.user.deleteUser(id).subscribe(
              () => {
                console.log('Utilisateur supprimé avec succès');
                this.user.getUsers().subscribe(res =>{
                  console.log(res);
                  this.users = res;
                })

                // Effectuer des actions supplémentaires après la suppression
              },
              (error) => {
                console.error('Erreur lors de la suppression de l\'utilisateur', error);
                // Gérer les erreurs de suppression
              }
            );
          },
          nzCancelText: 'Non',
          nzOnCancel: () => {
            console.log('Suppression annulée.');},
        })
      }

      blockUser(id: any): void {
        this.user.blockUser(id).subscribe(
          () => {
            console.log('Utilisateur bloqué avec succès');
            // Mettre à jour la propriété isBlocked de l'utilisateur
            const user = this.users.find((u) => u.id === id);
            if (user) {
              user.isBlocked = true;
            }
          },
          (error: any) => {
            console.error('Erreur lors du blocage de l\'utilisateur :', error);
          }
        );
      }
    
      unblockUser(id: any): void {
        this.user.unblockUser(id).subscribe(
          () => {
            console.log('Utilisateur débloqué avec succès');
            // Mettre à jour la propriété isBlocked de l'utilisateur
            const user = this.users.find((u) => u.id === id);
            if (user) {
              user.isBlocked = false;
            }
          },
          (error: any) => {
            console.error('Erreur lors du déblocage de l\'utilisateur :', error);
          }
        );
      }
    }
