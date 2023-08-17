import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ProjetService } from '../services/projet.service';


@Component({
  selector: 'app-creation-projet',
  templateUrl: './creation-projet.component.html',
  styleUrls: ['./creation-projet.component.css']
})
export class CreationProjetComponent implements OnInit {

  id: number=0;
  project: any;

  constructor(private formBuilder: FormBuilder, private route: ActivatedRoute,
    private projetService: ProjetService) { }

  ngOnInit() {

      this.id = this.route.snapshot.params['id'];
      this.getProjetDetails();    
  }

  getProjetDetails(): void {
    this.projetService.getProjetById(this.id)
      .subscribe((data: any) => {
        this.project = data;
      });
  }
  
}
