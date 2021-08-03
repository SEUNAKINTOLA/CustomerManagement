import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule }  from '@angular/forms';

import { HeaderComponent } from './header/header.component';
import { UserService }  from '../shared/services/user.service';

import { EmailValidator } from '../directives/email.validator.directive';

import {SpinnerComponent} from '../spinner/spinner.component';  
import { routing }  from './account.routing';
import { RegistrationFormComponent }   from './registration-form/registration-form.component';
import { LoginFormComponent } from './login-form/login-form.component';
import { ForgotPassComponent }    from './forgot-pass/forgot-pass.component';
import { ResetPassComponent }    from './reset-pass/reset-pass.component';
import { NavMenuComponent }    from './../nav-menu/nav-menu.component';

@NgModule({
  imports: [
    CommonModule,FormsModule,routing
  ],
  declarations: [NavMenuComponent,RegistrationFormComponent,ForgotPassComponent,ResetPassComponent,EmailValidator, LoginFormComponent, SpinnerComponent,
    HeaderComponent],
  providers:    [ UserService ],
  exports: [NavMenuComponent]
})
export class AccountModule { }
