import { Component } from '@angular/core';
import { UserService } from './../shared/services/user.service';
import { Router, ActivatedRoute } from '@angular/router';
import { CustomerService } from './../shared/customer.service';
@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.css']
})
export class NavMenuComponent {
  isExpanded = false;
firstName = "";
lastName ="";

  constructor(private service: CustomerService,private userService: UserService, private router: Router) { }
  
  ngOnInit() {
    if(!this.userService.isLoggedIn()) {
      this.logout();
    }

    this.firstName  =  localStorage.getItem('firstname');
    this.lastName  =  localStorage.getItem('lastname');
  }

  
  collapse() {
    this.isExpanded = false;
  }

  logout(){
    this.userService.logout();
    this.router.navigate(['/login']);     
  }
  
  toggle() {
    this.isExpanded = !this.isExpanded;
  }
}
