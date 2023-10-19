import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RegisterUserService } from 'src/app/service/register/register-user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit{

  protected requestSpinner: boolean = false;
  protected errorMinusculoEmail: boolean = false;
  protected emailExists: boolean = false;
  protected formulario: FormGroup|any;

  constructor(
    private formBuilder: FormBuilder,
    private registerUserService: RegisterUserService,
    private router: Router
  ) {

    if(localStorage.getItem('token')){
      this.router.navigate(['/home']);
    }

  }

  ngOnInit(): void {

    this.formulario = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
    
  }

  sendPostRequest(): void{   

    const name: string = this.formulario.value.name;
    const email: string = this.formulario.value.email;
    const password: string = this.formulario.value.password;

    const expression: RegExp = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    const resultExpression: boolean = expression.test(email);

    if(!resultExpression){
      this.formulario.get('email').errors = true;
      this.requestSpinner = false;
      return;
    }

    if(email !== email.toLowerCase()){
      this.errorMinusculoEmail = true;
      return;
    } else {
      this.errorMinusculoEmail = false;
    }

    this.requestSpinner = true;
    this.emailExists = false; 

    const jsonData = {
      "name": name,
      "email": email,
      "password": password
    }

    const requestPost = this.registerUserService.postRegisterUser(jsonData);

    requestPost.subscribe({
      next: (res: any) => {
        this.requestSpinner = false;
        this.router.navigate(['/login'], {queryParams: {email: res.email} });
      }, 
      error: (err) => {
        this.requestSpinner = false;

        if(err.status === 400){
          this.emailExists = true;
        }
      }
    });

  }


}
