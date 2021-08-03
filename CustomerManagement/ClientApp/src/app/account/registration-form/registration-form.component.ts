import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { UserRegistration } from '../../shared/models/user.registration.interface';
import { UserService } from '../../shared/services/user.service';
import { finalize } from "rxjs/operators";


@Component({
  selector: 'app-registration-form',
  templateUrl: './registration-form.component.html',
  styleUrls: ['./registration-form.component.scss']
})
export class RegistrationFormComponent implements OnInit {

 errors: string;  
 successmessage: string;
 isRequesting: boolean;
 submitted: boolean = false;
 
 constructor(private userService: UserService,private router: Router) { 
   
 }

  ngOnInit() {
          
  }

  registerUser({ value, valid }: { value: UserRegistration, valid: boolean }) {
     this.submitted = true;
     this.isRequesting = true;
     this.errors='';
     this.successmessage = "";
     var re = /^(?=.*\d)(?=.*[!@#$%^&*]).{8,}$/;
     if (value.firstName.length < 1) {
      this.errors  = "Please input your first name"; 
     }
     if (value.lastName.length < 1) {
      this.errors  = "Please input your last name"; 
     }
     if (value.email.length < 1) {
      this.errors  = "Please input your email"; 
     }
    else if (value.password.length < 8) {
      this.errors  = "Your password must be at least 8 characters"; 
    }else if ((value.password.search(/[a-z]/i) < 0 ) && (value.password.search(/[A-Z]/i) < 0)) {
      this.errors  =  "Your password must contain at least one letter.";
    }else if (value.password.search(/[0-9]/) < 0) {
      this.errors  =  "Your password must contain at least one digit."; 
    }else if( !re.test(value.password)){
      this.errors  = "Your password must contain at least on special character"; 
    }
    if (this.errors  != '') {
      this.isRequesting = false;
        valid =  false;
    }
     if(valid)
     {
         this.userService.register(value.email,value.password,value.firstName,value.lastName,value.location).pipe(
          finalize(() => this.isRequesting = false))
          .subscribe(
            result  => {
              this.successmessage = "Registration Successful";
              console.log(result);
                this.router.navigate(['/login'],{queryParams: {brandNew: true,email:value.email}});                         
            },
            errors => {
              if(errors.error.length < 100 ) this.errors = errors.error;
              else  this.errors = "Registration Failed"
            } );
     }      
  }  
}
