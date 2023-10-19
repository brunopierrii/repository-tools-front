import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginUserService {

  private urlApi: String = 'https://localhost:8000';
  private endPointLogin: String = '/api/login'

  constructor(private http: HttpClient) { }

  postLoginUser(json: Object): Observable<any>{

    const headers = { 'Content-type': 'application/json' };

    return this.http.post(`${this.urlApi}${this.endPointLogin}`, json, {headers})
  }

}
