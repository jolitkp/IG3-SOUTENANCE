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

  blockUser(userId: number){
    return this.http.put('http://127.0.0.1:8000/api/users/${userId}/block', {});
  }

  deleteUser(userId: number){
    return this.http.delete('http://127.0.0.1:8000/api/users/${userId}');
  }

  getUsers(): Observable<any[]>{
    return this.http.get<any[]>('http://127.0.0.1:8000/api/users');
  }
}
