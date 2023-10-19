import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RegisterUserService {
  
  private urlApi: String = 'https://localhost:8000';
  private endPointRegister: String = '/api/app/register';

  constructor(private http: HttpClient) { }

  postRegisterUser(json: Object): Observable<any> {
    
    var headers = { 'Content-type': 'application/json' }

    return this.http.post(`${this.urlApi}${this.endPointRegister}`, json, {headers} );
  }
}
