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
  projectForm!: FormGroup;

  constructor(private formBuilder: FormBuilder, private projetService: ProjetService, private router: Router) {}

  ngOnInit(): void {
    this.projectForm = this.formBuilder.group({
      nom: ['', Validators.required],
      delai: ['', Validators.required],
      datedebut: [new Date(), Validators.required],
      datefin: [null, Validators.required],
      budget: [null, Validators.required],
      objectif: ['', Validators.required],
      membre: ['', Validators.required],
      risques: ['']
    });
  }

  submitForm(): void {
    if (this.projectForm.invalid) {
      return;
    }

   // Convertir les dates au format ISO 8601 avant de les envoyer au backend
   const dateDebutFormatted = this.projectForm.value.datedebut.toISOString().slice(0, 19).replace('T', ' ');;
   const dateFinFormatted  = this.projectForm.value.datefin.toISOString().slice(0, 19).replace('T', ' ');;
  const projet = { ...this.projectForm.value, datedebut: dateDebutFormatted, datefin: dateFinFormatted };

    console.log(this.projectForm.value);

    // const projet = this.projectForm.value;

    this.projetService.addProjet(projet).subscribe(
      (response: any)=> {
        console.log('Projet ajouté avec succès', response)
        this.router.navigate(['/projet-creation']);

      },
      (error: any)=> {
        console.error('Erreur lors de l\'ajout du projet:', error)
      }
    )

  }

  goBack(){
    this.router.navigate(['/projet-creation']);
  }
}


