import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class VotreServiceDeDonnees {
  projets: Projet[] = [];

  getNumeroProjetSuivant(): number {
    return this.projets.length + 1;
  }
  getProjets(): Projet[] {
    return this.projets;
  }

   ngOnInit(): void {
    const projetsString = localStorage.getItem('projets');
    if (projetsString) {
      this.projets = JSON.parse(projetsString);
    }
  }
  enregistrerProjet(projet: Projet): void {
    this.projets.push(projet);
    localStorage.setItem('projets', JSON.stringify(this.projets));

  }
}

interface Projet {
  numero: number;
  nom: string;
  delai: string;
  budgetAlloue: number;
  budgetDepense: number;
  dateDebut: Date;
  dateFin: Date;
  objectif: string;
  jourCompteRendu: string;
  membres: string;
  definitionRisques: string;
  action: string;
}
@Component({
  selector: 'app-projet-creation',
  templateUrl: './projet-creation.component.html',
  styleUrls: ['./projet-creation.component.css']
})
export class ProjetCreationComponent implements OnInit {
  projets: any[] = [];
  
  ajouterProjet() {
    const nouveauProjet = {
      numero: null,
      nom: '',
      action: ''
    };
   this.projets.push(nouveauProjet);
  }
  constructor(private router: Router, private serviceDonnees: VotreServiceDeDonnees) {}

  ouvrirFormulaire() {
    this.router.navigate(['/ajouter']);
    this.router.navigate(['/formulaire']);
  }

  ngOnInit(): void {
    this.projets = this.serviceDonnees.projets;
  }
}
