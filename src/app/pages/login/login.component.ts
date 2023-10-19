import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginUserService } from 'src/app/service/login/login-user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{
  
  protected emailPageRegister: String = '';
  protected formulario: FormGroup|any;
  protected invalidCredentials: boolean = false;
  protected invalidCredentialsMessage: String = 'E-mail ou senha incorreto.';
  protected requestSpinner: boolean = false;
  
  constructor(
    private formBuilder: FormBuilder, 
    private activedRouter: ActivatedRoute,
    private router: Router,
    private loginUserService: LoginUserService,
  ) {

    if(localStorage.getItem('token')){
      this.router.navigate(['/home']);
    }

  }

  ngOnInit(): void {

    this.activedRouter.queryParams.subscribe( (params) => {
      this.emailPageRegister = params['email'];
    });

    this.formulario = this.formBuilder.group({
      email: [this.emailPageRegister, Validators.required],
      password: ['', Validators.required]
    });
    
  }

  sendLogin(): void {

    this.requestSpinner = true;

    const objectData = {
      username: this.formulario.value.email,
      password: this.formulario.value.password
    }

    const requestLogin = this.loginUserService.postLoginUser(objectData);

    requestLogin.subscribe({
      next: (res: any) => {
        localStorage.setItem('token', res.token);

        this.router.navigate(['/home']);
        this.requestSpinner = false;
      },
      error: (err: any) => {
        this.requestSpinner = false;
        console.log(err);
        
        this.invalidCredentials = err.status === 401 ? true : false;

      }
    });


  }

}
