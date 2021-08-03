import { Injectable } from '@angular/core';
import { HttpClient,HttpResponse,HttpHeaders } from "@angular/common/http";

//import { Http, Response, Headers, RequestOptions } from '@angular/http';

import { UserRegistration } from '../models/user.registration.interface';
import { ConfigService } from '../utils/config.service';

import {BaseService} from "./base.service";

import { Observable } from 'rxjs';
import { BehaviorSubject } from 'rxjs';


//import * as _ from 'lodash';

@Injectable({
  providedIn: 'root'
})
export class UserService extends BaseService {

  baseUrl: string = '';

  // Observable navItem source
  public _authNavStatusSource = new BehaviorSubject<boolean>(false);
  // Observable navItem stream
  authNavStatus$ = this._authNavStatusSource.asObservable();

  public loggedIn = false;

  constructor(private http: HttpClient, private configService: ConfigService) {
    super();
    this.loggedIn = !!localStorage.getItem('auth_token');
    // ?? not sure if this the best way to broadcast the status but seems to resolve issue on page refresh where auth status is lost in
    // header component resulting in authed user nav links disappearing despite the fact user is still logged in
    this._authNavStatusSource.next(this.loggedIn);
    this.baseUrl = configService.getApiURI();
  }

    register(email: string, password: string, firstName: string, lastName: string,location: string) {
    let body = JSON.stringify({ email, password, firstName, lastName,location });
    this.registerparam = {
      Email: email,
      UserName: email,
      FirstName: firstName,
      LastName: lastName,
      Password: password,
      RememberMe: true
    }
    return this.http.post(this.baseUrl + "/Authorize/Register", this.registerparam);
  }  

  errors='';
  public UserName:string;
  Password:string;
  RememberMe:boolean;
  loginparam: LoginParameters= {
    UserName: "",
    Password: "",
    RememberMe: true
  };
  registerparam: RegisterParameters= {
    Email: "",
    UserName: "",
    FirstName: "",
    LastName: "",
    Password: "",
    RememberMe: true
  };
  resetpassparam: ResetPassParameters= {
    Token: "",
    Email: "",
    NewPassword: "",
    ConfirmPassword: ""
  };
  private httpOptions: any;

  login(userName, password) { 
    this.loginparam = {
      UserName: userName,
      Password: password,
      RememberMe: true
    }
   // console.log(this.loginparam);
     return this.http.post(this.baseUrl + '/Authorize/Login', this.loginparam);
  }


  ResetPass() { 
   // console.log(this.resetpassparam);
     return this.http.post(this.baseUrl + '/Authorize/ResetPasswordAsync3', this.resetpassparam);
  }
  UserInfo() { 
    return this.http.get(this.baseUrl + '/Authorize/UserInfo');
 }
 sendPassLink(email) { 
   return this.http.get(this.baseUrl + '/Authorize/GetResetPasswordToken?email='+email);
}

  logout() {
    this.http.post(this.baseUrl + '/Authorize/Logout',{})
    .subscribe(
      result => {     
        console.log("logout");  
        console.log(result);   
      },
       errors =>  this.errors = errors);
    localStorage.removeItem('auth_token');
    this.loggedIn = false;
    this._authNavStatusSource.next(false);
  }

  isLoggedIn() {
    return this.loggedIn;
  }  
  
}


interface RegisterParameters {
  Email: string;
  UserName: string;
  FirstName: string;
  LastName: string;
  Password: string;
  RememberMe: Boolean;
}


interface ResetPassParameters{
  Token: string;
  Email:string;
  NewPassword: string;
  ConfirmPassword: string;
};
interface LoginParameters {
  UserName: string;
  Password: string;
  RememberMe: Boolean;
}

