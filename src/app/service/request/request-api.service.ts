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

    this.checkRoleUser();

    return this.http.get(`${this.urlApi}/api/tools`, {headers});
  }

  checkRoleUser(){

    const decodeToken = this.jwtService.decodeToken(this.token);
    
    // console.log(decodeToken.roles.includes("ROLE_USER"));
    // console.log(this.token);

  }

}
