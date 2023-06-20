import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-creation-projet',
  templateUrl: './creation-projet.component.html',
  styleUrls: ['./creation-projet.component.css']
})
export class CreationProjetComponent implements OnInit {
  projetForm!: FormGroup;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.projetForm = this.formBuilder.group({
      nom: ['', Validators.required],
      delai: ['', Validators.required],
      membre: ['', Validators.required],
      budgetAlloue: ['', Validators.required],
      budgetDepense: ['', Validators.required],
      dateDebut: ['', Validators.required],
      dateFin: ['', Validators.required],
      objectif: ['', Validators.required],
      dateCompteRendu: ['', Validators.required],
      action: ['creer', Validators.required],
      nouveauNom: ['', Validators.required], 
      projetId: ['', Validators.required] 
    });
  
  }

  onSubmit() {
    const formData = this.projetForm.value;
  
    if (formData.action === 'creer') {
      this.creerProjet(formData);
    }
  
    if (formData.action === 'modifier' && formData.nouveauNom) {
      const projetId = 'ID_DU_PROJET_A_MODIFIER';
      const nouveauNom = formData.nouveauNom;
      this.modifierNomProjet(projetId, nouveauNom);
    }
  
    if (formData.action === 'supprimer' && formData.projetId) {
      const projetId = formData.projetId;
      this.supprimerProjet(projetId);
    }
  
    console.log(formData);
  }
  
  creerProjet(formData: any) {
    // Effectuer une requête HTTP ou toute autre logique nécessaire pour créer un projet
    console.log('Création du projet :', formData);
  }
  
  modifierNomProjet(projetId: string, nouveauNom: string) {
    // Effectuer une requête HTTP ou toute autre logique nécessaire pour modifier le nom du projet
    console.log('Modification du nom du projet avec l\'identifiant', projetId, 'Nouveau nom :', nouveauNom);
  }
  
  supprimerProjet(projetId: string) {
    // Effectuer une requête HTTP ou toute autre logique nécessaire pour supprimer le projet
    console.log('Suppression du projet avec l\'identifiant', projetId);
  }  
  
}
