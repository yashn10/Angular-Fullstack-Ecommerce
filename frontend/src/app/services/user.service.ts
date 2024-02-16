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


  usersignup(data: signup) {
    return this.http.post('http://localhost:8000/userregister', data)
  }


  userlogin(data: login) {
    return this.http.post('http://localhost:8000/userlogin', data)
  }


  usercontact(data: contacts) {
    return this.http.post('http://localhost:8000/contact', data);
  }

}
