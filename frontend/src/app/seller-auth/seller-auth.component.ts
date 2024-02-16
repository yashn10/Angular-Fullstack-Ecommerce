import { Component, OnInit } from '@angular/core';
import { SellerService } from '../services/seller.service';
import { Router } from '@angular/router';
import { login, signup } from '../datatype';
import Swal from 'sweetalert2';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-seller-auth',
  templateUrl: './seller-auth.component.html',
  styleUrls: ['./seller-auth.component.scss']
})
export class SellerAuthComponent implements OnInit {


  sellerlogin!: FormGroup
  sellerSignup!: FormGroup

  constructor(private seller: SellerService, private router: Router, private http: HttpClient, private formbuilder: FormBuilder) { }

  islogin = false

  ngOnInit(): void {
    this.seller.reloadseller();

    this.sellerSignup = this.formbuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required, Validators.minLength(5), Validators.maxLength(20)]
    })

    this.sellerlogin = this.formbuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required, Validators.minLength(5), Validators.maxLength(20)]
    })
  }


  signup(data: signup) {
    this.http.get<any>("http://localhost:8000/sellerregister").subscribe(res => {
      const seller = res.find((a: any) => {
        return a.email === this.sellerSignup.value.email && a.password === this.sellerSignup.value.password
      })
      if (seller) {
        Swal.fire({
          icon: 'warning',
          title: 'Oops...',
          text: 'User already exists with this email or password',
          footer: 'Please choose a different email or login with existing email'
        })
      } else {
        this.seller.usersignup(data).subscribe(
          (response) => {
            console.log("user", response);
            Swal.fire({
              title: 'Successfull',
              text: "Your registration has been successfull!",
              icon: 'success',
              showCancelButton: true,
              confirmButtonColor: '#3085d6',
              cancelButtonColor: '#d33',
              confirmButtonText: 'proceed to login!'
            }).then((result) => {
              if (result.isConfirmed) {
                this.islogin = true;
              }
            })
          }, (error) => {
            Swal.fire({
              icon: 'warning',
              title: 'Oops...',
              text: 'Something went wrong!',
              footer: 'Seller registration failed please try again later'
            })
            console.log(error);
          }
        )
      }
    }, (error) => {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Something went wrong!',
        footer: 'Error occurs from server side please try again'
      })
      console.log(error, "error");
    }
    )
  }


  loginuser() {
    this.http.get<any>('http://localhost:8000/sellerregister').subscribe(res => {
      const user = res.find((a: any) => {
        return a.email === this.sellerlogin.value.email && a.password === this.sellerlogin.value.password
      })
      if (user) {
        this.seller.loginuser(user).subscribe(
          (response) => {
            console.log(response);
            Swal.fire(
              'Good job!',
              'You login successfully!',
              'success'
            )
            localStorage.setItem("Seller", JSON.stringify(user));
            this.router.navigate(['seller-home']);
          }, (error) => {
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'Something went wrong!',
              footer: 'User login failed please try again'
            })
            localStorage.setItem("Seller", JSON.stringify(user));
            this.router.navigate(['seller-home']);
            console.log(error, "error");
          }
        )
        this.router.navigate(['']);
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Something went wrong!',
          footer: 'Incorrect username or password'
        })
      }
    }, (error) => {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Something went wrong!',
        footer: 'Error occurs from server side'
      })
      console.log(error, "error");
    }
    )
  }


  login() {
    this.islogin = true
  }


  signupnow() {
    this.islogin = false
  }


}
