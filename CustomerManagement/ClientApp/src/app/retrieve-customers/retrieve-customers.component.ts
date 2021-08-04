import { Component, OnInit } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { CustomerService } from './../shared/customer.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-retrieve-customers',
  templateUrl: './retrieve-customers.component.html',
  styleUrls: ['./retrieve-customers.component.css']
})
export class RetrieveCustomersComponent implements OnInit {

  constructor(private http: HttpClient,private service: CustomerService,private router: Router) { }

  list;
  index;
  sum = 0;
  searchKeyWord:string = "";
  pages:[{}]=[{}];
  customersCount;
  currentPage = 0;

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

  retrieveCustomer(index){
  this.service.RetrieveCustomer(index).subscribe(
    res => {
      console.log(res);
      this.router.routeReuseStrategy.shouldReuseRoute = () => false;
      this.router.onSameUrlNavigation = 'reload';
      this.router.navigate(['/']);
    },
    err => {
      debugger;
      console.log(err);
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
  this.service.getDelCustomersPaginated(count,start*10).subscribe(
    res => {
      this.list = res as unknown as [];
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
