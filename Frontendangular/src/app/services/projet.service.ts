import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Projet } from 'src/app/projet'; 


@Injectable({
  providedIn: 'root'
})
export class ProjetService {
  private baseUrl = 'http://127.0.0.1:8000/api/projets'; 

  constructor(private http: HttpClient) { }

  getAllProjets() {
    return this.http.get<Projet[]>(this.baseUrl); // Spécifiez le type générique Projet[]
  }

  getProjetById(id: number) {
    return this.http.get<Projet>(`${this.baseUrl}/${id}`); // Spécifiez le type générique Projet
  }

  createProjet(projet: Projet) { // Utilisez le type Projet comme paramètre
    return this.http.post<Projet>(this.baseUrl, projet); // Spécifiez le type générique Projet
  }

  updateProjet(id: number, projet: Projet) { // Utilisez le type Projet comme paramètre
    return this.http.put<Projet>(`${this.baseUrl}/${id}`, projet); // Spécifiez le type générique Projet
  }

  deleteProjet(id: number) {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }
}
