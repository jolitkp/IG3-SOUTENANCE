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
      datedebut: [null, Validators.required],
      datefin: [null, Validators.required],
      budget: [null, Validators.required],
      objectif: ['', Validators.required],
      membre: ['', Validators.required],
      jourcompterendu: [null, Validators.required],
      risques: ['']
    });
  }

  submitForm(): void {
    if (this.projectForm.invalid) {
      return;
    }

    // Envoyez les données du formulaire au serveur ou effectuez d'autres actions
    console.log(this.projectForm.value);
  }
}


