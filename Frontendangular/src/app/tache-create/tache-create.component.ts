import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProjetService } from '../services/projet.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tache-create',
  templateUrl: './tache-create.component.html',
  styleUrls: ['./tache-create.component.css']
})
export class TacheCreateComponent {
  tacheForm!: FormGroup;
  taches: any[]=[];
  updatingStatut = false;
  projetId!: number;

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder, // Injectez le FormBuilder
    private projetService: ProjetService,
    private router: Router
  ) {}

  ngOnInit(){

    this.tacheForm = this.fb.group({
      titre: ['', Validators.required],
      description: [''],
      statut: ['non_traite', Validators.required],
    });

       // Utilisez paramMap pour récupérer l'identifiant du projet de manière asynchrone
      //  this.route.paramMap.subscribe(params => {
      //   const idFromParams = params.get('id');
      //   console.log('ID from params:', idFromParams);
      
      //   this.projetId = parseInt(idFromParams || '1', 10);
      //   console.log('Parsed projetId:', this.projetId);
      // }); 
      this.projetId = this.route.snapshot.params['projetId'];
     }

  

  creerTache(): void {
    if (this.tacheForm.valid) {
      console.log(this.projetId);
      // const projetId = +this.route.snapshot.params['id'];
      const nouvelleTache = {
        titre: this.tacheForm.value.titre,
        description: this.tacheForm.value.description,
        statut: this.tacheForm.value.statut,
        // Ajoutez ici d'autres propriétés de la tâche si nécessaire
      };

      this.projetService.creerTache(this.projetId, nouvelleTache)
        .subscribe(() => {
          this.router.navigate(['/projet', this.projetId]);
        // Rafraîchir la liste des tâches après la création
        
        });

      }
    }


  
    updateStatut(statut: string) {
      if (!this.updatingStatut) {
        this.updatingStatut = true;
        this.tacheForm.patchValue({
          statut: statut
        });
        this.updatingStatut = false;
      }
    }

    goBack(){
      // this.router.navigate(['/projet/:id']);
    }


}
