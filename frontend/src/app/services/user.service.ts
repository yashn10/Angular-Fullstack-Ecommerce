import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { contacts, login, signup } from '../datatype';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient, private router: Router) { }

  // isloginerror = new EventEmitter<boolean>(false)

  renderurl = 'https://angular-fullstack-ecommerce.onrender.com';
  localhosturl = 'http://localhost:8000';


  usersignup(data: signup) {
    return this.http.post(`${this.renderurl}/userregister`, data)
  }


  userlogin(data: login) {
    return this.http.post(`${this.renderurl}/userlogin`, data)
  }


  usercontact(data: contacts) {
    return this.http.post(`${this.renderurl}/contact`, data);
  }

}
