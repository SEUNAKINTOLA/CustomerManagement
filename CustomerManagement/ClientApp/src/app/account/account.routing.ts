import { ModuleWithProviders } from '@angular/core';
import { RouterModule }        from '@angular/router';

import { RegistrationFormComponent }    from './registration-form/registration-form.component';
import { LoginFormComponent }    from './login-form/login-form.component';
import { ForgotPassComponent }    from './forgot-pass/forgot-pass.component';
import { ResetPassComponent }    from './reset-pass/reset-pass.component';

export const routing: ModuleWithProviders = RouterModule.forChild([
  { path: 'register', component: RegistrationFormComponent},
  { path: 'login', component: LoginFormComponent},
  { path: 'forgot-pass', component: ForgotPassComponent},
  { path: 'reset-pass', component: ResetPassComponent}
]);

 