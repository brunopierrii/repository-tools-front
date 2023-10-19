import { Component } from '@angular/core';
import { RequestApiService } from 'src/app/service/request/request-api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  protected toolsList: Object|any;
  
  constructor(private requestApi: RequestApiService) {
    this.getToolsList();

  }

  getToolsList(): void {
    
    const request = this.requestApi.getToolsAll();

    request.subscribe({
      next: (res: any) => { 
        console.log(res);
        this.toolsList = res;
      },
      error:
      (err: any) => {
        console.log(err)
      }
    });

  }

}
