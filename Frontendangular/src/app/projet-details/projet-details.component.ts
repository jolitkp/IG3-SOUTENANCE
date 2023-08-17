import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ProjetService } from '../services/projet.service';
import { Router } from '@angular/router';
import { NzModalService } from 'ng-zorro-antd/modal';



@Component({
  selector: 'app-projet-details',
  templateUrl: './projet-details.component.html',
  styleUrls: ['./projet-details.component.css']
})
export class ProjetDetailsComponent {

  id: number=0;
  projet: any;
  taches: any[]=[];
  projetId!: number;
  constructor(private formBuilder: FormBuilder, private route: ActivatedRoute,
    private projetService: ProjetService, private router: Router,private modal: NzModalService) { }

  ngOnInit() {

      this.id = this.route.snapshot.params['id'];
      this.getProjetDetails();  
      this.getProjetTasks();  
  }

  getProjetDetails(): void {
    this.projetService.getProjetById(this.id)
      .subscribe((data: any) => {
        this.projet = data;
      });
  }

  getProjetTasks(): void {
    this.projetService.getProjetWithTaches(this.id)
      .subscribe((tache: any[]) => {
        this.taches =tache;
      },
      (error) => {
        console.error('Erreur lors de la récupération des taches', error);
      }
      );
  }

  supprimerTache(id: number): void {
    this.modal.confirm({
      nzTitle: 'Êtes-vous sûr de vouloir supprimer cet tache?',
      nzContent: 'Cette action est irréversible.',
      nzOkText: 'Oui',
      nzOnOk: () => {
        // Appeler la méthode de suppression du rôle du service RoleService
        this.projetService.deleteTache(id).subscribe(
          () => {
            console.log('Tache supprimé avec succès');
            this.getProjetTasks();
          },
          (error) => {
            console.error('Erreur lors de la suppression du tache', error);
            // Gérer les erreurs de suppression
          }
        );
      },
      nzCancelText: 'Non',
      nzOnCancel: () => {
        console.log('Suppression annulée.');},
    })
    }

    showCreatePage(){
      this.router.navigate(['/tache-create', this.projetId]);

    }

  goBack(){
    this.router.navigate(['/projet-creation']);

  };
  
}

