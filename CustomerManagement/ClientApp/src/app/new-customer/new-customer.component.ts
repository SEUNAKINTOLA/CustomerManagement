import { CustomerService } from './../shared/customer.service';
import { Component, OnInit,Injectable } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import * as $ from "jquery";
import { Router, ActivatedRoute, Params } from '@angular/router';
import { CustomerView,CustomerDetails,CustomerPhoto,country,state,Customer } from './../shared/models/customerparameters.interface';
@Component({
  selector: 'app-new-customer',
  templateUrl: './new-customer.component.html',
  styleUrls: ['./new-customer.component.css']
})
@Injectable()
export class NewCustomerComponent implements OnInit {
  constructor( private route: ActivatedRoute, private service: CustomerService,
    private toastr: ToastrService,private router: Router) { }

  ngOnInit() {
   this.toastr.success('Submitted successfully', 'New Customer');
   this.service.resetAllForms()
    
    console.log(this.service.formDataToSubmit);
    this.service.getCountries().subscribe(
      res => {
        this.country  = res as country;
      });

      this.service.getStates().subscribe(
        res => {
          this.state  = res as state;
        });


    this.sub = this.route.queryParams.subscribe((params: Params) => {
      this.var1 = params['id'];
     if(this.var1 != undefined) this.getcustomerbyId(this.var1);
      console.log(this.var1);
    });

  }


  country;
  state:state;
  sub;
  var1;
  errors:string[] = [];
  success:string[] = [];

  getcustomerbyId(id){
    this.service.getCustomerById(id).subscribe(
      res => {
        this.service.formDataToSubmit = res as  CustomerView;
      },
      err => {
        console.log(err);
      }
    )
  }



  onSubmit(form: NgForm) { 
    this.errors = [""];
    this.errors.splice(0, 1);
    if(this.service.formDataToSubmit.CountryId =="" || this.service.formDataToSubmit.CountryId == null  ||  this.service.formDataToSubmit.CountryId == "undefined") this.errors.push("Customer's Country cannot be empty");
     if(this.errors.length > 0) return "";
    if (this.service.formDataToSubmit.UserId == null || this.service.formDataToSubmit.UserId == "")
      this.insertRecord(form);
    else
      this.updateRecord(form);
  }

  insertRecord(form: NgForm) {
    this.service.addCustomer().subscribe(
      res => {

      this.success = [];
      this.success.splice(0, 1);
      this.success.push("New Customer successfully added");
        this.toastr.success('Submitted successfully', 'New Customer');
      },
      err => {
        this.errors = [];
        this.errors.splice(0, 1);
        if(err.error == "Exists")
        this.errors.push("Customer already exists on the system");
        else 
        this.errors.push("Submission failed");
        this.service.formDataToSubmit.UserId = "";
        console.log(err);
      }
    );
  }

  updateRecord(form: NgForm) {

    this.service.updateCustomer().subscribe(
      res => {
        this.success = [];
        this.success.splice(0, 1);
        this.success.push("New Customer successfully added");
          this.toastr.success('Submitted successfully', 'New Customer');
        this.router.routeReuseStrategy.shouldReuseRoute = () => false;
        this.router.onSameUrlNavigation = 'reload';
        this.router.navigate(['/']);
      },
      err => {
        console.log(err);
      }
    )
  }

}
