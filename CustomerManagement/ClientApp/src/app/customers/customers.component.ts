import { Component, OnInit } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { CustomerView,CustomerDetails,CustomerPhoto,country,state,Customer } from './../shared/models/customerparameters.interface';
import { CustomerService } from './../shared/customer.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css']
})
export class Customers implements OnInit {


  constructor(private http: HttpClient,private service: CustomerService,private router: Router) { }

  list;
  index;
  sum = 0;
  searchKeyWord:string = "";
  pages:[{}]=[{}];
  customersCount;
  currentPage = 0;

  errors:string[] = [];
  success:string[] = [];


  ngOnInit() {
    this.getCustomersPaginated(10,this.currentPage);
  }

  SearchCustomer(){
    this.service.getCustomersByName(this.searchKeyWord)
    .toPromise()
    .then(res => {
      this.list = res ; 
      console.log(this.list);
    });
  }
  editCustomer(index){
    
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = 'reload';
    this.router.navigate(['/new-customer'], { queryParams: { id: index } });   
  }

delete(index){
  this.service.deleteCustomer(index).subscribe(
    res => {
      console.log(res);
      this.router.routeReuseStrategy.shouldReuseRoute = () => false;
      this.router.onSameUrlNavigation = 'reload';
      this.router.navigate(['/']);
    },
    err => {
      console.log(err);
    }
  )
}

sendAdminComment(userId){
  this.service.sendCustomerMessage(userId).subscribe(
    res => {
      console.log(res);
      this.success = [];
      this.success.splice(0, 1);
      this.success.push("Comment successfully sent to customer");
    },
    err => {
      this.errors = [];
      this.errors.splice(0, 1);
      this.errors.push("Action failed");
    }
  )
}



setCurrentPage(page){
  this.currentPage = page;
  console.log(this.currentPage);
  this.getCustomersPaginated(10,this.currentPage);
}

getCustomersPaginated(count,start){
  this.list = [];
  this.service.getCustomersPaginated(count,start*10).subscribe(
    res => {
      this.list = res as [];
      console.log(this.list);
      this.getCustomersCount();
    },
    err => {
      console.log(err);
    }
  )
}

getCustomersCount(){
  this.pages = [{}];
  this.pages.splice(0,1);
  this.service.getCustomersCount().subscribe(
    res => {
      this.customersCount = Number(res);
      console.log(this.customersCount);
      if(this.customersCount >0){
        let k = 0;
        for(let i=0;i<this.customersCount;i++){
          var remainder = i % 10;
          if (remainder == 0){
            k = k+1;
            this.pages.push(k);
          }
        }
      }
    },
    err => {
      console.log(err);
    }
  )
}

}
