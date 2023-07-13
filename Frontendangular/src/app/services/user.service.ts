import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  createUser(user: any){
    return this.http.post('http://127.0.0.1:8000/api/signup-page', user);
  }

  blockUser(id: any){
    return this.http.patch(`http://127.0.0.1:8000/api/users/${id}/block`, {});
  }

  unblockUser(id: any) {
    return this.http.patch(`http://127.0.0.1:8000/api/users/${id}/unblock`, {});
  }

  deleteUser(id: any){
    return this.http.delete(`http://127.0.0.1:8000/api/deleteUser/`+id);
  }

  getUsers(): Observable<any[]>{
    return this.http.get<any[]>('http://127.0.0.1:8000/api/users');
  }

  getUserRole(id: number) {
    return this.http.get<any>(`http://127.0.0.1:8000/api/users/${id}/role`);
  }

  addUser(user: any): Observable<any> {
    return this.http.post<any>('http://127.0.0.1:8000/api/addUser', user);
  }

  assignRole(userId: number, roleId: number ): Observable<any> {
    const data = { userId, roleId }; // Données à envoyer dans la requête
    return this.http.post<any>('http://127.0.0.1:8000/api/assignerole', data);
  }
  
}
