import { Subscription } from 'rxjs';
import { Component, OnInit,OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { Credentials } from '../../shared/models/credentials.interface';
import { UserService } from '../../shared/services/user.service';
import { finalize } from "rxjs/operators";

import { switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-forgot-pass',
  templateUrl: './forgot-pass.component.html',
  styleUrls: ['./forgot-pass.component.scss']
})
export class ForgotPassComponent implements OnInit, OnDestroy {

  private subscription: Subscription;

  brandNew: boolean;
  errors: string;
  successmessage: string;
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

  SendPassLink({ value, valid }: { value: Credentials, valid: boolean }) {
    this.successmessage = null;
    this.submitted = true;
    this.isRequesting = true;
    this.errors='';
    if(value.email =="") {
      this.errors = "Please input your email address"
      valid = false;
      this.isRequesting = false;
    }
    if(valid)
    {
        this.userService.sendPassLink(value.email)
        .subscribe(
            result => { 
               this.isRequesting = false;
               this.successmessage = result as string;  
               if(this.successmessage =="202") this.successmessage = "Reset mail sent successfully";   
               else{
                   this.errors = "Account not found on CustomerManagement";
               }    
            },
             errors => {
              this.errors = "Account not found on CustomerManagement";
              console.log('error 1');
              console.log(this.errors);
             } );
    } 
      
  }
}
