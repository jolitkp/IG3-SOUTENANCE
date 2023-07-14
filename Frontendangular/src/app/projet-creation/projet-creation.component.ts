import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProjetService } from '../services/projet.service';

@Component({
  selector: 'app-projet-creation',
  templateUrl: './projet-creation.component.html',
  styleUrls: ['./projet-creation.component.css']
})

export class ProjetCreationComponent implements OnInit {
  projets: any[] = [];
  

  constructor(private router: Router, private projet: ProjetService) {}

  ngOnInit(): void {
    this.getProjetData();
  }

  getProjetData(){
    this.projet.getAllProjets().subscribe(
      (projetData) => {
        console.log(projetData);
        this.projets = projetData; 
      },
      (error) => {
        console.error('Erreur lors de la récupération des noms de projets', error);
      }
    );
  }
  

  showCreatePage(){
    this.router.navigate(['/formulaire']);
  }

  Gererprojet(){
    this.router.navigate(['/creation-projet']);

  }
}
