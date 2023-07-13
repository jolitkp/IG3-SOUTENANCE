import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Observable } from 'rxjs';
import { Role } from '../role';


@Injectable({
  providedIn: 'root'
})
export class RoleService {

  constructor(private http: HttpClient) { }

  createrole(roleName: string, permission: string[]): Observable<any> {
    const roleData = { roleName: roleName, permission};
    
    return this.http.post('http://127.0.0.1:8000/api/roles', roleData);
  }

  getRole() {
    return this.http.get<any[]>('http://127.0.0.1:8000/api/role');
  }
  getRoles(): Observable<Role[]> {
    return this.http.get<Role[]>('http://127.0.0.1:8000/api/role');
  }

  getRoleNameById(roleId: number): Observable<string> {
  return this.http.get<string>(`http://127.0.0.1:8000/api/role/${roleId}/name`);
}


  getRoleDetail(roleId: number): Observable<any> {
    return this.http.get<any>(`http://127.0.0.1:8000/api/role/${roleId}`);
  }

  deleteRole(id: any) {
    return this.http.delete(`http://127.0.0.1:8000/api/deleteRole/`+id);
  }

 getRolebyId(id: any) {
    return this.http.get(`http://127.0.0.1:8000/api/role/`+id);
  }

  updateRole(updatedRole: any): Observable<any>{
    if (!updatedRole.id) {
      throw new Error('ID du rôle non défini');
    }
    const url = 'http://127.0.0.1:8000/api/updateRole/' + updatedRole.id;
        return this.http.put(url, updatedRole);
  }

}
