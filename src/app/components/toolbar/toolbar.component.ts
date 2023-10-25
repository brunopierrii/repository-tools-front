import { Component, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { LoginUserService } from 'src/app/service/login/login-user.service';
import { RequestApiService } from 'src/app/service/request/request-api.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent {

  protected infoUser: Object | any = this.apiService.getInfoUser();
  protected userName: String = '';
  @Output() loading = new EventEmitter();

  constructor(
    private apiService: RequestApiService,
    private router: Router,
    private loginService: LoginUserService
  ) {

    this.userName = this.infoUser.username

  }



  logout(): void {

    this.loading.emit(true);

    setTimeout(() => {
      localStorage.removeItem('token');
      location.href = '/login';
    }, 1000);
    
  }




}
