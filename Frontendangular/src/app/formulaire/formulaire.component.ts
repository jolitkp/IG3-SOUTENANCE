import { Component, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Projet } from 'src/app/projet';
import { ProjetService } from 'src/app/services/projet.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzFormItemComponent, NzFormControlComponent } from 'ng-zorro-antd/form';

@Component({
  selector: 'app-formulaire',
  templateUrl: './formulaire.component.html',
  styleUrls: ['./formulaire.component.css']
})
export class FormulaireComponent {
  validateForm: FormGroup;

  numeroProjet: number;
  nomProjet: string;
  delaiProjet: string;
  budgetAlloueProjet: number;
  budgetDepenseProjet: number;
  dateDebutProjet: Date;
  dateFinProjet: Date;
  objectifProjet: string;
  jourCompteRenduProjet: string;
  membresProjet: string;
  definitionRisquesProjet: string;

  constructor(private fb: FormBuilder, private projetService: ProjetService, private router: Router) {
    this.validateForm = this.fb.group({
      nomProjet: ['', [Validators.required]],
      delai: [''],
      budgetAlloue: [''],
      budgetDepense: [''],
      dateDebut: [''],
      dateFin: [''],
      objectif: ['', [Validators.required]],
      membres: [''],
      definitionRisques: [''],
      dateRange: [null, [Validators.required]]
    });

    this.numeroProjet = 0;
    this.nomProjet = '';
    this.delaiProjet = '';
    this.budgetAlloueProjet = 0;
    this.budgetDepenseProjet = 0;
    this.dateDebutProjet = new Date();
    this.dateFinProjet = new Date();
    this.objectifProjet = '';
    this.jourCompteRenduProjet = '';
    this.membresProjet = '';
    this.definitionRisquesProjet = '';

    this.getNumeroProjetSuivant();
  }

  enregistrerProjet(): void {
    const nouveauProjet: Projet = {
      numero: this.numeroProjet,
      nom: this.nomProjet,
      delai: this.delaiProjet,
      budgetAlloue: this.budgetAlloueProjet,
      budgetDepense: this.budgetDepenseProjet,
      dateDebut: this.dateDebutProjet,
      dateFin: this.dateFinProjet,
      objectif: this.objectifProjet,
      jourCompteRendu: this.jourCompteRenduProjet,
      membres: this.membresProjet,
      definitionRisques: this.definitionRisquesProjet,
      action: 'gerer'
    };

    this.projetService.createProjet(nouveauProjet).subscribe(
      (response: any) => {
        console.log('Projet enregistré avec succès :', response);
        this.router.navigate(['/tableau']);
      },
      (error: any) => {
        console.error('Une erreur s\'est produite lors de l\'enregistrement du projet :', error);
      }
    );
  }

  submitForm(): void {
    if (this.validateForm.valid) {
      console.log('Formulaire valide, enregistrement en cours...');
      this.enregistrerProjet();
    } else {
      console.log('Formulaire invalide, veuillez vérifier les champs');
    }
  }

  resetForm(): void {
    this.validateForm.reset();
  }

  private getNumeroProjetSuivant(): void {
    this.projetService.getAllProjets().subscribe(
      (projets: any[]) => {
        this.numeroProjet = projets.length + 1;
      },
      (error: any) => {
        console.error('Une erreur s\'est produite lors de la récupération des projets :', error);
      }
    );
  }
}
