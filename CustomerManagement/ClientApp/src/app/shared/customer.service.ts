import { Injectable } from '@angular/core';
import { HttpClient } from "./http";
import { Guid } from "guid-typescript";
import { Observable } from 'rxjs';
import { BehaviorSubject } from 'rxjs';
import { CustomerView,CustomerDetails,CustomerPhoto,country,state,Customer } from './../shared/models/customerparameters.interface';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  public _currentPageNumber = new BehaviorSubject<number>(0);
  // Observable navItem stream
  currentPageNum$ = this._currentPageNumber.asObservable();

  dateWithTime = this.ISODateString(new Date());



  formData: CustomerView =  new CustomerView();

 

  formDataToSubmit: CustomerView =  new CustomerView();


  dir = "";

  readonly rootURL = 'http://localhost:57621/api';
  list : CustomerView[];
  constructor(private http: HttpClient) { }


  

  ISODateString(d){
    function pad(n){return n<10 ? '0'+n : n}
    return d.getUTCFullYear()+'-'
    + pad(d.getUTCMonth()+1)+'-'
    + pad(d.getUTCDate())+'T'
    + pad(d.getUTCHours())+':'
    + pad(d.getUTCMinutes())+':'
    + pad(d.getUTCSeconds())+'Z'
}


  resetAllForms(){
    
  this.formDataToSubmit  =  new CustomerView();
  }
  getCountries(){
    return this.http.get(this.rootURL + '/Countries');
  }

  getStates(){
    return this.http.get(this.rootURL + '/States');
  }


  addCustomer(){
  this.formDataToSubmit.DateCreated      =  this.dateWithTime;
  this.formDataToSubmit.LastModifiedDate =  this.dateWithTime;
  this.formDataToSubmit.UserId =   String(Guid.create());
  this.formDataToSubmit.UserDetailsId =   String(Guid.create());
  console.log("this.formDataToSubmit");
  console.log(this.formDataToSubmit);
   return this.http.post(this.rootURL + '/customers/Postcustomer', this.formDataToSubmit);
  }
  

  getCustomers(){
    return this.http.get(this.rootURL + '/customers/Getcustomer');
  }

  getCustomersByName(name) {
    return this.http.get(this.rootURL + '/customers/GetcustomerByName?name='+ name);
  }
  getCustomersBy(name) {
    return this.http.get(this.rootURL + '/customers/GetcustomerByName?name='+ name);
  }
  
  getCustomerById(id) {
    return this.http.get(this.rootURL + '/customers/GetcustomerById/'+ id);
  }


  updateCustomer() {
    this.formDataToSubmit.LastModifiedDate =  this.dateWithTime;
    console.log("this.formDataToSubmit a");
    console.log("this.formDataToSubmit");
    console.log(this.formDataToSubmit);
  return this.http.put(this.rootURL + '/customers/Putcustomer/'+ this.formDataToSubmit.UserId, this.formDataToSubmit);
  }

  deleteCustomer(id) {
    return this.http.delete(this.rootURL + '/customers/Deletecustomer/'+ id);
  }

  sendCustomerMessage(id) {
    return this.http.get(this.rootURL + '/customers/SendCustomerMessage?id='+ id);
  }

  RetrieveCustomer(id) {
    return this.http.delete(this.rootURL + '/customers/Retrievecustomer/'+ id);
  }

  getCustomersCount() {
    return this.http.get(this.rootURL + '/customers/GetcustomerCount');
  }

  getCustomersPaginated(count,start) {
    return this.http.get(this.rootURL + '/customers/GetcustomerPaginated?count='+count+'&start='+start);
  }

  getDelCustomersPaginated(count,start) {
    return this.http.get(this.rootURL + '/customers/GetDeletedcustomerPaginated?count='+count+'&start='+start);
  }


  getCustomer(imo) {
    return this.http.get(this.rootURL + '/AllCustomerDetails?mmsi='+ imo);
  }

}
