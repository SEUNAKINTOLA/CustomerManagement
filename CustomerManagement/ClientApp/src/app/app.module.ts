import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { CalendarModule } from '@syncfusion/ej2-angular-calendars';
import { DateTimePickerModule } from "@syncfusion/ej2-angular-calendars";
/* Account Imports */
import { AccountModule }  from './account/account.module';

import { ToastrModule } from 'ngx-toastr';
import { AppComponent } from './app.component';
import { NewCustomerComponent } from './new-customer/new-customer.component';
import { ConfigService } from './shared/utils/config.service';

import { UserService }  from './shared/services/user.service';
import { Customers } from './customers/customers.component';
import { CustomerDetailsComponent } from './customer-details/customer-details.component';
import { RetrieveCustomersComponent } from './retrieve-customers/retrieve-customers.component';
@NgModule({
  declarations: [
    AppComponent,
    NewCustomerComponent,
    Customers,
    CustomerDetailsComponent,
    RetrieveCustomersComponent
  ],
  imports: [
    CalendarModule,DateTimePickerModule,AccountModule,
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    RouterModule.forRoot([
      { path: 'new-customer', component: NewCustomerComponent },
      { path: '', component: Customers, pathMatch: 'full' },
      { path: 'customer-details', component: CustomerDetailsComponent},
      { path: 'retrieve-customers', component: RetrieveCustomersComponent}
    ])
  ],
  providers:    [ UserService,ConfigService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
