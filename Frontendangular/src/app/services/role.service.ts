import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class RoleService {

  constructor(private http: HttpClient) { }

  createrole(roleName: string, permission: string[]): Observable<any> {
    const roleData = { roleName: roleName, permission};
    
    return this.http.post('http://127.0.0.1:8000/api/roles', roleData);
  }
}
