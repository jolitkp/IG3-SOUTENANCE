import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Projet } from 'src/app/projet'; 
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ProjetService {
  private baseUrl = 'http://127.0.0.1:8000/api/projets'; 

  constructor(private http: HttpClient) { }

  getAllProjets(): Observable<any> {
    return this.http.get<any[]>('http://127.0.0.1:8000/api/projets'); // Spécifiez le type générique Projet[]
  }

  addProjet(projet: any): Observable<any> {
    return this.http.post<any>('http://127.0.0.1:8000/api/addProjet', projet);
  }

  getProjetById(id: number) {
    return this.http.get(`http://127.0.0.1:8000/api/projet/`+id); // Spécifiez le type générique Projet
  }

  getProjetWithTaches(id: number): Observable<any[]> {
    return this.http.get<any[]>(`http://127.0.0.1:8000/api/projet/${id}/taches`); // Specifiez le type générique Projet
  }

  deleteTache(id: number): Observable<any> {
    return this.http.delete<any>(`http://127.0.0.1:8000/api/deleteTache/${id}`);
  }

  creerTache(projetId: number, nouvelleTache: any): Observable<any> { // Utilisez le type Projet comme paramètre
    const url = `http://127.0.0.1:8000/api/projets/${projetId}/taches`;
    return this.http.post(url, nouvelleTache);  }

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
