import { CustomerService } from './../shared/customer.service';
import { Component, OnInit,Injectable } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';
import {Subscription} from 'rxjs';
import { UserService } from '../shared/services/user.service';
import { CustomerView,CustomerDetails,CustomerPhoto,country,state,Customer } from './../shared/models/customerparameters.interface';
@Component({
  selector: 'app-customer-details',
  templateUrl: './customer-details.component.html',
  styleUrls: ['./customer-details.component.css']
})
@Injectable()
export class CustomerDetailsComponent implements OnInit {
  constructor( private route: ActivatedRoute, private service: CustomerService,private router: Router) { }

    
  status: boolean;
  subscription:Subscription; 
  months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  
  ngOnInit() {
    this.subscription = this.service.currentPageNum$.subscribe(pagenum => {
      this.currentPage = pagenum;
    });
    this.resetForm();
    
    this.service.getCountries().subscribe(
      res => {
        this.country  = res as unknown as country;

        
      this.service.getStates().subscribe(
        res => {
          this.state  = res as unknown as state;
        });

        this.sub = this.route.queryParams.subscribe((params: Params) => {
          this.var1 = params['id'];
          this.getcustomerbyId(this.var1);
          console.log(this.var1);
        });
      });


  }

  country;
  state;
  sub;
  var1;
  customerHistory:[]=[];
  pages:[{}]=[{}];
  historyCount;
  currentPage = 0;
  CustomerCountry ="";
  ownerCountry = "";
  ownerState  =  "";
  tmCountry = "";
  tmState  =  "";
  cmCountry = "";
  cmState  =  "";



  setCurrentPage(page){
    this.currentPage = page;
  }

  resetForm(form?: NgForm) {
    if (form != null)
      form.form.reset();
    this.service.resetAllForms()
  }

  imo;
  curOwnerId:string = "";
  allCustomerdetails:CustomerView;
  errors:string[] = [];
  success:string[] = [];

  getcustomerbyId(id){
    this.service.getCustomerById(id)
    .toPromise()
    .then(res => {
        this.service.formDataToSubmit = res as unknown as  CustomerView;
        this.CustomerCountry = this.country.filter(p => p.CountryId == this.service.formDataToSubmit.CountryId)[0].CountryName;
      },
      err => {
        console.log(err);
      }
    )
  }




  convertDate(date_str) {
    var temp_date = date_str.split("-");
    return temp_date[2] + " " + this.months[Number(temp_date[1]) - 1] + " " + temp_date[0];
  }
  
  
  ISODateString(d){
      d = new Date(d);
      function pad(n){return n<10 ? '0'+n : n}
      return d.getFullYear()+'-'
      + pad(d.getMonth()+1)+'-'
      + pad(d.getDate())
  }

}
