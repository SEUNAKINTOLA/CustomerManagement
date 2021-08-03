import { Subscription } from 'rxjs';
import { Component, OnInit,OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { Credentials } from '../../shared/models/credentials.interface';
import { UserService } from '../../shared/services/user.service';
import { finalize } from "rxjs/operators";

import { switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent implements OnInit, OnDestroy {

  private subscription: Subscription;

  brandNew: boolean;
  errors: string;
  isRequesting: boolean;
  submitted: boolean = false;
  credentials: Credentials = { email: '', password: '' };

  constructor(private userService: UserService, private router: Router,private activatedRoute: ActivatedRoute) { }

    ngOnInit() {

    // subscribe to router event
    this.subscription = this.activatedRoute.queryParams.subscribe(
      (param: any) => {
         this.brandNew = param['brandNew'];   
         this.credentials.email = param['email'];         
      });      
  }
  list;
   ngOnDestroy() {
    // prevent memory leak by unsubscribing
    this.subscription.unsubscribe();
  }

  login({ value, valid }: { value: Credentials, valid: boolean }) {
    this.submitted = true;
    this.isRequesting = true;
    this.errors='';
    if(value.email =="") {
      this.errors = "Please input your email address"
      valid = false;
      this.isRequesting = false;
    }
   else if(value.password =="") {
      this.errors = "Please input your password"
      valid = false;
      this.isRequesting = false;
    }
    if(valid)
    {
        this.userService.login(value.email, value.password)
        .pipe(
          switchMap(data => {
          this.userService.UserInfo().subscribe(
            result => {     
               this.isRequesting = false;
                this.list = result;
                console.log(this.list);
                if(this.list.IsAuthenticated){
                  localStorage.setItem('auth_token', this.list.Token);
                  localStorage.setItem('username', this.list.UserName);
                  localStorage.setItem('firstname', this.list.FirstName);
                  localStorage.setItem('lastname', this.list.LastName);
                  this.userService.loggedIn = true;
                  this.userService._authNavStatusSource.next(true);    
                  this.router.navigate(['/']); 
                }        
              
            },
             errors => {
              this.errors = "Invalid login credentials";
              console.log('error 1');
              console.log(this.errors);
             } );
            return this.userService.UserInfo();
          })
        ).subscribe(
          result => {   
            this.isRequesting = false;
            console.log('result 2');
            console.log(result);
          },
          errors => {
            this.isRequesting = false;
           this.errors = "Invalid login credentials";
           console.log('error 2');
           console.log(this.errors);
          } );
    } 
      
  }
}
