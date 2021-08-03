import { Subscription } from 'rxjs';
import { Component, OnInit,OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { Credentials,ResetCredentials } from '../../shared/models/credentials.interface';
import { UserService } from '../../shared/services/user.service';
import { finalize } from "rxjs/operators";

import { switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-reset-pass',
  templateUrl: './reset-pass.component.html',
  styleUrls: ['./reset-pass.component.scss']
})
export class ResetPassComponent implements OnInit, OnDestroy {

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
         this.userService.resetpassparam.Email = param['email'];   
         this.userService.resetpassparam.Token = param['token'];         
         this.credentials.email = param['email'];   
      });      
  }
  list;
   ngOnDestroy() {
    // prevent memory leak by unsubscribing
    this.subscription.unsubscribe();
  }

  reset({ value, valid }: { value: ResetCredentials, valid: boolean }) {
    
    this.submitted = true;
    this.isRequesting = true;
    this.errors='';
    var re = /^(?=.*\d)(?=.*[!@#$%^&*]).{8,}$/;
    if (value.password.length < 8) {
     this.errors  = "Your password must be at least 8 characters"; 
   }else if ((value.password.search(/[a-z]/i) < 0 ) && (value.password.search(/[A-Z]/i) < 0)) {
     this.errors  =  "Your password must contain at least one letter.";
   }else if (value.password.search(/[0-9]/) < 0) {
     this.errors  =  "Your password must contain at least one digit."; 
   }else if( !re.test(value.password)){
    this.errors  = "Your password must contain at least on special character"; 
  }else if(value.password != value.cpassword){
    this.errors  = "Please confirm your password correctly"; 
  }
   if (this.errors  != '') {
     this.isRequesting = false;
       valid =  false;
   }
    if(valid)
    {
      this.userService.resetpassparam.ConfirmPassword  = value.password;
      this.userService.resetpassparam.NewPassword  = value.password;
        this.userService.ResetPass()
        .subscribe(
            result => {     
               this.isRequesting = false;
                this.list = result;
                console.log('result 1');
                console.log(this.list);
                this.router.navigate(['/login'],{queryParams: {brandNew: true,email:value.email}});   
            },
             errors => {
              this.errors = "Reset password failed";
              console.log('error 1');
              console.log(this.errors);
             } );
    } 
      
  }
}
