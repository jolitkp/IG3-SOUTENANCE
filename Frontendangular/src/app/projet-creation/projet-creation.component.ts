import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProjetService } from '../services/projet.service';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-projet-creation',
  templateUrl: './projet-creation.component.html',
  styleUrls: ['./projet-creation.component.css']
})

export class ProjetCreationComponent implements OnInit {
  // id: number=0;
  projets: any[] = [];
  

  constructor(private router: Router, private projet: ProjetService, private route: ActivatedRoute) {}

  ngOnInit(): void {

    // this.id = this.route.snapshot.params['id'];
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

  // Gererprojet(){
  //   this.router.navigate(['/creation-projet']);

  // }
}
