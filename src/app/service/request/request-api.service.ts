import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RequestApiService {

  private urlApi: String = 'https://localhost:8000';
  private headers: String|any;
  private token: String|any;

  constructor(
    private http: HttpClient,
    private jwtService: JwtHelperService
  ) {

    this.token = localStorage.getItem('token');

    this.headers = {
      "Content-type": "application/json",
      "Authorization": `Bearer ${this.token}`
    }

  }

  getToolsAll(): Observable<any>{

    const headers = this.headers;

    return this.http.get(`${this.urlApi}/api/tools`, {headers});
  }

  postNewTool(json: Object): Observable<any> {

    const headers = this.headers;

    return this.http.post(`${this.urlApi}/api/tools/new`, json, {headers})
  }

  editTool(id: string, json: Object): Observable<any> {

    const headers = this.headers;

    return this.http.put(`${this.urlApi}/api/tools/edit/${id}`, {headers})

  }

  deleteTool(id: string): Observable<any> {

    const headers = this.headers;

    return this.http.delete(`${this.urlApi}/api/tools/delete/${id}`, {headers})

  }

  checkRoleUser(){

    const decodeToken = this.jwtService.decodeToken(this.token);
    
    console.log(decodeToken);

  }

  getInfoUser(): String {
    const decodeToken = this.jwtService.decodeToken(this.token);
    
    return decodeToken;
  }

}
