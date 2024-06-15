import { Component, OnInit } from '@angular/core';
import { login, signup } from '../datatype';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-user-auth',
  templateUrl: './user-auth.component.html',
  styleUrls: ['./user-auth.component.scss']
})
export class UserAuthComponent implements OnInit {


  islogin = true;
  loginForm!: FormGroup
  sellerSignup!: FormGroup

  constructor(private user: UserService, private router: Router, private http: HttpClient, private formbuilder: FormBuilder) { }

  ngOnInit(): void {
    if (localStorage.getItem('User')) {
      this.router.navigate(['']);
    }

    this.loginForm = this.formbuilder.group({
      email: [''],
      password: ['']
    })

    this.sellerSignup = this.formbuilder.group({
      name: [''],
      email: [''],
      phone: [''],
      address: [''],
      password: ['']
    })
  }


  signup(data: signup) {
    this.user.usersignup(data).subscribe(
      (response) => {
        if (response) {
          console.log("userdata", response);
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
            icon: 'error',
            title: 'Oops...',
            text: 'Something went wrong!',
            footer: 'User registration failed please try again later'
          })
        }
      }, (error) => {
        Swal.fire({
          icon: 'warning',
          title: 'Oops...',
          text: 'User already exists with same credentials',
          footer: 'User registration failed please try again'
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
    this.user.userlogin(data).subscribe(
      (response) => {
        if (response) {
          Swal.fire(
            'Good job!',
            'You login successfully!',
            'success'
          )
          localStorage.setItem("User", JSON.stringify(response));
          console.log("User login successfully");
          this.router.navigate(['']);
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Something went wrong!',
            footer: 'User login failed please try again'
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


  signupnow() {
    this.islogin = false
  }


  login() {
    this.islogin = true
  }


  clear() {
    this.sellerSignup.reset();
  }

}
