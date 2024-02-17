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
      name: [''],
      email: [''],
      phone: [''],
      address: [''],
      password: ['']
    })

    this.sellerlogin = this.formbuilder.group({
      email: [''],
      password: ['']
    })
  }


  signup(data: signup) {
    this.seller.usersignup(data).subscribe(
      (response) => {
        if (response) {
          console.log("Seller", response);
          this.clear();
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
        } else {
          Swal.fire({
            icon: 'warning',
            title: 'Oops...',
            text: 'Seller already exists with this credentials',
            footer: 'Please choose a different credentials or login with existing credentials'
          })
        }
      }, (error) => {
        Swal.fire({
          icon: 'warning',
          title: 'Oops...',
          text: 'Seller already available with same credentials',
          footer: 'Seller signup failed'
        })
        console.log("error", error);
      }
    ), (error: any) => {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Something went wrong!',
        footer: 'Error occurs from server side please try again'
      })
      console.log("error", error);
    }
  }


  loginuser(data: login) {
    this.seller.loginuser(data).subscribe(
      (response) => {
        if (response) {
          Swal.fire(
            'Good job!',
            'You login successfully!',
            'success'
          )
          localStorage.setItem("Seller", JSON.stringify(response));
          this.router.navigate(['seller-home']);
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Something went wrong!',
            footer: 'Seller login failed please try again'
          })
        }
      }, (error) => {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Something went wrong!',
          footer: 'Incorrect credentials'
        })
        console.error("Error during login:", error);
      }
    )
  }


  login() {
    this.islogin = true
  }


  signupnow() {
    this.islogin = false
  }


  clear() {
    this.sellerSignup.reset();
  }

}
