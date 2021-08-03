import { Injectable } from '@angular/core';
import { CustomerService } from "../customer.service";
 
@Injectable()
export class ConfigService {
     
    _apiURI : string;
 
    constructor(private service : CustomerService) {
        this._apiURI = service.rootURL;
     }
 
     getApiURI() {
         return this._apiURI;
     }    
}
 