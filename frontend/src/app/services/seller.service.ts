import { EventEmitter, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { login, signup } from '../datatype';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class SellerService {
  // issellerloggedin: boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree>;


  // issellerloggedin = new BehaviorSubject<boolean>(false)
  // isloginerror = new EventEmitter<boolean>(false)

  constructor(private http: HttpClient, private router: Router) { }

  usersignup(data: signup) {
    return this.http.post("http://localhost:8000/sellerregister", data);
  }

  // loginuser(data: login) {
  //   this.http.get<signup[]>(`http://localhost:8000/sellerregister?email=${data.email}&password=${data.password}`, { observe: 'response' }).subscribe((result) => {
  //     console.warn(result)
  //     if (result && result.body && result.body.length) {
  //       console.log("user logged in");
  //       localStorage.setItem('seller', JSON.stringify(result.body))
  //       this.router.navigate(['seller-home'])
  //       this.isloginerror.emit(false)
  //     } else {
  //       console.warn("login failed");
  //       this.isloginerror.emit(true)
  //     }
  //   })
  // }

  loginuser(data: any) {
    return this.http.post("http://localhost:8000/sellerlogin", data);
  }

  reloadseller() {
    if (localStorage.getItem('Seller')) {
      // this.issellerloggedin.next(true);
      this.router.navigate(['seller-home']);
    }
  }

}
