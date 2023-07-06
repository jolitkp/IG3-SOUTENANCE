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

  getRole(){
    return this.http.get<any[]>('http://127.0.0.1:8000/api/role');
  }

  getRoleDetail(roleId: number): Observable<any> {
    return this.http.get<any>(`http://127.0.0.1:8000/api/role/${roleId}`);
  }

  deleteRole(roleId: number): Observable<any> {
    return this.http.delete('http://127.0.0.1:8000/api/role/${roleId}');
  }

}
