import {Injectable} from '@angular/core';
import { HttpClient as  Http,HttpHeaders } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})export class HttpClient2 {
  token = localStorage.getItem('auth_token');

  constructor(private http: Http) {}

  createAuthorizationHeader(headers: HttpHeaders) {
    headers = headers.append('Authorization', ' Bearer ' + this.token); 
  }

  get(url) {
    let headers = new HttpHeaders();
    this.createAuthorizationHeader(headers);
    headers = headers.append('Authorization', ' Bearer ' + this.token); 

    // headers.set('Authorization', ' Bearer  dffdfdfd'); 
    return this.http.get(url, {
      'headers': headers
    });
  }
  delete(url) {
    let headers = new HttpHeaders();
    this.createAuthorizationHeader(headers);
    return this.http.delete(url, {
      'headers': headers
    });
  }
  

  put(url, data) {
    let headers = new HttpHeaders();
    this.createAuthorizationHeader(headers);
    return this.http.put(url, data, {
      'headers': headers
    });
  }
  post(url, data) {
    let headers = new HttpHeaders();
    this.createAuthorizationHeader(headers);
    return this.http.post(url, data, {
      'headers': headers
    });
  }
}