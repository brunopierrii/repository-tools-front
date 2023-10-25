import { Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { RequestApiService } from 'src/app/service/request/request-api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  protected toolsList: Object|any;
  protected isListEmpty: boolean = false;
  protected requestSpinner: boolean = false;
  
  constructor(
    private requestApi: RequestApiService,
    private router: Router
  ){
    
    this.getToolsList();

  }
  
  getToolsList(): void {
    
    const request = this.requestApi.getToolsAll();

    request.subscribe({
      next: (res: any) => { 

        this.isListEmpty = res.length === 0 ? true : false;
        
        this.toolsList = new MatTableDataSource(res);

      },
      error:(err: any) => {

        if(err.status === 401){
          localStorage.removeItem('token');
          location.href = '/login';
        }
      }
    });

  }

  onLoading(loading: boolean): void{
    this.requestSpinner = loading
  }

}
